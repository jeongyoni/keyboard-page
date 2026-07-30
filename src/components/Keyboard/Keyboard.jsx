import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Key from './Key';
import { getLayout, DEFAULT_LAYOUT_KEY } from '../../data/keyLayouts';
import { flattenKleLayout } from '../../utils/kle';
import { getDesign, resolveKeyColors, DEFAULT_DESIGN_ID } from '../../data/keyboardDesigns';
import { getKoreanLegend } from '../../data/koreanLegends';
import styles from './Keyboard.module.css';

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
 *
 * 크기는 순수 CSS(컨테이너 쿼리)로 정한다. 키 하나의 크기 --u 를
 *   --u = min(54px, (컨테이너폭 - 여백) / 가로유닛수)
 * 로 잡아, 키보드 전체 폭이 컨테이너를 절대 넘지 않는다(=잘리지 않는다).
 * 넓으면 54px(원래 크기), 좁으면 그만큼 작아진다. JS 측정에 의존하지 않는다.
 */
function Keyboard({ layoutKey = DEFAULT_LAYOUT_KEY, designId = DEFAULT_DESIGN_ID, os = 'win', pressedKey = '', onKeyDown, onKeyUp }) {
  const layout = getLayout(layoutKey);
  const design = getDesign(designId);

  const keys = useMemo(() => flattenKleLayout(JSON.parse(layout.kle)), [layout]);

  const cols = Math.max(...keys.map((k) => k.x + k.width)); // 가로 유닛 수
  const rows = Math.max(...keys.map((k) => k.y + k.height)) + 0.15; // 세로 유닛 수

  // --denom: --u 계산의 분모(가로유닛수 + 케이스 패딩 여유분)
  const caseVars = { '--case': design.case, '--cols': cols, '--rows': rows, '--denom': cols + 0.6 };

  return (
    <div className={styles.fit}>
      <div className={styles.case} style={caseVars}>
        <div className={styles.plate}>
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
