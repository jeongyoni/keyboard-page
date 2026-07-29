import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Keyboard from '../components/Keyboard/Keyboard';
import SwitchSelector from '../components/SwitchSelector/SwitchSelector';
import DesignSelector from '../components/DesignSelector/DesignSelector';
import LayoutSelector from '../components/LayoutSelector/LayoutSelector';
import OsToggle from '../components/OsToggle/OsToggle';
import ModeToggle from '../components/ModeToggle/ModeToggle';
import TypingArea from '../components/TypingArea/TypingArea';
import TypingPractice from '../components/TypingPractice/TypingPractice';

/**
 * 이 사이트의 핵심 섹션.
 * 사용자가 축·배열·디자인·OS 각인을 고르고 실제 키보드를 두드리면
 * 선택한 구성 그대로 소리와 화면이 반응한다.
 */
const ExperienceSection = forwardRef(function ExperienceSection(
  {
    switchId,
    onSwitchChange,
    designId,
    onDesignChange,
    layoutKey,
    onLayoutChange,
    os,
    onOsChange,
    mode,
    onModeChange,
    pressedKey = '',
    text,
    onTextChange,
    onKeyDown,
    onKeyUp,
    inputRef = null,
    soundReady = false,
    soundError = null,
  },
  ref
) {
  return (
    <section id="tactile-experience" ref={ref}>
      <h2>키감 체험하기</h2>
      <p>
        축·배열·디자인·각인을 고르고 키보드를 두드려보세요. 화면의 키를 눌러도 같은 소리가 납니다.
      </p>

      <div className="kbd-controls">
        <div className="kbd-controls-row">
          <SwitchSelector value={switchId} onChange={onSwitchChange} />
          <LayoutSelector value={layoutKey} onChange={onLayoutChange} />
          <OsToggle value={os} onChange={onOsChange} />
        </div>
        <DesignSelector value={designId} onChange={onDesignChange} />
      </div>

      {soundError ? (
        <p className="sound-status sound-status--error">
          사운드를 불러오지 못했습니다: {soundError}
        </p>
      ) : !soundReady ? (
        <p className="sound-status">사운드 불러오는 중...</p>
      ) : null}

      <div className="keyboard-stage">
        <Keyboard
          layoutKey={layoutKey}
          designId={designId}
          os={os}
          pressedKey={pressedKey}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
        />
      </div>

      <ModeToggle value={mode} onChange={onModeChange} />

      {mode === 'practice' ? (
        <TypingPractice inputRef={inputRef} />
      ) : (
        <TypingArea value={text} onChange={onTextChange} inputRef={inputRef} />
      )}
    </section>
  );
});

ExperienceSection.propTypes = {
  switchId: PropTypes.string.isRequired,
  onSwitchChange: PropTypes.func.isRequired,
  designId: PropTypes.string.isRequired,
  onDesignChange: PropTypes.func.isRequired,
  layoutKey: PropTypes.string.isRequired,
  onLayoutChange: PropTypes.func.isRequired,
  os: PropTypes.oneOf(['win', 'mac']).isRequired,
  onOsChange: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['free', 'practice']).isRequired,
  onModeChange: PropTypes.func.isRequired,
  pressedKey: PropTypes.string,
  text: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  soundReady: PropTypes.bool,
  soundError: PropTypes.string,
};


export default ExperienceSection;
