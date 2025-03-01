let isLubed = true; // 기본적으로 윤활 모드

// 키 소리 재생 함수
function playKeySound(key) {
    let soundFile = isLubed ? "lubed_switch.mp3" : "unlubed_switch.mp3"; // 윤활 여부에 따라 다르게 소리
    let audio = new Audio(soundFile);
    audio.play();
}

// 윤활 여부 설정 함수
function setLubedMode(lubed) {
    isLubed = lubed;
    alert(lubed ? "윤활된 키보드 모드" : "미윤활 키보드 모드");
}
