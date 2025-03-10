document.addEventListener('keydown', function(event) {
    const key = event.key;  // 눌린 키
    const button = document.querySelector(`.keyboard-btn[data-key="${key.toUpperCase()}"]`);

    if (button) {
        // 버튼 하이라이트
        button.classList.add("active");

        // 소리 재생
        const sound = new Audio(`sounds/${key.toLowerCase()}-sound.mp3`);
        sound.play();

        // 입력창에 문자 추가
        const inputField = document.getElementById("keyboard-input");
        if (inputField) {
            inputField.value += key;
        }

        // 버튼 색상 원복
        setTimeout(() => {
            button.classList.remove("active");
        }, 100);  // 100ms 후 버튼 색상 원복
    }
});

// 버튼 클릭 시에도 소리 재생 및 강조 효과
document.querySelectorAll('.keyboard-btn').forEach(button => {
    button.addEventListener('click', function() {
        const key = button.dataset.key; // 버튼에 설정된 data-key 값 가져오기
        button.classList.add("active");

        // 소리 재생
        const sound = new Audio(`sounds/${key.toLowerCase()}-sound.mp3`);
        sound.play();

        // 입력창에 문자 추가
        const inputField = document.getElementById("keyboard-input");
        if (inputField) {
            inputField.value += key;
        }

        // 버튼 색상 원복
        setTimeout(() => {
            button.classList.remove("active");
        }, 100);  // 100ms 후 버튼 색상 원복
    });
});
