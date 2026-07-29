import React from 'react';
import PropTypes from 'prop-types';
import styles from '../OsToggle/OsToggle.module.css';

const OPTIONS = [
  { id: 'free', label: '자유 타이핑' },
  { id: 'practice', label: '타자연습' },
];

/** 자유 타이핑 / 타자연습 모드 전환. */
function ModeToggle({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.group} role="radiogroup" aria-label="입력 모드">
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

ModeToggle.propTypes = {
  value: PropTypes.oneOf(['free', 'practice']).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ModeToggle;
