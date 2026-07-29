/**
 * KLE(keyboard-layout-editor) 포맷 파싱 유틸.
 */

/** "\u00XX" 형태의 이스케이프를 실제 문자로 변환 */
export function parseEscapedChars(label) {
  if (!label) return '';
  return label.replace(/\\u([0-9A-F]{4})/gi, (_, grp) =>
    String.fromCharCode(parseInt(grp, 16))
  );
}

/** 키캡 legend를 상단/하단으로 분리 */
export function parseLegends(label) {
  const parts = (label || '').split('\n');
  return {
    legend: parts[0] || '',
    sublegend: parts[1] || '',
  };
}

/**
 * KLE 배열을 렌더링용 키 목록으로 펼친다.
 * KLE는 "직전에 나온 객체가 다음 키에만 적용되는" 누적 포맷이라 순서대로 훑어야 한다.
 *
 * @param {Array} kle - JSON.parse 된 KLE 배열 (행들의 배열)
 * @returns {Array<{legend,sublegend,x,y,width,height,color,textColor,id}>}
 */
export function flattenKleLayout(kle) {
  const keys = [];
  let style = {};

  kle.forEach((row, rowIndex) => {
    let x = 0;
    let y = rowIndex;

    row.forEach((entry) => {
      if (typeof entry === 'object' && entry !== null) {
        // 스타일/위치 지시자
        if (entry.x !== undefined) x += entry.x;
        if (entry.y !== undefined) y += entry.y;
        style = { ...style, ...entry };
        return;
      }

      const [top = '', bottom = ''] = String(entry).split('\n');
      const width = style.w || 1;
      const height = style.h || 1;

      keys.push({
        id: `${top.replace(/\s/g, '') || 'key'}_${x}_${y}`,
        legend: parseEscapedChars(top),
        sublegend: parseEscapedChars(bottom),
        x,
        y,
        width,
        height,
        color: style.c || '#f5f5f5',
        textColor: style.t || '#222',
      });

      x += width;
      // w/h 는 다음 키로 이월되지 않는다
      delete style.w;
      delete style.h;
    });
  });

  return keys;
}
