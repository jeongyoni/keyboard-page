const inputField = document.getElementById("keyboard-input");
let isVirtualKeyboard = false; // ✅ 가상 키보드 클릭 여부 감지

// 키 소리 재생 함수
function playKeySound(key) {
    let soundFile = `./sounds/${key.toLowerCase()}.mp3`; // ✅ 소리 파일 경로 설정
    let audio = new Audio(soundFile);
    audio.play().catch(error => console.warn("소리 재생 오류:", error)); // ✅ 소리 재생 오류 처리
}

// ✅ 가상 키보드 버튼 클릭 시 이벤트 처리
document.querySelectorAll('.key').forEach(button => {
    button.addEventListener('click', function () {
        isVirtualKeyboard = true; // ✅ 가상 키보드 클릭 감지
        const key = button.dataset.key;

        // 소리 재생
        playKeySound(key);

        // 입력창에 문자 추가
        if (inputField) {
            inputField.value += key === "Space" ? " " : key;
        }

        // 버튼 하이라이트 효과
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);

        // ✅ 중복 입력 방지를 위해 100ms 뒤에 키 입력 감지 해제
        setTimeout(() => {
            isVirtualKeyboard = false;
        }, 100);
    });
});

// ✅ 실제 키보드 입력 시 이벤트 처리
document.addEventListener("keydown", function(event) {
    if (isVirtualKeyboard) return; // ✅ 가상 키보드 입력 시 keydown 실행 X

    const key = event.key; // ✅ 대소문자 그대로 유지

    event.preventDefault(); // ✅ 기본 입력 방지

    // 소리 재생
    playKeySound(key);

    // 입력창에 문자 추가 (한 번만 입력)
    if (inputField) {
        inputField.value += key === " " ? " " : key;
    }
});
