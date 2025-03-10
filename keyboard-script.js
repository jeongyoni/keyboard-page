document.addEventListener("keydown", playSound); // 키보드로 타이핑 시 소리 재생
document.querySelectorAll(".key").forEach(key => {
    key.addEventListener("click", playSound);
});

function playSound(event) {
    const key = event.key || event.target.getAttribute("data-key");
    const sound = new Audio(`sounds/${key.toLowerCase()}.mp3`); // 소리 파일 이름을 키에 맞춰 설정
    sound.play();

    // 눌린 키 하이라이트 효과
    const button = document.querySelector(`.key[data-key="${key}"]`);
    if (button) {
        button.classList.add("active");
        setTimeout(() => button.classList.remove("active"), 100); // 눌린 후 100ms 뒤에 원상복귀
    }

    // 입력창에도 글자 입력 (실제 키보드 입력 시 발생하는 것처럼)
    const inputField = document.getElementById("keyboard-input");
    if (key && inputField) {
        inputField.value += key;
    }
}
