import React from 'react';
import PropTypes from 'prop-types';
import { KEYBOARD_DESIGNS } from '../../data/keyboardDesigns';
import styles from './DesignSelector.module.css';

/** 키보드 디자인(색상 조합) 선택. 각 칩이 케이스/키캡/포인트 색을 미리 보여준다. */
function DesignSelector({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>키보드 디자인</span>
      <div className={styles.grid} role="radiogroup" aria-label="키보드 디자인 선택">
        {KEYBOARD_DESIGNS.map((d) => {
          const selected = d.id === value;
          return (
            <button
              key={d.id}
              type="button"
              role="radio"
              aria-checked={selected}
              className={`${styles.chip} ${selected ? styles.selected : ''}`}
              onClick={() => onChange(d.id)}
              title={d.description}
            >
              <span className={styles.swatch} style={{ background: d.case }}>
                <span className={styles.dot} style={{ background: d.base.cap }} />
                <span className={styles.dot} style={{ background: d.mod.cap }} />
                <span className={styles.dot} style={{ background: d.accent.cap }} />
              </span>
              <span className={styles.name}>{d.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

DesignSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DesignSelector;
