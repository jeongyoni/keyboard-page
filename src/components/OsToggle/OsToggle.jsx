import React from 'react';
import PropTypes from 'prop-types';
import styles from './OsToggle.module.css';

const OPTIONS = [
  { id: 'win', label: 'Windows' },
  { id: 'mac', label: 'Mac' },
];

/** Win / Mac 각인 토글 (모디파이어 표기: Win·Alt ↔ Opt·Cmd). */
function OsToggle({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>각인</span>
      <div className={styles.group} role="radiogroup" aria-label="OS 각인">
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={value === o.id}
            className={`${styles.seg} ${value === o.id ? styles.active : ''}`}
            onClick={() => onChange(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

OsToggle.propTypes = {
  value: PropTypes.oneOf(['win', 'mac']).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OsToggle;
