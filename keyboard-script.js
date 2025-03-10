// 가상 키보드 버튼 클릭 시 입력 처리
document.querySelectorAll('#virtual-keyboard .key').forEach(button => {
    button.addEventListener('click', function() {
        const key = button.getAttribute('data-key');
        const sound = new Audio(`sounds/${key.toLowerCase()}.mp3`);
        sound.play();

        // 입력창에 해당 키 추가
        const inputField = document.getElementById("keyboard-input");
        if (key === 'Space') {
            inputField.value += ' '; // 스페이스바는 공백으로 처리
        } else if (key === 'Enter') {
            inputField.value += '\n'; // 엔터키는 줄바꿈 처리
        } else {
            inputField.value += key; // 그 외 키는 입력
        }

        // 버튼 하이라이트 효과
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);
    });
});
