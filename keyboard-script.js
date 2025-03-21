const inputField = document.getElementById("keyboard-input");

// 키 그룹별 배열
const numberKeys = ['1','2','3','4','5','6','7','8','9','0'];
const functionKeys = ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'];
const r3Keys = ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ','[',']'];
const r2Keys = ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ',';',"'" ];
const r1Keys = ['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ',',','.','/'];
const controlKeys = ['Ctrl', 'Shift', 'Alt'];

// 키별 사운드 매핑
const keySoundMap = {
    function: 'sounds/01_R4-F1열.mp3',  // F1~F12
    number: 'sounds/02_R4-숫자열.mp3',  // 숫자 키
    r3: 'sounds/03_R3-ㅂㅈㄷ열.mp3',    // ㅂ,ㅈ,ㄷ,ㄱ,ㅅ...
    r2: 'sounds/04_R2-ㅁㄴㅇ열.mp3',    // ㅁ,ㄴ,ㅇ,ㄹ,ㅎ...
    r1: 'sounds/05_R1-ㅋㅌㅊ열.mp3',    // ㅋ,ㅌ,ㅊ,ㅍ...
    control: 'sounds/06_R1-Ctrl열06.mp3', // Ctrl, Shift, Alt
    space: 'sounds/스페이스바.mp3',      // 스페이스바
    enter: 'sounds/엔터키-숫자패드+키.mp3', // 엔터 키
    backspace: 'sounds/백스페이스.mp3', // 백스페이스
};

// 키 입력 이벤트 처리
document.addEventListener("keydown", function (event) {
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
        const sound = new Audio(soundToPlay);
        sound.currentTime = 0;
        sound.play();
    }

    // 입력창에 문자 추가
    if (inputField && pressedKey.length === 1) {
        inputField.value += pressedKey;
    }
});

// 가상 키보드 버튼 클릭 시 이벤트 처리
document.querySelectorAll('.key').forEach(button => {
    button.addEventListener('click', function () {
        const key = button.dataset.key;
        let soundToPlay = null;

        if (functionKeys.includes(key)) {
            soundToPlay = keySoundMap.function;
        } else if (numberKeys.includes(key)) {
            soundToPlay = keySoundMap.number;
        } else if (r3Keys.includes(key)) {
            soundToPlay = keySoundMap.r3;
        } else if (r2Keys.includes(key)) {
            soundToPlay = keySoundMap.r2;
        } else if (r1Keys.includes(key)) {
            soundToPlay = keySoundMap.r1;
        } else if (controlKeys.includes(key)) {
            soundToPlay = keySoundMap.control;
        } else if (key === "Space") {
            soundToPlay = keySoundMap.space;
        } else if (key === "Enter") {
            soundToPlay = keySoundMap.enter;
        } else if (key === "Backspace") {
            soundToPlay = keySoundMap.backspace;
        }

        if (soundToPlay) {
            const sound = new Audio(soundToPlay);
            sound.play();
        }

        // 입력창에 문자 추가
        if (inputField) {
            inputField.value += key === "Space" ? " " : key;
        }

        // 버튼 하이라이트 효과
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);
    });
});
