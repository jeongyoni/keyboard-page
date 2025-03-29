const inputField = document.getElementById("keyboard-input");
const switchSelect = document.getElementById("switch-select");
const themeSelect = document.getElementById("color-select");
const keyboard = document.querySelector(".keyboard");
const audioCache = {};

function getCurrentSwitch() {
    return switchSelect ? switchSelect.value : "milky";
}

function preloadSound(key) {
    const currentSwitch = getCurrentSwitch();
    const fileName = key.toLowerCase();
    const soundFile = `./sounds/${currentSwitch}/${fileName}.mp3`;
  
    const audio = new Audio(soundFile);
    audio.preload = "auto";
    audioCache[`${currentSwitch}_${key}`] = audio;
}
   

function playKeySound(key) {
    const currentSwitch = getCurrentSwitch();
    const cacheKey = `${currentSwitch}_${key}`;
    const soundFile = `./sounds/${currentSwitch}/${key.toLowerCase()}.mp3`;
  
    if (!audioCache[cacheKey]) {
      preloadSound(key);
    }

    const audio = audioCache[cacheKey].cloneNode();
    audio.currentTime = 0;
    audio.play().catch(error => console.warn("소리 재생 오류:", error));
}

// ✅ `keydown` 이벤트에서 한글 입력 차단
document.addEventListener("keydown", function(event) {
    if (event.isComposing || event.key.length > 1) return;
    event.preventDefault(); // 기본 입력 방지
    playKeySound(event.key);
  });


// ✅ `input` 이벤트에서만 텍스트 입력 처리
inputField.addEventListener("input", function(event) {
  if (event.isComposing) return;
  const key = event.data;
  if (key) playKeySound(key);
});


document.querySelectorAll('.key').forEach(button => {
    button.addEventListener('click', () => {
      const char = button.textContent === 'Space' ? ' ' : button.textContent;
      inputField.value += char;
      playKeySound(char);
  
      // 효과 주기 (선택사항)
      button.classList.add('pressed');
      setTimeout(() => button.classList.remove('pressed'), 150);
    });
  });

  themeSelect.addEventListener('change', function () {
    const selectedTheme = this.value;
    keyboard.className = 'keyboard'; // 초기화
    keyboard.classList.add(selectedTheme);
  });
