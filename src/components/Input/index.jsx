import React, { useState } from "react";

// Styles
// import styles from './Input.module.scss';

export default function Input(props) {
  const {
    label,
    id,
    required,
    multiline,
    type,
    onChange,
    onEnter,
    disabled,
    minNum,
    maxNum,
  } = props;

  const [hasError, setHasError] = useState(false);

  const validateNumber = (str) => {
    const num = Number(str);
    if (minNum !== undefined && num < minNum) {
      return false;
    } else if (maxNum !== undefined && num > maxNum) {
      return false;
    } else {
      return true;
    }
  };
  const validateEmail = (email) => {
    // eslint-disable-next-line
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const validateInput = (val, validate = false) => {
    let isValid = true;
    if (required && val.trim() === "") {
      isValid = false;
    } else if (type === "email" && !validateEmail(val)) {
      isValid = false;
    } else if (type === "number" && !validateNumber(val)) {
      isValid = false;
    }
    if (validate || hasError) {
      setHasError(!isValid);
    }
    onChange(val, isValid, validate);
  };

  return (
    <div className="input-only">
      <label className={`label ${hasError ? "error" : ""}`}>
        <span>{label}</span>
        <span>{required ? "*" : ""}</span>
        {multiline ? (
          <textarea
            className={"textarea"}
            required={required}
            disabled={disabled}
            id={id || undefined}
            onChange={(e) => {
              validateInput(e.target.value);
            }}
            onBlur={(e) => {
              validateInput(e.target.value, true);
            }}
          />
        ) : (
          <input
            className={"input"}
            type={type || "text"}
            required={required}
            disabled={disabled}
            id={id || undefined}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                onEnter();
              }
            }}
            onChange={(e) => {
              validateInput(e.target.value);
            }}
            onBlur={(e) => {
              validateInput(e.target.value, true);
            }}
          />
        )}
      </label>
    </div>
  );
}
