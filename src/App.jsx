import React, { useCallback, useEffect, useState } from 'react';
import Home from './Home';
import Keyboard from './components/Keyboard';
import { useKeySound } from './hooks/useKeySound';

function App() {
  const [pressedKey, setPressedKey] = useState('');
  const [text, setText] = useState('');
  const { play } = useKeySound();

  // 가상 키보드 클릭
  const handleMouseDown = useCallback(
    (legend) => {
      setPressedKey(legend);
      play(legend);
      setText((prev) => (legend === 'Space' ? prev + ' ' : prev + legend));
    },
    [play]
  );

  const handleMouseUp = useCallback(() => setPressedKey(''), []);

  // 물리 키보드 입력
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.repeat) return;            // 길게 누를 때 연속 재생 방지
      if (e.isComposing) return;       // 한글 조합 중 중복 방지
      play(e.key, e.code);
      setPressedKey(e.key);
    };
    const onKeyUp = () => setPressedKey('');

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [play]);

  return (
    <>
      <Home />
      <hr />
      <h2>가상 키보드</h2>
      <Keyboard
        layoutKey="9009_wkltkl"
        pressedKey={pressedKey}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
      />
      <textarea
        id="keyboard-input"
        placeholder="여기에 입력해보세요!"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </>
  );
}

export default App;
