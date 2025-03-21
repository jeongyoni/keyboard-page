const inputField = document.getElementById("keyboard-input");

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
    event.preventDefault(); // ✅ 중복 입력 방지

    const key = event.key.toUpperCase();

    // 소리 재생
    playKeySound(key);

    // ✅ 실제 키보드 입력 시에만 입력창에 문자 추가
    if (inputField) {
        inputField.value += key === " " ? " " : key;
    }
});
