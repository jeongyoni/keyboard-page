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
  { switchId, onSwitchChange, pressedKey = '', text, onTextChange, onKeyDown, onKeyUp, inputRef = null },
  ref
) {
  return (
    <section id="tactile-experience" ref={ref}>
      <h2>키감 체험하기</h2>
      <p>
        축을 고르고 키보드를 두드려보세요. 화면의 키를 눌러도 같은 소리가 납니다.
      </p>

      <SwitchSelector value={switchId} onChange={onSwitchChange} />

      <Keyboard
        layoutKey="9009_wkltkl"
        pressedKey={pressedKey}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      />

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
};


export default ExperienceSection;
