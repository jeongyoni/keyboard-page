import React from 'react';
import PropTypes from 'prop-types';

const TYPE_LABEL = { linear: '리니어', tactile: '택타일', clicky: '클릭' };
const GAUGES = [
  { key: 'tactile', label: '타건감', tone: 'green' },
  { key: 'sound', label: '소리 깊이', tone: 'amber' },
  { key: 'quiet', label: '정숙성', tone: 'red' },
];
const MAX = 16;

/** 선택한 축의 스탯을 보여주는 포스트잇 메모. 세그먼트 게이지로 타건감/소리/정숙성 표시. */
function SwitchNote({ sw }) {
  const stats = sw.stats || { tactile: 0, sound: 0, quiet: 0 };
  return (
    <aside className="switch-note" aria-label={`${sw.label} 스탯`}>
      <span className="switch-note-pin" aria-hidden="true" />
      <div className="switch-note-head">
        <strong>{sw.label}</strong>
        <span className="switch-note-type">
          {TYPE_LABEL[sw.type] || sw.type}
          {sw.weight ? ` · ${sw.weight}` : ''}
        </span>
      </div>
      {GAUGES.map((g) => (
        <div className="pix-seg" key={g.key}>
          <div className="pix-seg-head">
            <span>{g.label}</span>
            <span>
              {stats[g.key]} / {MAX}
            </span>
          </div>
          <div className="pix-seg-track">
            {Array.from({ length: MAX }).map((_, i) => (
              <span key={i} className={`pix-seg-cell ${i < stats[g.key] ? `on ${g.tone}` : ''}`} />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}

SwitchNote.propTypes = {
  sw: PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.string,
    weight: PropTypes.string,
    stats: PropTypes.object,
  }).isRequired,
};

export default SwitchNote;
