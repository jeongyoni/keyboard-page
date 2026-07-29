import { getSoundFile, getSoundFileByCode } from '../../data/soundMap.js';

let pass = 0, fail = 0;
const t = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  if (!ok) console.log(`  FAIL ${name}: got ${JSON.stringify(got)} want ${JSON.stringify(want)}`);
};

// --- 물리 키(code) -> 행 매핑: 이제 사운드 해결의 핵심 경로 ---
// 한글 IME 조합 중 keydown 은 e.key 가 'Process' 라도 e.code 는 실제 물리 키를 담는다.
// 그래서 code 만으로 한글·영문·겹자모를 구분 없이 같은 소리로 처리할 수 있다.
t('KeyQ -> r3', getSoundFileByCode('KeyQ'), 'row-r3.mp3');
t('KeyP -> r3', getSoundFileByCode('KeyP'), 'row-r3.mp3');
t('KeyA -> r2 (홈행)', getSoundFileByCode('KeyA'), 'row-r2.mp3');
t('KeyL -> r2', getSoundFileByCode('KeyL'), 'row-r2.mp3');
t('KeyZ -> r1', getSoundFileByCode('KeyZ'), 'row-r1.mp3');
t('Slash -> r1', getSoundFileByCode('Slash'), 'row-r1.mp3');
t('Digit1 -> number', getSoundFileByCode('Digit1'), 'row-number.mp3');
t('Backquote -> number', getSoundFileByCode('Backquote'), 'row-number.mp3');
t('F5 -> function', getSoundFileByCode('F5'), 'row-function.mp3');
t('ControlLeft -> control', getSoundFileByCode('ControlLeft'), 'row-control.mp3');
t('MetaLeft(Command) -> control', getSoundFileByCode('MetaLeft'), 'row-control.mp3');

// 특수키
t('Space', getSoundFileByCode('Space'), 'space.mp3');
t('Enter', getSoundFileByCode('Enter'), 'enter.mp3');
t('Backspace', getSoundFileByCode('Backspace'), 'backspace.mp3');
t('Tab', getSoundFileByCode('Tab'), 'tab.mp3');
t('CapsLock', getSoundFileByCode('CapsLock'), 'capslock.mp3');
t('좌 Shift', getSoundFileByCode('ShiftLeft'), 'shift-left.mp3');
t('우 Shift', getSoundFileByCode('ShiftRight'), 'shift-right.mp3');

// 매칭 없는/빈 code
t('알 수 없는 code -> null', getSoundFileByCode('MediaPlayPause'), null);
t('빈 code -> null', getSoundFileByCode(''), null);
t('undefined code -> null', getSoundFileByCode(undefined), null);

// --- 한글 IME 회귀: 예전엔 조합 중간 타건이 무음이었다 ---
// "안녕" = ㅇ,ㅏ,ㄴ,ㄴ,ㅕ,ㅇ -> 물리키 KeyD,KeyK,KeyS,KeyS,KeyU,KeyD
// 여섯 타건 모두 소리가 나야 한다(예전엔 첫 자모만 났다).
const 안녕Codes = ['KeyD', 'KeyK', 'KeyS', 'KeyS', 'KeyU', 'KeyD'];
const 안녕Sounds = 안녕Codes.map((c) => getSoundFileByCode(c));
t('안녕 6타건 모두 소리남', 안녕Sounds.every(Boolean), true);
t('안녕 무음 타건 수 = 0', 안녕Sounds.filter((s) => s === null).length, 0);

// --- 화면 키캡 클릭 경로: 문자 legend 기반 getSoundFile 은 그대로 동작 ---
t('클릭 legend ㅁ -> r2', getSoundFile('ㅁ'), 'row-r2.mp3');
t('클릭 legend a -> r2', getSoundFile('a'), 'row-r2.mp3');
t('클릭 legend space', getSoundFile('space'), 'space.mp3');
t('클릭 legend 매칭없음 -> null', getSoundFile('마'), null);

console.log(`\n통과 ${pass} / 실패 ${fail}`);
process.exit(fail ? 1 : 0);
