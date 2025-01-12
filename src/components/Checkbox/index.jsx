import React from 'react';

// Helper
import utils from 'utils';

// Styles
// import styles from './Checkbox.module.scss';

export default function Checkbox(props) {
  const {
    label,
    required,
    onChange,
    disabled
  } = props;

  return (
    <div className={"checkbox"}>
      <label className={"label"}>
        <input
          className={"input"}
          type="checkbox"
          disabled={disabled}
          required={required}
          onChange={(e) => {
            onChange(e.target.checked);
          }}
        />
        <span dangerouslySetInnerHTML={{ __html: utils.cleanText(label) }} />
      </label>
    </div>
  );
}
