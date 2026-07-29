/**
 * 두벌식 한글 각인. 키캡의 영문 legend -> 해당 위치의 한글 자모.
 * Keyboard 가 각 알파 키의 sublegend 로 얹어, 실제 한글 키보드처럼 이중 각인이 된다.
 *
 * 소리 매핑(soundMap.js)과 별개다 — 이건 '보이는 각인'만 담당한다.
 * React 를 import 하지 않는 순수 데이터. (data/ 규칙)
 */
export const KOREAN_LEGENDS = {
  Q: 'ㅂ', W: 'ㅈ', E: 'ㄷ', R: 'ㄱ', T: 'ㅅ',
  Y: 'ㅛ', U: 'ㅕ', I: 'ㅑ', O: 'ㅐ', P: 'ㅔ',
  A: 'ㅁ', S: 'ㄴ', D: 'ㅇ', F: 'ㄹ', G: 'ㅎ',
  H: 'ㅗ', J: 'ㅓ', K: 'ㅏ', L: 'ㅣ',
  Z: 'ㅋ', X: 'ㅌ', C: 'ㅊ', V: 'ㅍ', B: 'ㅠ',
  N: 'ㅜ', M: 'ㅡ',
};

export function getKoreanLegend(legend) {
  return KOREAN_LEGENDS[legend] || '';
}
