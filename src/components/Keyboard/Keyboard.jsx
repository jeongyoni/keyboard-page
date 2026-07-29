import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Key from './Key';
import { getLayout, DEFAULT_LAYOUT_KEY } from '../../data/keyLayouts';
import { flattenKleLayout } from '../../utils/kle';
import { getDesign, resolveKeyColors } from '../../data/keyboardDesigns';
import { getKoreanLegend } from '../../data/koreanLegends';
import styles from './Keyboard.module.css';

export const KEY_SIZE = 54;

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
 *
 * 키보드는 컨테이너 폭에 맞춰 자동으로 축소된다(절대 잘리지 않음). 원래 폭보다
 * 공간이 좁으면 transform:scale 로 줄이고, 넓으면 원래 크기(최대 1배)를 유지한다.
 */
function Keyboard({ layoutKey = DEFAULT_LAYOUT_KEY, designId = 'milky', os = 'win', pressedKey = '', onKeyDown, onKeyUp }) {
  const layout = getLayout(layoutKey);
  const design = getDesign(designId);

  const keys = useMemo(() => flattenKleLayout(JSON.parse(layout.kle)), [layout]);

  const width = Math.max(...keys.map((k) => k.x + k.width)) * KEY_SIZE;
  const height = (Math.max(...keys.map((k) => k.y + k.height)) + 0.15) * KEY_SIZE;

  const fitRef = useRef(null); // 가용 폭 측정
  const caseRef = useRef(null); // 키보드 원래 크기(transform 영향 없는 offset*)
  const [dims, setDims] = useState({ scale: 1, height: 0 });

  useLayoutEffect(() => {
    const fit = fitRef.current;
    const kase = caseRef.current;
    if (!fit || !kase) return undefined;

    const measure = () => {
      const avail = fit.clientWidth;
      const natural = kase.offsetWidth; // transform 무시하고 원래 폭 반환
      const naturalH = kase.offsetHeight;
      if (!avail || !natural) return;
      const scale = natural > avail ? avail / natural : 1;
      setDims((prev) =>
        Math.abs(prev.scale - scale) < 0.002 && Math.abs(prev.height - naturalH * scale) < 0.5
          ? prev
          : { scale, height: naturalH * scale }
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(fit);
    return () => ro.disconnect();
    // 배열이 바뀌면 원래 폭이 달라지므로 다시 측정
  }, [layoutKey]);

  return (
    <div
      ref={fitRef}
      className={styles.fit}
      style={dims.height ? { height: `${dims.height}px` } : undefined}
    >
      <div
        ref={caseRef}
        className={styles.case}
        style={{ '--case': design.case, transform: `scale(${dims.scale})`, transformOrigin: 'top center' }}
      >
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
