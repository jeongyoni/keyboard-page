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

// ✅ 영어 및 특수문자 입력 시 소리 재생 (한글 조합 중에는 실행 안 함)
document.addEventListener("keydown", function(event) {
    if (event.isComposing) {
        return;
    }

    const key = event.key;

    if (key === " ") {
        playKeySound("space");
    } else {
        playKeySound(key);
    }
});

// ✅ 한글 조합이 끝난 후 (완성된 문자) 타건 소리 재생
inputField.addEventListener("compositionend", function(event) {
    const lastChar = event.data[event.data.length - 1];
    playKeySound(lastChar);
});
