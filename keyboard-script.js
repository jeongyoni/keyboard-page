const inputField = document.getElementById("keyboard-input");

// 키 배열
const numberKeys = ['1','2','3','4','5','6','7','8','9','0'];
const functionKeys = ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'];
const r3Keys = ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ','[',']'];
const r2Keys = ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ',';',"'" ];
const r1Keys = ['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ',',','.','/'];
const controlKeys = ['Ctrl','Shift','Alt'];

// 밀키축 전용 mp3 매핑
const milkySounds = {
    function: 'sounds/01_R4-F1열.mp3',
    number:   'sounds/02_R4-숫자열.mp3',
    r3:       'sounds/03_R3-ㅂㅈㄷ열.mp3',
    r2:       'sounds/04_R2-ㅁㄴㅇ열.mp3',
    r1:       'sounds/05_R1-ㅋㅌㅊ열.mp3',
    control:  'sounds/06_R1-Ctrl열06.mp3',
    space:    'sounds/스페이스바.mp3',
    enter:    'sounds/엔터키-숫자패드+키.mp3',
    backspace:'sounds/백스페이스.mp3',
};

// 오디오 캐시 객체
const audioCache = {};

// 밀키축에 사용되는 모든 소리 파일을 미리 로드
for (const key in milkySounds) {
    const soundFile = milkySounds[key];
    const audio = new Audio(soundFile);
    audio.preload = 'auto';
    audioCache[soundFile] = audio;
}

// 입력한 키에 맞는 밀키축 소리 파일 경로 리턴 함수
function getMilkySound(key) {
    if (functionKeys.includes(key)) return milkySounds.function;
    if (numberKeys.includes(key))   return milkySounds.number;
    if (r3Keys.includes(key))       return milkySounds.r3;
    if (r2Keys.includes(key))       return milkySounds.r2;
    if (r1Keys.includes(key))       return milkySounds.r1;
    if (controlKeys.includes(key))  return milkySounds.control;
    if (key === " ")       return milkySounds.space;
    if (key === "Enter")   return milkySounds.enter;
    if (key === "Backspace") return milkySounds.backspace;
    return null;
}

// 실제 키보드 입력 이벤트 처리 (IME 조합 중이면 무시)
document.addEventListener("keydown", function(event) {
    if (event.isComposing) return;

    const pressedKey = event.key;
    const soundFile = getMilkySound(pressedKey);
    if (soundFile) {
        // 캐시된 오디오를 클론하여 재생 (빠른 연타에도 딜레이 최소화)
        const cachedAudio = audioCache[soundFile];
        if (cachedAudio) {
            const audioClone = cachedAudio.cloneNode();
            audioClone.currentTime = 0;
            audioClone.play().catch(error => console.warn("소리 재생 오류:", error));
        } else {
            // 예외 처리
            const audio = new Audio(soundFile);
            audio.currentTime = 0;
            audio.play();
        }
    }
    // 여기서는 inputField.value 업데이트를 하지 않으므로,
    // 브라우저의 기본 IME 입력이 그대로 처리됨
});
