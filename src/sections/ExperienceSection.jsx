import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Keyboard from '../components/Keyboard/Keyboard';
import SwitchSelector from '../components/SwitchSelector/SwitchSelector';
import TypingArea from '../components/TypingArea/TypingArea';

/**
 * 이 사이트의 핵심 섹션.
 * 사용자가 실제 키보드를 두드리면 선택한 축의 타건음이 재생된다.
 */
const ExperienceSection = forwardRef(function ExperienceSection(
  {
    switchId,
    onSwitchChange,
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
        축을 고르고 키보드를 두드려보세요. 화면의 키를 눌러도 같은 소리가 납니다.
      </p>

      <SwitchSelector value={switchId} onChange={onSwitchChange} />

      {soundError ? (
        <p className="sound-status sound-status--error">
          사운드를 불러오지 못했습니다: {soundError}
        </p>
      ) : !soundReady ? (
        <p className="sound-status">사운드 불러오는 중...</p>
      ) : null}

      <div className="keyboard-deck">
        <Keyboard
          layoutKey="9009_wkltkl"
          pressedKey={pressedKey}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
        />
      </div>

      <TypingArea value={text} onChange={onTextChange} inputRef={inputRef} />
    </section>
  );
});

ExperienceSection.propTypes = {
  switchId: PropTypes.string.isRequired,
  onSwitchChange: PropTypes.func.isRequired,
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
