const inputField = document.getElementById("keyboard-input");
const audioCache = {};
let isComposing = false;

function preloadSound(key) {
    let soundFile = `./sounds/${key.toLowerCase()}.mp3`;
    let audio = new Audio(soundFile);
    audio.preload = "auto";
    audioCache[key] = audio;
}

function playKeySound(key) {
    let formattedKey = key.toLowerCase();

    if (!audioCache[formattedKey]) {
        preloadSound(formattedKey);
    }

    let audio = audioCache[formattedKey].cloneNode();
    audio.currentTime = 0;
    audio.play().catch(error => console.warn("소리 재생 오류:", error));
}

// ✅ 키보드 입력 처리 (한글 조합 중에는 실행 안 함)
document.addEventListener("keydown", function(event) {
    if (isComposing) return;

    const key = event.key;

    if (key === " ") {
        playKeySound("space");
    } else {
        playKeySound(key);
    }
});

// ✅ 한글 조합이 시작될 때 (IME 입력 감지)
inputField.addEventListener("compositionstart", function() {
    isComposing = true;
});

// ✅ 한글 조합이 완료될 때 (완성된 글자만 소리 재생)
inputField.addEventListener("compositionend", function(event) {
    isComposing = false;
    
    
    const lastChar = event.data.slice(-1);
    playKeySound(lastChar);
});
