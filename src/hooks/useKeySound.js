import { useCallback, useEffect, useRef, useState } from 'react';
import { getSoundFile, getSoundFileByCode, ALL_SOUND_FILES } from '../data/soundMap';
import { getSwitch, DEFAULT_SWITCH_ID } from '../data/switches';

/**
 * 키 사운드 재생 훅. Web Audio API 기반.
 *
 * HTMLAudioElement + cloneNode() 방식은 연타 시 소리가 잘리고
 * 사파리에서 재생이 실패하는 일이 잦아 AudioContext 로 구현했다.
 * mp3 를 한 번 디코드해 AudioBuffer 로 들고 있다가, 재생할 때마다
 * BufferSource 를 새로 만들어 물린다. 지연이 거의 없고 동시 재생도 자유롭다.
 */
export function useKeySound({ switchId = DEFAULT_SWITCH_ID, volume = 1 } = {}) {
  const ctxRef = useRef(null);
  const gainRef = useRef(null);
  const compressorRef = useRef(null);
  const buffersRef = useRef({});

  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  const sw = getSwitch(switchId);
  const baseDir = `${import.meta.env.BASE_URL}sounds/${sw.dir}/`;

  // AudioContext 는 한 번만 만든다
  useEffect(() => {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) {
      setError('이 브라우저는 Web Audio API 를 지원하지 않습니다.');
      return undefined;
    }
    const ctx = new Ctx();

    // source -> masterGain -> compressor -> destination
    // 빠르게 칠 때 소리가 겹치면 진폭이 더해져 클리핑이 난다.
    // 컴프레서가 피크를 눌러줘 연타해도 찢어지지 않는다.
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 12;
    compressor.ratio.value = 8;
    compressor.attack.value = 0.002;
    compressor.release.value = 0.12;
    compressor.connect(ctx.destination);

    const gain = ctx.createGain();
    gain.gain.value = volume;
    gain.connect(compressor);

    ctxRef.current = ctx;
    gainRef.current = gain;
    compressorRef.current = compressor;

    return () => {
      ctx.close();
      ctxRef.current = null;
      gainRef.current = null;
      compressorRef.current = null;
    };
    // volume 은 아래 별도 effect 에서 반영
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (gainRef.current) gainRef.current.gain.value = volume;
  }, [volume]);

  // 축이 바뀌면 해당 폴더의 사운드를 받아서 디코드
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return undefined;

    let cancelled = false;
    setReady(false);
    setError(null);

    (async () => {
      try {
        const entries = await Promise.all(
          ALL_SOUND_FILES.map(async (file) => {
            const res = await fetch(baseDir + file);
            if (!res.ok) throw new Error(`${file} 로드 실패 (${res.status})`);
            const arr = await res.arrayBuffer();
            const buf = await ctx.decodeAudioData(arr);
            return [file, buf];
          })
        );
        if (cancelled) return;
        buffersRef.current = Object.fromEntries(entries);
        setReady(true);
      } catch (e) {
        if (cancelled) return;
        setError(e.message || '사운드를 불러오지 못했습니다.');
        // 조용히 삼키지 않는다 — 안 들릴 때 원인을 볼 수 있어야 한다
        console.error('[useKeySound]', e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [baseDir]);

  /** 브라우저 자동재생 정책 해제. 사용자 제스처 안에서 호출되어야 한다. */
  const unlock = useCallback(() => {
    const ctx = ctxRef.current;
    if (ctx && ctx.state === 'suspended') ctx.resume();
  }, []);

  useEffect(() => {
    const handler = () => unlock();
    window.addEventListener('pointerdown', handler);
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('pointerdown', handler);
      window.removeEventListener('keydown', handler);
    };
  }, [unlock]);

  const play = useCallback((key, code) => {
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;

    const file = (code && getSoundFileByCode(code)) || getSoundFile(key);
    if (!file) return;

    const buffer = buffersRef.current[file];
    if (!buffer) return;

    if (ctx.state === 'suspended') ctx.resume();

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    // 개별 노트는 살짝 낮춰서 헤드룸을 둔다
    const noteGain = ctx.createGain();
    noteGain.gain.value = 0.85;

    source.connect(noteGain);
    noteGain.connect(gain);
    source.start(0);

    // 재생이 끝나면 노드를 끊어 누적을 막는다
    source.onended = () => {
      source.disconnect();
      noteGain.disconnect();
    };
  }, []);

  return { play, unlock, ready, error };
}
