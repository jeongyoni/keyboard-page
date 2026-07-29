import React from 'react';
import PropTypes from 'prop-types';
import { SWITCHES, formatSwitchLabel, getSwitch } from '../../data/switches';
import styles from './SwitchSelector.module.css';

/** 축 선택 드롭다운. 사운드가 없는 축은 disabled 로 표시된다. */
function SwitchSelector({ value, onChange }) {
  const current = getSwitch(value);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="switch-select">
        축 선택
      </label>
      <select
        id="switch-select"
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {SWITCHES.map((sw) => (
          <option key={sw.id} value={sw.id} disabled={!sw.available}>
            {formatSwitchLabel(sw)}
            {sw.available ? '' : ' — 준비중'}
          </option>
        ))}
      </select>
      {current.description ? (
        <p className={styles.description}>{current.description}</p>
      ) : null}
    </div>
  );
}

SwitchSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SwitchSelector;
