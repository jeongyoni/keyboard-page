export function parseEscapedChars(label) {
    return label.replace(/\\u([0-9A-F]{4})/gi, (match, grp) => {
      return String.fromCharCode(parseInt(grp, 16));
    });
  }
  
  export function parseLegends(label) {
    const parts = label.split('\n');
    return {
      legend: parts[0] || '',
      sublegend: parts[1] || '',
    };
  }
  