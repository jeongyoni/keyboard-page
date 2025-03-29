const inputField = document.getElementById("keyboard-input");
const audioCache = {};

function preloadSound(key) {
    let soundFile = `./sounds/${key.toLowerCase()}.mp3`;
    let audio = new Audio(soundFile);
    audio.preload = "auto";
    audioCache[key] = audio;
}

function playKeySound(key) {
    let soundFile = `./sounds/${key.toLowerCase()}.mp3`;

    if (!audioCache[key]) {
        preloadSound(key);
    }

    let audio = audioCache[key].cloneNode();
    audio.currentTime = 0;
    audio.play().catch(error => console.warn("소리 재생 오류:", error));
}

// ✅ `keydown` 이벤트에서 한글 입력 차단
document.addEventListener("keydown", function(event) {
    if (event.isComposing || event.key.length > 1) {
        return; 
    }

    event.preventDefault(); // 기본 입력 방지
    playKeySound(event.key);
});

// ✅ `input` 이벤트에서만 텍스트 입력 처리
inputField.addEventListener("input", function(event) {
    if (event.isComposing) {
        return; // 한글 조합 중일 때는 실행 안 함
    }

    const key = event.data;
    if (key) {
        playKeySound(key);
    }
});
