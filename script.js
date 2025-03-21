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

inputField.addEventListener("input", function(event) {
    if (event.isComposing) {
        return;
    }

    const key = event.data;
    if (key) {
        playKeySound(key);
    }
});
