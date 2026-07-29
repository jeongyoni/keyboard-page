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
  const { play, ready, error } = useKeySound({ switchId });

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

  // 물리 키보드 입력 — 이 사이트의 핵심 상호작용.
  //
  // 소리는 물리 키(e.code) 하나로만 결정한다. code 는 한글 IME 조합 중에도
  // ('Process' keydown 이어도) 항상 실제 물리 키를 담고 있어, 한글·영문·겹자모를
  // 구분 없이 이 한 경로로 처리한다. compositionupdate 를 함께 쓰던 예전 구조는
  // 같은 키가 두 번 울리거나(찢어짐) 완성형 음절이 매핑되지 않아 무음이 새는
  // 문제가 있어 걷어냈다. 텍스트 입력 자체는 textarea 가 controlled 로 처리한다.
  useEffect(() => {
    const onDown = (e) => {
      if (e.repeat) return; // 길게 누를 때 연속 재생 방지
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
        soundReady={ready}
        soundError={error}
      />
      <SiteFooter />
    </>
  );
}

export default App;
