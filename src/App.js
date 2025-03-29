import React, { useState } from 'react';
import Keyboard from './components/Keyboard'; // 경로 주의!

const App = () => {
  const [key, setKey] = useState('');

  const handleMouseDown = (keyName) => {
    setKey(keyName);
    const audio = new Audio(`/sounds/${keyName}.mp3`);
    audio.play();

    const textarea = document.getElementById('keyboard-input');
    if (textarea) {
      textarea.value += keyName === 'Space' ? ' ' : keyName;
    }

    const event = new KeyboardEvent('keydown', { key: keyName });
    document.dispatchEvent(event);
  };

  const handleMouseUp = () => {
    setKey('');
  };

  return (
    <>
      <h2>가상 키보드</h2>
      <Keyboard
        layoutKey="9009_wkltkl"
        pressedKey={key}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
      />
      <textarea id="keyboard-input" placeholder="여기에 입력해보세요!" />
    </>
  );
};

export default App;
