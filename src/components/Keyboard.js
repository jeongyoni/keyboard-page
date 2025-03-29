// src/components/Keyboard.js
import React from 'react'
import Key from '../key/Key'
import { keyPresets } from '../keyModules/keyPresets'
import { parseEscapedChars, parseLegends } from '../keyModules/parseModules'

// key 사이즈 정의 (Key.js와 동일하게 54)
const keysize = 54;

const Keyboard = ({ layoutKey = '9009_wkltkl', pressedKey = '', handleMouseDown, handleMouseUp }) => {
  const layout = keyPresets.find(preset => preset.key === layoutKey)

  if (!layout) {
    return <div>❌ 레이아웃 "{layoutKey}"을 찾을 수 없습니다.</div>
  }

  const kle = JSON.parse(`[${layout.kle}]`)
  let x = 0, y = 0;
  let defaultWidth = 1, defaultHeight = 1;
  let currentStyle = {};
  let keys = [];

  kle.forEach((row, rowIndex) => {
    x = 0;
    y = rowIndex;
    row.forEach((key, keyIndex) => {
      if (typeof key === 'object') {
        // 스타일 업데이트
        if (key.x !== undefined) x += key.x;
        if (key.y !== undefined) y = key.y;
        currentStyle = { ...currentStyle, ...key };
        if (key.w !== undefined) defaultWidth = key.w;
        if (key.h !== undefined) defaultHeight = key.h;
      } else {
        const legends = key.split('\n');
        const topLegend = legends[0] || '';
        const bottomLegend = legends[1] || '';
        const keyClassName = `${topLegend.replace(/\s/g, '')}_${x}_${y}`

        keys.push(
          <Key
            key={keyClassName}
            className={keyClassName}
            legend={parseEscapedChars(topLegend)}
            sublegend={parseEscapedChars(bottomLegend)}
            x={x}
            y={y}
            width={currentStyle.w || defaultWidth}
            height={currentStyle.h || defaultHeight}
            keytopcolor={currentStyle.c || '#f5f5f5'}
            keybordercolor={currentStyle.c || '#dcdcdc'}
            textcolor={currentStyle.t || '#222'}
            pressed={pressedKey === topLegend}
            mouseDown={handleMouseDown}
            mouseUp={handleMouseUp}
          />
        )
        x += currentStyle.w || defaultWidth;
      }
    });
  });

  return (
    <div
      style={{
        position: 'relative',
        width: 'calc(24 * 54px)',
        height: 'auto',
        margin: '0 auto',
      }}
    >
      {keys}
    </div>
  );
}

export default Keyboard
