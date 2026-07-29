import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Key from './Key';
import { getLayout, DEFAULT_LAYOUT_KEY } from '../../data/keyLayouts';
import { flattenKleLayout } from '../../utils/kle';
import { getDesign, resolveKeyColors } from '../../data/keyboardDesigns';
import { getKoreanLegend } from '../../data/koreanLegends';
import styles from './Keyboard.module.css';

export const KEY_SIZE = 52;

// Win / Mac 에서 모디파이어 각인만 바꾼다. 위치·매칭은 원본 legend 로 유지하고
// '보이는 글자'만 교체한다. (Win 키 -> Option, Alt 키 -> Command)
const OS_LEGENDS = {
  win: {},
  mac: { Win: 'Opt', Alt: 'Cmd' },
};

function osLegend(legend, os) {
  return (OS_LEGENDS[os] && OS_LEGENDS[os][legend]) || legend;
}

/**
 * KLE 레이아웃을 받아 키캡을 배치하고, 선택한 디자인(색상 조합)과 OS 각인을 입힌다.
 * pressedKey 와 일치하는 키캡은 눌린 상태로 표시된다.
 */
function Keyboard({ layoutKey = DEFAULT_LAYOUT_KEY, designId = 'milky', os = 'win', pressedKey = '', onKeyDown, onKeyUp }) {
  const layout = getLayout(layoutKey);
  const design = getDesign(designId);

  const keys = useMemo(() => flattenKleLayout(JSON.parse(layout.kle)), [layout]);

  const width = Math.max(...keys.map((k) => k.x + k.width)) * KEY_SIZE;
  const height = (Math.max(...keys.map((k) => k.y + k.height)) + 0.15) * KEY_SIZE;

  return (
    <div className={styles.case} style={{ '--case': design.case }}>
      <div className={styles.plate} style={{ width, height }}>
        {keys.map((k) => {
          const { cap, text } = resolveKeyColors(design, k.legend);
          return (
            <Key
              key={k.id}
              legend={osLegend(k.legend, os)}
              sublegend={getKoreanLegend(k.legend) || k.sublegend}
              x={k.x}
              y={k.y}
              width={k.width}
              height={k.height}
              keytopColor={cap}
              textColor={text}
              pressed={isPressed(pressedKey, k.legend)}
              onDown={onKeyDown}
              onUp={onKeyUp}
            />
          );
        })}
      </div>
    </div>
  );
}

/** 물리 키 입력(codeToLegend 결과)과 키캡 legend를 느슨하게 매칭 */
function isPressed(pressedKey, legend) {
  if (!pressedKey || !legend) return false;
  if (pressedKey === legend) return true;
  if (pressedKey.toLowerCase() === legend.toLowerCase()) return true;
  if (pressedKey === ' ' && legend.toLowerCase() === 'space') return true;
  return false;
}

Keyboard.propTypes = {
  layoutKey: PropTypes.string,
  designId: PropTypes.string,
  os: PropTypes.oneOf(['win', 'mac']),
  pressedKey: PropTypes.string,
  onKeyDown: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
};


export default Keyboard;
