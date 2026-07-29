import React, { useCallback, useEffect, useRef, useState } from 'react';
import SiteHeader from './sections/SiteHeader';
import Introduction from './sections/Introduction';
import ProductList from './sections/ProductList';
import ExperienceSection from './sections/ExperienceSection';
import SiteFooter from './sections/SiteFooter';
import { useKeySound } from './hooks/useKeySound';
import { DEFAULT_SWITCH_ID, getSwitch } from './data/switches';
import { shouldIgnoreKeydown, createPlayGate, diffComposition } from './utils/ime';

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

  // keydown 과 compositionupdate 양쪽에서 잡힐 때 두 번 울리는 것을 막는 게이트
  const gateRef = useRef(createPlayGate());

  // 물리 키보드 입력 — 이 사이트의 핵심 상호작용
  useEffect(() => {
    const onDown = (e) => {
      // 조합 중이라도 자모가 실려 오면 재생한다. utils/ime.js 참고
      if (shouldIgnoreKeydown(e)) return;
      if (!gateRef.current()) return;
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

  // 한글 IME: keydown 의 e.key 가 'Process' 로 오는 환경을 위한 보조 경로
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return undefined;

    let prev = '';
    const onUpdate = (e) => {
      const added = diffComposition(prev, e.data || '');
      prev = e.data || '';
      if (!added) return;
      if (!gateRef.current()) return;
      play(added);
      setPressedKey(added);
    };
    const onEnd = () => {
      prev = '';
      setPressedKey('');
    };

    el.addEventListener('compositionupdate', onUpdate);
    el.addEventListener('compositionend', onEnd);
    return () => {
      el.removeEventListener('compositionupdate', onUpdate);
      el.removeEventListener('compositionend', onEnd);
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
