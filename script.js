const inputField = document.getElementById("keyboard-input");
let isVirtualKeyboard = false; // ✅ 가상 키보드 클릭 여부 체크

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
        isVirtualKeyboard = false; // ✅ 가상 키보드 입력 후 한 번만 실행되도록 설정
        return; // ✅ 여기서 종료되면 중복 입력 방지됨
    }

    event.preventDefault(); // ✅ 기본 입력 동작 방지

    const key = event.key.toUpperCase();

    // 소리 재생
    playKeySound(key);

    // ✅ 실제 키보드 입력 시에만 입력창에 문자 추가
    if (inputField) {
        inputField.value += key === " " ? " " : key;
    }
});