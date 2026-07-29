/**
 * 한글 IME 입력 처리.
 *
 * macOS 의 두벌식 IME 는 첫 자모부터 keydown 의 isComposing 이 계속 true 다.
 * 따라서 `if (e.isComposing) return` 로 막으면 한글 타이핑 중에는 소리가 전혀 나지 않는다.
 * (실제로 그렇게 짰다가 맥에서 소리가 안 나는 문제가 있었다.)
 *
 * 브라우저/OS 마다 조합 중 e.key 가 다르게 온다:
 *   - 자모 그대로 ('ㅁ')          -> keydown 에서 처리 가능
 *   - 'Process' / 'Unidentified' -> keydown 으로는 알 수 없어 compositionupdate 가 필요
 *
 * 그래서 두 경로를 모두 열어두고, 중복 재생은 시간 기반으로 막는다.
 */

/** 호환 자모(ㄱ~ㅣ) 여부 */
export function isKoreanJamo(char) {
  if (!char || char.length !== 1) return false;
  const code = char.charCodeAt(0);
  return code >= 0x3131 && code <= 0x3163;
}

/** 완성형 한글 음절(가~힣) 여부 */
export function isKoreanSyllable(char) {
  if (!char || char.length !== 1) return false;
  const code = char.charCodeAt(0);
  return code >= 0xac00 && code <= 0xd7a3;
}

/**
 * 겹자모 — 한 글자지만 키는 두 번 눌러 만든 것.
 * NFD 로 분해해도 하나로 남기 때문에 따로 세어줘야
 * "만"(ㅁㅏㄴ) 과 "많"(ㅁㅏㄴㅎ) 을 구분할 수 있다.
 */
const COMPOUND_JAMO = new Set([
  // 종성 (Hangul Jamo)
  0x11aa, 0x11ac, 0x11ad, 0x11b0, 0x11b1, 0x11b2, 0x11b3, 0x11b4, 0x11b5, 0x11b6, 0x11b9,
  // 중성 (Hangul Jamo)
  0x116a, 0x116b, 0x116c, 0x116f, 0x1170, 0x1171, 0x1174,
  // 호환 자모 영역의 같은 글자들
  0x3133, 0x3135, 0x3136, 0x313a, 0x313b, 0x313c, 0x313d, 0x313e, 0x313f, 0x3140, 0x3144,
  0x3158, 0x3159, 0x315a, 0x315d, 0x315e, 0x315f, 0x3162,
]);

/** 문자열을 만드는 데 필요한 키 입력 수 */
export function countJamo(str) {
  if (!str) return 0;
  let count = 0;
  for (const ch of str.normalize('NFD')) {
    count += COMPOUND_JAMO.has(ch.codePointAt(0)) ? 2 : 1;
  }
  return count;
}

// 조합 중이어도 이 키들은 그대로 소리 내야 한다
const PASSTHROUGH_KEYS = new Set([
  'Backspace', 'Enter', 'Tab', ' ', 'Shift', 'CapsLock',
  'Control', 'Alt', 'Meta', 'Escape',
]);

// 조합 중 실제 키를 알 수 없을 때 브라우저가 넣는 값
const OPAQUE_KEYS = new Set(['Process', 'Unidentified', 'Dead']);

/**
 * keydown 을 무시해야 하는지 판단.
 * 조합 중이더라도 자모나 특수키가 실려 오면 재생한다.
 * 실제 키를 알 수 없는 경우(Process)만 무시하고 compositionupdate 에 맡긴다.
 */
export function shouldIgnoreKeydown(event) {
  if (event.repeat) return true; // 길게 누를 때 연속 재생 방지
  if (!event.isComposing) return false;

  const key = event.key;
  if (OPAQUE_KEYS.has(key)) return true;
  if (PASSTHROUGH_KEYS.has(key)) return false;
  if (isKoreanJamo(key)) return false;
  if (isKoreanSyllable(key)) return false;
  return true;
}

/**
 * 같은 입력이 keydown 과 compositionupdate 양쪽에서 잡혀 두 번 울리는 것을 막는다.
 * 사람이 아무리 빨라도 한 키에 40ms 는 걸리므로 그 안의 중복은 같은 입력으로 본다.
 */
export function createPlayGate(windowMs = 40) {
  let last = 0;
  return function allow() {
    const now = performance.now();
    if (now - last < windowMs) return false;
    last = now;
    return true;
  };
}

/**
 * compositionupdate 에서 새로 추가된 글자만 뽑아낸다.
 * 자모 수가 늘었을 때만 소리를 내므로 조합 중 백스페이스는 무시된다
 * (백스페이스 소리는 keydown 경로가 담당한다).
 */
export function diffComposition(prev, next) {
  if (!next || next === prev) return '';
  if (countJamo(next) <= countJamo(prev)) return '';
  return next.slice(-1);
}
