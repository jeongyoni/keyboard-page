import { useCallback, useEffect, useRef } from 'react';
import {
  getSoundFile,
  getSoundFileByCode,
  ALL_SOUND_FILES,
  getSwitch,
  DEFAULT_SWITCH_ID,
} from '../KeyModules/soundMap';

/**
 * 키 사운드 재생 훅.
 * - 선택된 축의 파일을 미리 로드해 캐시 (키 누를 때마다 new Audio() 하던 것 제거)
 * - cloneNode 로 재생해서 연타 시 소리가 잘리지 않음
 * - 브라우저 자동재생 정책 때문에 첫 상호작용 시 한 번 unlock
 */
export function useKeySound({ switchId = DEFAULT_SWITCH_ID, volume = 1 } = {}) {
  const cacheRef = useRef({});
  const unlockedRef = useRef(false);

  const sw = getSwitch(switchId);
  const baseDir = `${import.meta.env.BASE_URL}sounds/${sw.dir}/`;

  // 축이 바뀌면 캐시를 새로 만듦
  useEffect(() => {
    const cache = {};
    ALL_SOUND_FILES.forEach((file) => {
      const audio = new Audio(baseDir + file);
      audio.preload = 'auto';
      audio.volume = volume;
      cache[file] = audio;
    });
    cacheRef.current = cache;

    return () => {
      Object.values(cache).forEach((a) => {
        a.pause();
        a.src = '';
      });
      cacheRef.current = {};
    };
  }, [baseDir, volume]);

  const unlock = useCallback(() => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;
    Object.values(cacheRef.current).forEach((audio) => {
      const probe = audio.cloneNode();
      probe.volume = 0;
      probe.play().catch(() => {});
    });
  }, []);

  useEffect(() => {
    const handler = () => unlock();
    window.addEventListener('pointerdown', handler, { once: true });
    window.addEventListener('keydown', handler, { once: true });
    return () => {
      window.removeEventListener('pointerdown', handler);
      window.removeEventListener('keydown', handler);
    };
  }, [unlock]);

  const play = useCallback(
    (key, code) => {
      const file = (code && getSoundFileByCode(code)) || getSoundFile(key);
      if (!file) return;

      const cached = cacheRef.current[file];
      if (!cached) return;

      const node = cached.cloneNode();
      node.volume = volume;
      node.currentTime = 0;
      node.play().catch(() => {
        /* 자동재생 차단 등 — 조용히 무시 */
      });
    },
    [volume]
  );

  return { play, unlock };
}
