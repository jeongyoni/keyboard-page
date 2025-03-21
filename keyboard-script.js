const inputField = document.getElementById("keyboard-input");

// Web Audio API 초기화
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioBuffers = {};

// 키 배열
const numberKeys = ['1','2','3','4','5','6','7','8','9','0'];
const functionKeys = ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'];
const r3Keys = ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ','[',']'];
const r2Keys = ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ',';',"'" ];
const r1Keys = ['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ',',','.','/'];
const controlKeys = ['Ctrl','Shift','Alt'];

// 밀키축 전용 mp3 매핑 (소리 파일 경로)
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

// pressedKey에 해당하는 소리 파일 경로 리턴 함수
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

// 오디오 버퍼 로드 함수
function loadAudioBuffer(url) {
    return fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => new Promise((resolve, reject) => {
            audioContext.decodeAudioData(arrayBuffer, resolve, reject);
        }));
}

// 소리 재생 함수 (오디오 버퍼 캐시 활용)
function playSound(url) {
    if (!audioBuffers[url]) {
        loadAudioBuffer(url)
            .then(buffer => {
                audioBuffers[url] = buffer;
                const source = audioContext.createBufferSource();
                source.buffer = buffer;
                source.connect(audioContext.destination);
                source.start(0);
            })
            .catch(err => console.error("Sound load error:", err));
    } else {
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffers[url];
        source.connect(audioContext.destination);
        source.start(0);
    }
}

// 실제 키보드 입력 시 이벤트 처리
document.addEventListener("keydown", function(event) {
    // 한글 조합 중이면(IME 조합) 입력을 무시해서 브라우저가 정상적으로 조합하게 함
    if (event.isComposing) return;

    const pressedKey = event.key;
    const soundFile = getMilkySound(pressedKey);
    if (soundFile) {
        playSound(soundFile);
    }
    // 여기서는 inputField.value 업데이트는 브라우저 기본 입력에 맡김
});
