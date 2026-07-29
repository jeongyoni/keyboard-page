import { useCallback, useEffect, useRef } from 'react';
import { getSoundFile, getSoundFileByCode, ALL_SOUND_FILES } from '../KeyModules/soundMap';

const BASE = `${import.meta.env.BASE_URL}sounds/`;

/**
 * 키 사운드 재생 훅.
 * - 파일을 미리 로드해 캐시 (키 누를 때마다 new Audio() 하던 것 제거)
 * - cloneNode 로 재생해서 연타 시 소리가 잘리지 않음
 * - 브라우저 자동재생 정책 때문에 첫 사용자 상호작용 시 한 번 unlock
 */
export function useKeySound({ volume = 1 } = {}) {
  const cacheRef = useRef({});
  const unlockedRef = useRef(false);

  // 프리로드
  useEffect(() => {
    const cache = cacheRef.current;
    ALL_SOUND_FILES.forEach((file) => {
      const audio = new Audio(BASE + file);
      audio.preload = 'auto';
      audio.volume = volume;
      cache[file] = audio;
    });
    return () => {
      Object.values(cache).forEach((a) => {
        a.pause();
        a.src = '';
      });
      cacheRef.current = {};
    };
  }, [volume]);

  // 자동재생 정책 해제 — 최초 상호작용 때 무음으로 한 번 찔러줌
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
