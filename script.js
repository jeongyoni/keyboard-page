const inputField = document.getElementById("keyboard-input");
let isVirtualKeyboard = false; // ✅ 가상 키보드 클릭 여부 감지

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
        isVirtualKeyboard = true; // ✅ 가상 키보드 클릭 감지

        // 소리 재생
        playKeySound(key);

        // ✅ 입력창에 문자 추가 (가상 키보드만 입력 가능)
        if (inputField) {
            inputField.value += key === "Space" ? " " : key;
        }

        // 버튼 하이라이트 효과
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);
    });
});

// ✅ 실제 키보드 입력 시 이벤트 처리
document.addEventListener("keydown", function(event) {
    if (isVirtualKeyboard) {
        event.preventDefault(); // ✅ 기본 입력 차단
        isVirtualKeyboard = false; // ✅ 다음 입력부터 정상적으로 동작하도록 리셋
        return; // ✅ 가상 키보드 입력 시, 실제 키보드 이벤트를 막음
    }

    // ✅ IME (한글 입력 등) 방지 처리
    if (event.isComposing || event.keyCode === 229) {
        return; // ✅ 한글 입력 등 IME 입력 방식 방지
    }

    event.preventDefault(); // ✅ 기본 입력 방지

    const key = event.key.toUpperCase();

    // 소리 재생
    playKeySound(key);

    // ✅ 실제 키보드 입력 시에만 입력창에 문자 추가
    if (inputField) {
        inputField.value += key === " " ? " " : key;
    }
});
