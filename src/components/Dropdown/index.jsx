import React, { useEffect, useState } from "react";

// Styles
// import styles from './Dropdown.module.scss';

export default function Dropdown(props) {
  const { label, required, items, onChange, disabled, value, language } = props;

  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    if (value) {
      onChange(value, true);
    }
    // eslint-disable-next-line
  }, []);
  const validateDropdown = (val, validate = false) => {
    let isValid = true;
    if (required && val.trim() === "") {
      isValid = false;
    }
    if (validate || hasError) {
      setHasError(!isValid);
    }
    onChange(val, isValid);
  };

  const options = [<option key={9999}></option>];
  if (items) {
    items.forEach((item, index) => {
      options.push(<option key={index}>{item}</option>);
    });
  }

  const i18n = {
    jobcenterTooltip: {
      en: "You are currently (or will soon be) unemployed & are officially registered in Germany (not with a student visa).",
      de: "Du bist im Moment oder demnächst arbeitslos & offiziell in Deutschland gemeldet (kein Student).",
    },
  };

  return (
    <label className={`label ${hasError ? "error" : ""}`}>
      <div className="jobcenter-dropdown-label">
        {label}
        {required ? "*" : ""}
        <div className="jobcenter-info-icon">
          {language && (
            <>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM12 20.7188C7.18594 20.7188 3.28125 16.8141 3.28125 12C3.28125 7.18594 7.18594 3.28125 12 3.28125C16.8141 3.28125 20.7188 7.18594 20.7188 12C20.7188 16.8141 16.8141 20.7188 12 20.7188Z"
                  fill="white"
                />
                <path
                  d="M14.6153 7.42192C13.9121 6.80552 12.984 6.46802 11.9996 6.46802C11.0153 6.46802 10.0871 6.80786 9.38401 7.42192C8.65276 8.06177 8.24963 8.92192 8.24963 9.84302V10.0211C8.24963 10.1243 8.33401 10.2086 8.43713 10.2086H9.56213C9.66526 10.2086 9.74963 10.1243 9.74963 10.0211V9.84302C9.74963 8.80942 10.7598 7.96802 11.9996 7.96802C13.2395 7.96802 14.2496 8.80942 14.2496 9.84302C14.2496 10.5719 13.734 11.2399 12.9348 11.5469C12.4379 11.7368 12.016 12.0696 11.7137 12.5055C11.4067 12.9508 11.2473 13.4852 11.2473 14.0266V14.5305C11.2473 14.6336 11.3317 14.718 11.4348 14.718H12.5598C12.6629 14.718 12.7473 14.6336 12.7473 14.5305V13.9985C12.7485 13.771 12.8183 13.5491 12.9474 13.3618C13.0766 13.1745 13.2593 13.0305 13.4715 12.9485C14.8543 12.4165 15.7473 11.1977 15.7473 9.84302C15.7496 8.92192 15.3465 8.06177 14.6153 7.42192ZM11.0621 17.1555C11.0621 17.4042 11.1609 17.6426 11.3367 17.8184C11.5125 17.9942 11.751 18.093 11.9996 18.093C12.2483 18.093 12.4867 17.9942 12.6625 17.8184C12.8384 17.6426 12.9371 17.4042 12.9371 17.1555C12.9371 16.9069 12.8384 16.6684 12.6625 16.4926C12.4867 16.3168 12.2483 16.218 11.9996 16.218C11.751 16.218 11.5125 16.3168 11.3367 16.4926C11.1609 16.6684 11.0621 16.9069 11.0621 17.1555Z"
                  fill="white"
                />
              </svg>
              <div className="jobcenter-tooltip">
                <p>{i18n.jobcenterTooltip[language]}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <select
        className={"dropdown"}
        disabled={disabled}
        required={required}
        onChange={(e) => {
          validateDropdown(e.target.value, required);
        }}
        onBlur={(e) => {
          validateDropdown(e.target.value, true);
        }}
        value={value}
      >
        {options}
      </select>
    </label>
  );
}
