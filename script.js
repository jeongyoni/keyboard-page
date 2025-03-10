let isLubed = true;  // 기본적으로 윤활 모드 설정

// 키 소리 재생 함수
function playKeySound(key) {
    let soundFile = isLubed ? `sounds/${key.toLowerCase()}_lubed.mp3` : `sounds/${key.toLowerCase()}_unlubed.mp3`; // 윤활 상태에 따른 소리 파일
    let audio = new Audio(soundFile);
    audio.play();
}

// 윤활 여부 설정 함수
function setLubedMode(lubed) {
    isLubed = lubed;
    alert(lubed ? "윤활된 키보드 모드" : "미윤할 키보드 모드");
}

// 키 입력 시 소리 및 버튼 하이라이트 처리
document.querySelectorAll('.keyboard-btn').forEach(button => {
    button.addEventListener('click', function() {
        const key = button.dataset.key;

        // 소리 재생
        playKeySound(key);

        // 입력창에 문자를 추가
        const inputField = document.getElementById("keyboard-input");
        inputField.value += key;

        // 버튼 하이라이트
        button.classList.add("active");
        
        // 버튼 하이라이트 효과가 끝난 후 클래스 제거
        setTimeout(() => {
            button.classList.remove("active");
        }, 100);  // 100ms 후 버튼 하이라이트 원상복구
    });
});

// 키보드 입력 시 소리 및 입력 처리
document.getElementById("keyboard-input").addEventListener("keydown", function(event) {
    const key = event.key.toUpperCase();  // 눌린 키
    const button = document.querySelector(`.keyboard-btn[data-key="${key}"]`);

    if (button) {
        // 소리 재생
        playKeySound(key);

        // 버튼 하이라이트
        button.classList.add("active");

        // 입력창에 문자를 추가
        const inputField = document.getElementById("keyboard-input");
        inputField.value += event.key;

        // 버튼 하이라이트 효과가 끝난 후 클래스 제거
        setTimeout(() => {
            button.classList.remove("active");
        }, 100);  // 100ms 후 버튼 하이라이트 원상복구
    }
});
