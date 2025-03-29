import React, { useState } from 'react';
import Home from './Home';
import Keyboard from './components/Keyboard';

function App() {
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
      <Home />
      <hr />
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
}

export default App;
