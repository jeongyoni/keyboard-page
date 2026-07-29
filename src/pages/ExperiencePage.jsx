import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ExperienceSection from '../sections/ExperienceSection';
import SiteFooter from '../sections/SiteFooter';
import { useKeySound } from '../hooks/useKeySound';
import { DEFAULT_SWITCH_ID, getSwitch } from '../data/switches';
import { DEFAULT_DESIGN_ID, getDesign } from '../data/keyboardDesigns';
import { DEFAULT_LAYOUT_KEY, getLayout } from '../data/keyLayouts';
import { codeToLegend } from '../data/keyCodes';
import { navigate } from '../router';

/**
 * 키감 체험 페이지 (#/experience).
 * 소리 재생과 전역 키 입력 리스너는 이 페이지에서만 살아있다 —
 * 홈에서는 키를 눌러도 소리가 나지 않는다.
 */
function ExperiencePage({ initialSwitchId, initialDesignId, initialLayoutKey, initialOs }) {
  const [switchId, setSwitchId] = useState(
    () => (getSwitch(initialSwitchId).available ? initialSwitchId : DEFAULT_SWITCH_ID)
  );
  const [designId, setDesignId] = useState(() => getDesign(initialDesignId).id);
  const [layoutKey, setLayoutKey] = useState(() => getLayout(initialLayoutKey).key);
  const [os, setOs] = useState(() => (initialOs === 'mac' ? 'mac' : 'win'));
  const [mode, setMode] = useState('free'); // 'free' | 'practice'
  const [pressedKey, setPressedKey] = useState('');
  const [text, setText] = useState('');

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

  // 물리 키보드 입력 — 소리는 물리 키(e.code) 하나로만 결정한다. (hooks/useKeySound 참고)
  useEffect(() => {
    const onDown = (e) => {
      if (e.repeat) return;
      play(e.key, e.code);
      // 하이라이트도 물리 키(code) 기준. 한글 IME 중엔 e.key 가 'Process' 라
      // e.key 로는 어떤 키캡과도 매칭되지 않아 눌림이 안 보인다.
      setPressedKey(codeToLegend(e.code) || e.key);
    };
    const onUp = () => setPressedKey('');
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, [play]);

  return (
    <>
      <header className="exp-header">
        <button type="button" className="back-link" onClick={() => navigate('home')}>
          ← 홈으로
        </button>
        <span className="exp-title">키감 체험</span>
        <a
          className="store-link"
          href="https://www.groovestone.co.kr/"
          target="_blank"
          rel="noreferrer"
        >
          공식 스토어
        </a>
      </header>

      <ExperienceSection
        switchId={switchId}
        onSwitchChange={setSwitchId}
        designId={designId}
        onDesignChange={setDesignId}
        layoutKey={layoutKey}
        onLayoutChange={setLayoutKey}
        os={os}
        onOsChange={setOs}
        mode={mode}
        onModeChange={setMode}
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

ExperiencePage.propTypes = {
  initialSwitchId: PropTypes.string,
  initialDesignId: PropTypes.string,
  initialLayoutKey: PropTypes.string,
  initialOs: PropTypes.string,
};

export default ExperiencePage;
