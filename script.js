const inputField = document.getElementById("keyboard-input");
let lastKeyPressed = null;  // ✅ 마지막으로 입력된 키 저장

// 키 소리 재생 함수
function playKeySound(key) {
    let soundFile = `./sounds/${key.toLowerCase()}.mp3`; // ✅ 사운드 경로 설정
    let audio = new Audio(soundFile);
    audio.play();
}

// ✅ 가상 키보드 버튼 클릭 시 이벤트 처리
document.querySelectorAll('.key').forEach(button => {
    button.addEventListener('click', function () {
        const key = button.dataset.key;

        // ✅ 가상 키보드 입력 시, 중복 방지
        if (lastKeyPressed === key) return;
        lastKeyPressed = key;

        // 소리 재생
        playKeySound(key);

        // ✅ 입력창에 문자 추가 (가상 키보드만 입력 가능)
        if (inputField) {
            inputField.value += key === "Space" ? " " : key;
        }

        // 버튼 하이라이트 효과
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);

        // 0.1초 뒤에 키 초기화 (중복 방지)
        setTimeout(() => {
            lastKeyPressed = null;
        }, 100);
    });
});

// ✅ 실제 키보드 입력 시 이벤트 처리
document.addEventListener("keydown", function(event) {
    if (event.isComposing || event.keyCode === 229) {
        return; // ✅ IME (한글 입력 등) 방지
    }

    const key = event.key.toUpperCase();

    // ✅ 중복 입력 방지: 같은 키를 너무 빠르게 연속 입력하면 무시
    if (lastKeyPressed === key) return;
    lastKeyPressed = key;

    event.preventDefault(); // ✅ 기본 입력 방지

    // 소리 재생
    playKeySound(key);

    // ✅ 실제 키보드 입력 시에만 입력창에 문자 추가
    if (inputField) {
        inputField.value += key === " " ? " " : key;
    }

    // 0.1초 뒤에 키 초기화 (중복 방지)
    setTimeout(() => {
        lastKeyPressed = null;
    }, 100);
});
