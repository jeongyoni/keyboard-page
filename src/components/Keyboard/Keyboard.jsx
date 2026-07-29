import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Key from './Key';
import { keyPresets } from '../../data/keyLayouts';
import { flattenKleLayout } from '../../utils/kle';
import styles from './Keyboard.module.css';

export const KEY_SIZE = 54;

/**
 * KLE 레이아웃을 받아 키캡을 배치한다.
 * pressedKey 와 일치하는 키캡은 눌린 상태로 표시된다.
 */
function Keyboard({ layoutKey = '9009_wkltkl', pressedKey = '', onKeyDown, onKeyUp }) {
  const layout = keyPresets.find((preset) => preset.key === layoutKey);

  const keys = useMemo(() => {
    if (!layout) return [];
    return flattenKleLayout(JSON.parse(layout.kle));
  }, [layout]);

  if (!layout) {
    return <div className={styles.error}>레이아웃 &quot;{layoutKey}&quot;을 찾을 수 없습니다.</div>;
  }

  const width = Math.max(...keys.map((k) => k.x + k.width)) * KEY_SIZE;
  const height = (Math.max(...keys.map((k) => k.y + k.height)) + 0.2) * KEY_SIZE;

  return (
    <div className={styles.keyboard} style={{ width, height }}>
      {keys.map((k) => (
        <Key
          key={k.id}
          legend={k.legend}
          sublegend={k.sublegend}
          x={k.x}
          y={k.y}
          width={k.width}
          height={k.height}
          keytopColor={k.color}
          textColor={k.textColor}
          pressed={isPressed(pressedKey, k.legend)}
          onDown={onKeyDown}
          onUp={onKeyUp}
        />
      ))}
    </div>
  );
}

/** 물리 키 입력(e.key)과 키캡 legend를 느슨하게 매칭 */
function isPressed(pressedKey, legend) {
  if (!pressedKey || !legend) return false;
  if (pressedKey === legend) return true;
  if (pressedKey.toLowerCase() === legend.toLowerCase()) return true;
  if (pressedKey === ' ' && legend.toLowerCase() === 'space') return true;
  return false;
}

Keyboard.propTypes = {
  layoutKey: PropTypes.string,
  pressedKey: PropTypes.string,
  onKeyDown: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
};


export default Keyboard;
