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

        // ✅ 가상 키보드 클릭 시 입력창에 직접 입력하지 않음 (중복 방지)
        
        // 버튼 하이라이트 효과
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);
    });
});

// ✅ 실제 키보드 입력 시 이벤트 처리
document.addEventListener("keydown", function(event) {
    const key = event.key.toUpperCase();  // 키 값을 대문자로 변환

    // 소리 재생
    playKeySound(key);

    // ✅ 실제 키보드 입력 시에만 입력창에 문자 추가
    if (inputField) {
        inputField.value += event.key;
    }
});
