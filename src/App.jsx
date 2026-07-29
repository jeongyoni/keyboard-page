import React, { useCallback, useEffect, useRef, useState } from 'react';
import SiteHeader from './sections/SiteHeader';
import Introduction from './sections/Introduction';
import ProductList from './sections/ProductList';
import ExperienceSection from './sections/ExperienceSection';
import SiteFooter from './sections/SiteFooter';
import { useKeySound } from './hooks/useKeySound';
import { DEFAULT_SWITCH_ID, getSwitch } from './data/switches';

function App() {
  const [switchId, setSwitchId] = useState(DEFAULT_SWITCH_ID);
  const [pressedKey, setPressedKey] = useState('');
  const [text, setText] = useState('');

  const experienceRef = useRef(null);
  const inputRef = useRef(null);
  const { play } = useKeySound({ switchId });

  // 화면 키캡 클릭
  const handleKeyDown = useCallback(
    (legend) => {
      setPressedKey(legend);
      play(legend);
      setText((prev) => (legend.toLowerCase() === 'space' ? `${prev} ` : prev + legend));
    },
    [play]
  );

  const handleKeyUp = useCallback(() => setPressedKey(''), []);

  // 물리 키보드 입력 — 이 사이트의 핵심 상호작용
  useEffect(() => {
    const onDown = (e) => {
      if (e.repeat) return; // 길게 누를 때 연속 재생 방지
      if (e.isComposing) return; // 한글 조합 중 중복 방지
      play(e.key, e.code);
      setPressedKey(e.key);
    };
    const onUp = () => setPressedKey('');

    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, [play]);

  // 제품 카드에서 "이 축 소리 듣기" -> 축 전환 + 체험 섹션으로 스크롤
  const handleTrySwitch = useCallback((id) => {
    const sw = getSwitch(id);
    if (!sw.available) return;
    setSwitchId(id);
    experienceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => inputRef.current?.focus(), 400);
  }, []);

  return (
    <>
      <SiteHeader />
      <Introduction />
      <ProductList onTrySwitch={handleTrySwitch} />
      <ExperienceSection
        ref={experienceRef}
        switchId={switchId}
        onSwitchChange={setSwitchId}
        pressedKey={pressedKey}
        text={text}
        onTextChange={setText}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        inputRef={inputRef}
      />
      <SiteFooter />
    </>
  );
}

export default App;
