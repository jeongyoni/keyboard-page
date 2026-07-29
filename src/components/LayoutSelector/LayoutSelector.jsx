import React from 'react';
import PropTypes from 'prop-types';
import { keyPresets } from '../../data/keyLayouts';
import styles from '../SwitchSelector/SwitchSelector.module.css';

/** 키보드 배열(풀배열/컴팩트) 선택 드롭다운. */
function LayoutSelector({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="layout-select">
        배열
      </label>
      <select
        id="layout-select"
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {keyPresets.map((p) => (
          <option key={p.key} value={p.key}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}

LayoutSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LayoutSelector;
