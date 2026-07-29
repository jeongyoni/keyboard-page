/**
 * 초경량 해시 라우터.
 *
 * 정적 호스팅(GitHub Pages 등)에서 서버 리라이트 없이 안전하게 동작하도록
 * 경로 대신 location.hash 를 쓴다. 라우트는 두 개뿐이라 의존성을 더하지 않는다.
 *   #/            -> 홈
 *   #/experience  -> 키감 체험 (?switch=..&design=.. 파라미터 지원)
 *
 * 홈 안의 앵커(#introduction 등)는 '/experience' 로 시작하지 않으므로 홈으로 취급되고,
 * 브라우저가 해당 요소로 스크롤하는 기본 동작은 그대로 유지된다.
 */

import { useEffect, useState } from 'react';

export function parseHash(hash) {
  const raw = (hash || '').replace(/^#/, '');
  const [path, query = ''] = raw.split('?');
  const params = {};
  for (const pair of query.split('&')) {
    if (!pair) continue;
    const [k, v = ''] = pair.split('=');
    params[decodeURIComponent(k)] = decodeURIComponent(v);
  }
  const name = path.startsWith('/experience') ? 'experience' : 'home';
  return { name, params };
}

export function buildHash(name, params = {}) {
  const path = name === 'experience' ? '/experience' : '/';
  const query = Object.entries(params)
    .filter(([, v]) => v != null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  return `#${path}${query ? `?${query}` : ''}`;
}

/** 라우트 이동. 스크롤을 맨 위로 올려 새 페이지 느낌을 준다. */
export function navigate(name, params = {}) {
  window.location.hash = buildHash(name, params);
  window.scrollTo({ top: 0, behavior: 'auto' });
}

/** 현재 라우트를 구독하는 훅. */
export function useRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}
