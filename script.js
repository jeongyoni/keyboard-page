// 키 소리 재생 함수
function playKeySound(key) {
    let soundFile = `sounds/${key.toLowerCase()}.mp3`; // 일반 키보드 소리만 재생
    let audio = new Audio(soundFile);
    audio.play();
}

// 키 입력 시 소리 및 버튼 하이라이트 처리 (가상 키보드 버튼 클릭)
document.querySelectorAll('.keyboard-btn').forEach(button => {
    button.addEventListener('click', function() {
        const key = button.dataset.key;

        // 소리 재생
        playKeySound(key);

        // 입력창에 문자를 추가
        const inputField = document.getElementById("keyboard-input");
        inputField.value += key;

        // 버튼 하이라이트 효과
        button.classList.add("active");
        setTimeout(() => {
            button.classList.remove("active");
        }, 100);  // 100ms 후 버튼 원상복구
    });
});

// 실제 키보드 입력 시 소리 및 입력 처리
document.getElementById("keyboard-input").addEventListener("keydown", function(event) {
    const key = event.key.toUpperCase();  // 눌린 키 값
    const button = document.querySelector(`.keyboard-btn[data-key="${key}"]`);

    if (button) {
        // 소리 재생
        playKeySound(key);

        // 버튼 하이라이트 효과
        button.classList.add("active");

        // 입력창에 문자를 추가
        const inputField = document.getElementById("keyboard-input");
        inputField.value += event.key;

        setTimeout(() => {
            button.classList.remove("active");
        }, 100);  // 100ms 후 버튼 원상복구
    }
});
