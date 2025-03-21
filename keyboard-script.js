const inputField = document.getElementById("keyboard-input");
const audioCache = {};

// 키 그룹별 배열
const numberKeys = ['1','2','3','4','5','6','7','8','9','0'];
const functionKeys = ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'];
const r3Keys = ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ','[',']'];
const r2Keys = ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ',';',"'" ];
const r1Keys = ['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ',',','.','/'];
const controlKeys = ['Ctrl', 'Shift', 'Alt'];

// 키별 사운드 매핑
const keySoundMap = {
    function: 'sounds/01_R4-F1열.mp3',
    number: 'sounds/02_R4-숫자열.mp3',
    r3: 'sounds/03_R3-ㅂㅈㄷ열.mp3',
    r2: 'sounds/04_R2-ㅁㄴㅇ열.mp3',
    r1: 'sounds/05_R1-ㅋㅌㅊ열.mp3',
    control: 'sounds/06_R1-Ctrl열06.mp3',
    space: 'sounds/스페이스바.mp3',
    enter: 'sounds/엔터키-숫자패드+키.mp3',
    backspace: 'sounds/백스페이스.mp3',
};

// 사운드 캐싱 함수
function preloadSound(key, soundFile) {
    if (!audioCache[key]) {
        let audio = new Audio(soundFile);
        audio.preload = "auto";
        audioCache[key] = audio;
    }
}

// 사운드 재생 함수
function playKeySound(key) {
    let sound = audioCache[key];
    if (sound) {
        let clone = sound.cloneNode(); // 중첩 재생 가능하도록 복제
        clone.currentTime = 0;
        clone.play();
    }
}

// 미리 사운드 로딩
Object.keys(keySoundMap).forEach(key => preloadSound(key, keySoundMap[key]));

// 키 입력 이벤트 처리 (한글 중복 방지)
document.addEventListener("keydown", function (event) {
    if (event.isComposing) return; // 한글 입력 중이면 무시

    const pressedKey = event.key;
    let soundToPlay = null;

    if (functionKeys.includes(pressedKey)) {
        soundToPlay = keySoundMap.function;
    } else if (numberKeys.includes(pressedKey)) {
        soundToPlay = keySoundMap.number;
    } else if (r3Keys.includes(pressedKey)) {
        soundToPlay = keySoundMap.r3;
    } else if (r2Keys.includes(pressedKey)) {
        soundToPlay = keySoundMap.r2;
    } else if (r1Keys.includes(pressedKey)) {
        soundToPlay = keySoundMap.r1;
    } else if (controlKeys.includes(pressedKey)) {
        soundToPlay = keySoundMap.control;
    } else if (pressedKey === " ") {
        soundToPlay = keySoundMap.space;
    } else if (pressedKey === "Enter") {
        soundToPlay = keySoundMap.enter;
    } else if (pressedKey === "Backspace") {
        soundToPlay = keySoundMap.backspace;
    }

    if (soundToPlay) {
        playKeySound(soundToPlay);
    }

    // 한글 입력 중복 방지
    if (inputField && !event.isComposing && pressedKey.length === 1) {
        event.preventDefault();
        inputField.value += pressedKey;
    }
});
