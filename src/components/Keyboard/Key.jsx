import React from 'react';
import PropTypes from 'prop-types';
import styles from './Key.module.css';
import { KEY_SIZE } from './Keyboard';

/** 키캡 하나. 위치/크기는 KLE 단위(1 = KEY_SIZE px)로 받는다. */
function Key({
  legend,
  sublegend = '',
  x,
  y,
  width,
  height,
  keytopColor = '#f5f5f5',
  textColor = '#222',
  pressed = false,
  onDown,
  onUp,
}) {
  const left = x * KEY_SIZE;
  const top = y * KEY_SIZE;
  const w = width * KEY_SIZE;
  const h = height * KEY_SIZE;
  const inset = KEY_SIZE / 9;

  return (
    <button
      type="button"
      className={`${styles.keycap} ${pressed ? styles.pressed : ''}`}
      style={{ left, top, width: w, height: h }}
      onMouseDown={() => onDown(legend)}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      aria-label={legend}
      aria-pressed={pressed}
      tabIndex={-1}
    >
      <span
        className={styles.keytop}
        style={{
          inset: `${inset / 2}px ${inset}px ${inset * 1.5}px ${inset}px`,
          backgroundColor: keytopColor,
          color: textColor,
        }}
      >
        <span className={styles.legend}>{legend}</span>
        {sublegend ? <span className={styles.sublegend}>{sublegend}</span> : null}
      </span>
    </button>
  );
}

Key.propTypes = {
  legend: PropTypes.string.isRequired,
  sublegend: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  keytopColor: PropTypes.string,
  textColor: PropTypes.string,
  pressed: PropTypes.bool,
  onDown: PropTypes.func.isRequired,
  onUp: PropTypes.func.isRequired,
};


export default Key;
