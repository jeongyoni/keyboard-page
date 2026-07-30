/**
 * 키보드 디자인(색상 조합, colorway) 레지스트리.
 *
 * 실제 그루브스톤 제품 색을 반영한다 (public/images 의 제품 사진에서 실측).
 * 물리 레이아웃은 하나(keyLayouts.js 의 9009_wkltkl)를 공유하고,
 * 디자인은 '색상 조합'만 다르다. 각 키캡 색은 legend 분류로 정한다:
 *   accent(포인트 키) > mod(수정키) > base(알파/숫자)
 *
 * 새 제품 디자인을 추가하려면 아래 배열에 항목만 넣으면 셀렉터·키보드에 자동 반영된다.
 * React 를 import 하지 않는 순수 데이터. (data/ 규칙)
 */

// 수정키로 분류할 legend 들. 나머지(알파벳·숫자·기호)는 base 색을 쓴다.
const MOD_LEGENDS = new Set([
  'ESC', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
  'Backspace', 'Tab', 'CapsLock', 'Enter', 'Shift', 'R-Shift',
  'Ctrl', 'Win', 'Alt', 'Space', 'Fn', 'Menu',
]);

export const KEYBOARD_DESIGNS = [
  {
    id: 'milky',
    name: '밀키 화이트',
    description: '그루브스톤 밀키 라인. 전체 화이트 키캡 + 실버 케이스로 깔끔하게.',
    case: '#c7cad0',
    base: { cap: '#f5f4f1', text: '#4a4a4a' },
    mod: { cap: '#e4e3df', text: '#4a4a4a' },
    accent: { cap: '#f5f4f1', text: '#4a4a4a' },
    accentKeys: [],
  },
  {
    id: 'purple-crayon',
    name: 'GV10 퍼플크레용',
    description: '라벤더 케이스에 화이트 키캡, 파스텔 퍼플 각인과 핑크 포인트.',
    case: '#bfb0da',
    base: { cap: '#f6f3fa', text: '#8a6fb8' },
    mod: { cap: '#e9e1f5', text: '#7d61ac' },
    accent: { cap: '#f2b6d2', text: '#7a4a68' },
    accentKeys: ['ESC'],
  },
  {
    id: 'purpler',
    name: 'GV8 퍼플러',
    description: '라벤더 하우징 + 화이트 알파 + 라일락 모디 + 핑크 포인트. GV8M-8K 퍼플러 실측.',
    case: '#bda9e2',
    base: { cap: '#f6f3fb', text: '#6f52a6' },
    mod: { cap: '#dccbf0', text: '#6a4f9e' },
    accent: { cap: '#f3bcd8', text: '#7d3f66' },
    accentKeys: ['ESC', 'Enter'],
  },
  {
    id: 'gs85-light',
    name: '라이트',
    description: '오프화이트 케이스 + 화이트 알파 + 그레이 모디 + 세이지 그린 포인트. GV10 라이트G/GS85 라이트 실측.',
    case: '#e5e2d3',
    base: { cap: '#f4f3ef', text: '#4a4a4a' },
    mod: { cap: '#c6c6c2', text: '#454545' },
    accent: { cap: '#6c9c6c', text: '#f3f6ec' },
    accentKeys: ['ESC', 'Enter'],
  },
  {
    id: 'apple-latte',
    name: '애플라떼',
    description: '그루브스톤 PBT 염료승화. 균일한 아이보리 크림 단색. GV10 애플라떼 실측.',
    case: '#d6d0bd',
    base: { cap: '#e6e0cc', text: '#6a5f48' },
    mod: { cap: '#dcd6c1', text: '#6a5f48' },
    accent: { cap: '#e6e0cc', text: '#6a5f48' },
    accentKeys: [],
  },
  {
    id: 'smoky',
    name: '스모키',
    description: 'GV10 스모키. 반투명 차콜 그레이 단색의 어두운 톤.',
    case: '#26282b',
    base: { cap: '#3b3e42', text: '#d9dbde' },
    mod: { cap: '#2f3237', text: '#c2c5ca' },
    accent: { cap: '#3b3e42', text: '#d9dbde' },
    accentKeys: [],
  },
];

export const DEFAULT_DESIGN_ID = 'milky';

export function getDesign(id) {
  return KEYBOARD_DESIGNS.find((d) => d.id === id) || KEYBOARD_DESIGNS[0];
}

/** legend 에 해당하는 { cap, text } 색을 디자인에서 뽑는다. */
export function resolveKeyColors(design, legend) {
  if (design.accentKeys.includes(legend)) return design.accent;
  if (MOD_LEGENDS.has(legend)) return design.mod;
  return design.base;
}
