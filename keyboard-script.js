// 가상 키보드 버튼 클릭 시 이벤트 처리
document.querySelectorAll('#virtual-keyboard button').forEach(button => {
    button.addEventListener('click', function(event) {
        let key = button.getAttribute('data-key');  // 눌린 키 값
        const sound = new Audio(`sounds/${key.toLowerCase()}.mp3`);
        sound.play();

        // 입력창에 키 추가
        inputField.value += key;

        // 버튼 하이라이트 효과
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100); // 100ms 뒤에 원상복귀
    });
});

// 키 입력 시 소리 재생 및 텍스트 입력
const inputField = document.getElementById("keyboard-input");

inputField.addEventListener("input", function(event) {
    const key = event.data;  // 입력된 데이터
    const sound = new Audio(`sounds/${key.toLowerCase()}.mp3`);
    sound.play();
});
