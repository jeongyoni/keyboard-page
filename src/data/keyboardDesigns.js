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
    id: 'darkcity',
    name: '다크시티',
    description: '올블랙 단색에 은은한 그레이 각인. 미니멀 다크. GV10M-8K 다크시티 실측.',
    case: '#1a1a1c',
    base: { cap: '#3c3c3f', text: '#8f8f93' },
    mod: { cap: '#2b2b2e', text: '#7c7c80' },
    accent: { cap: '#3c3c3f', text: '#8f8f93' },
    accentKeys: [],
  },
  {
    id: 'blackcat',
    name: '검은고양이',
    description: '아이보리 크림 + 오렌지 포인트. 검은고양이 노벨티. GV10 검은고양이 실측.',
    case: '#d7d2bf',
    base: { cap: '#e8e2d0', text: '#45423a' },
    mod: { cap: '#cfc9b6', text: '#45423a' },
    accent: { cap: '#e39a4e', text: '#fff5ea' },
    accentKeys: ['ESC'],
  },
  {
    id: 'whitecat',
    name: '흰고양이',
    description: '블랙 하우징 + 크림 알파 + 블랙 모디 + 오렌지 포인트. 흰고양이 노벨티. GV10M-8K 흰고양이 실측.',
    case: '#17171b',
    base: { cap: '#e9e3d2', text: '#35322c' },
    mod: { cap: '#26262a', text: '#c9c4b6' },
    accent: { cap: '#eaa85e', text: '#2a1c0e' },
    accentKeys: ['ESC'],
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
