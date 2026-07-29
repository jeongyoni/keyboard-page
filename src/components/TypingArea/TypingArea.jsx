import React from 'react';
import PropTypes from 'prop-types';
import styles from './TypingArea.module.css';

/** 타이핑 입력창. 실제 소리 재생은 상위(App)의 전역 keydown 리스너가 담당한다. */
function TypingArea({ value, onChange, inputRef = null }) {
  return (
    <div className={styles.wrapper}>
      <textarea
        ref={inputRef}
        id="keyboard-input"
        className={styles.textarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="여기에 타이핑해보세요. 키보드를 직접 두드려도 소리가 납니다."
        rows={4}
        spellCheck={false}
      />
    </div>
  );
}

TypingArea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
};


export default TypingArea;
