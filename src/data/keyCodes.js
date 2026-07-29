/**
 * 물리 키(KeyboardEvent.code) -> 키캡 legend 매핑.
 *
 * 화면 키보드의 '눌림' 하이라이트를 code 로 정하기 위한 것. code 는 한글 IME
 * 조합 중에도(e.key 가 'Process' 여도) 항상 실제 물리 키를 담으므로, 한글·영문
 * 구분 없이 눌린 키캡을 정확히 표시할 수 있다. (소리 결정과 같은 원리)
 *
 * React 를 import 하지 않는 순수 데이터. (data/ 규칙)
 */
const SPECIAL = {
  Backquote: '`', Minus: '-', Equal: '=',
  BracketLeft: '[', BracketRight: ']', Backslash: '\\',
  Semicolon: ';', Quote: "'", Comma: ',', Period: '.', Slash: '/',
  Space: 'Space', Enter: 'Enter', NumpadEnter: 'Enter',
  Backspace: 'Backspace', Tab: 'Tab', CapsLock: 'CapsLock', Escape: 'ESC',
  ShiftLeft: 'Shift', ShiftRight: 'R-Shift',
  ControlLeft: 'Ctrl', ControlRight: 'Ctrl',
  AltLeft: 'Alt', AltRight: 'Alt',
  MetaLeft: 'Win', MetaRight: 'Win', ContextMenu: 'Menu',
};

/** code 를 키캡 legend 로. 매칭 없으면 '' 반환. */
export function codeToLegend(code) {
  if (!code) return '';
  if (SPECIAL[code]) return SPECIAL[code];
  if (/^Key[A-Z]$/.test(code)) return code.slice(3); // KeyF -> F
  if (/^Digit[0-9]$/.test(code)) return code.slice(5); // Digit1 -> 1
  if (/^F[0-9]{1,2}$/.test(code)) return code; // F1..F12
  return '';
}
