import React from 'react';
import PropTypes from 'prop-types';
import styles from './Key.module.css';

// 키 사이 간격(유닛 비율). 키캡을 유닛보다 살짝 작게 그려 실제 보드처럼 틈을 만든다.
const HALF_GAP = 0.037; // 한쪽 여백 (유닛 비율)
const GAP = HALF_GAP * 2;

/**
 * 키캡 하나. 위치/크기는 KLE 단위로 받아 CSS 변수 --u(유닛당 px)로 환산한다.
 * 덕분에 키보드 전체가 컨테이너 폭에 맞춰 함께 확대/축소된다.
 */
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
  const style = {
    left: `calc(var(--u) * ${x + HALF_GAP})`,
    top: `calc(var(--u) * ${y + HALF_GAP})`,
    width: `calc(var(--u) * ${width - GAP})`,
    height: `calc(var(--u) * ${height - GAP})`,
    backgroundColor: keytopColor,
  };

  return (
    <button
      type="button"
      className={`${styles.keycap} ${pressed ? styles.pressed : ''}`}
      style={style}
      onMouseDown={() => onDown(legend)}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      aria-label={legend}
      aria-pressed={pressed}
      tabIndex={-1}
    >
      <span
        className={`${styles.keytop} ${sublegend ? styles.dual : ''}`}
        style={{ backgroundColor: keytopColor, color: textColor }}
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
