const inputField = document.getElementById("keyboard-input");

// 키 배열
const numberKeys = ['1','2','3','4','5','6','7','8','9','0'];
const functionKeys = ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'];
const r3Keys = ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ','[',']'];
const r2Keys = ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ',';',"'" ];
const r1Keys = ['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ',',','.','/'];
const controlKeys = ['Ctrl', 'Shift', 'Alt'];

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

// 키를 눌렀을 때 사운드 파일 결정하는 함수
function getSoundFileForKey(key) {
    if (functionKeys.includes(key)) return keySoundMap.function;
    if (numberKeys.includes(key)) return keySoundMap.number;
    if (r3Keys.includes(key)) return keySoundMap.r3;
    if (r2Keys.includes(key)) return keySoundMap.r2;
    if (r1Keys.includes(key)) return keySoundMap.r1;
    if (controlKeys.includes(key)) return keySoundMap.control;
    if (key === " ") return keySoundMap.space;
    if (key === "Enter") return keySoundMap.enter;
    if (key === "Backspace") return keySoundMap.backspace;
    return null;
}

// 키다운 시 소리만 재생 (중복 입력 방지 위해 inputField.value += ... 제거)
document.addEventListener("keydown", function(event) {
    // 한글 조합 중이면 무시
    if (event.isComposing) return;

    const pressedKey = event.key;
    const soundFile = getSoundFileForKey(pressedKey);
    if (soundFile) {
        const sound = new Audio(soundFile);
        sound.currentTime = 0;
        sound.play();
    }
    // ⚠️ 여기서 inputField.value += pressedKey; 제거 (중복 입력 방지)
});

// 가상 키보드 버튼 클릭 시
document.querySelectorAll('.key').forEach(button => {
    button.addEventListener('click', function() {
        const key = button.dataset.key;
        const soundFile = getSoundFileForKey(key);

        if (soundFile) {
            const sound = new Audio(soundFile);
            sound.currentTime = 0;
            sound.play();
        }

        // 가상 키보드 클릭 시에는 직접 입력창에 추가
        // Space → 공백, Enter → 줄바꿈
        if (inputField) {
            if (key === "Space") {
                inputField.value += " ";
            } else if (key === "Enter") {
                inputField.value += "\n";
            } else {
                inputField.value += key;
            }
        }

        // 버튼 하이라이트 효과
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);
    });
});
