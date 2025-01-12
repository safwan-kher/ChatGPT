import { FC, useState } from "react";

export const TelInput: FC<{
  label;
  id;
  required;
  onChange;
  disabled;
}> = ({ label, id, required, onChange, disabled }) => {
  const [hasError, setHasError] = useState(false);

  const validateInput = (val, validate = false) => {
    let isValid = true;
    if (required && val.trim().length < 3) {
      isValid = false;
    }

    if (validate || hasError) {
      setHasError(!isValid);
    }

    onChange(val, isValid, validate);
  };

  return (
    <div className="tel-input">
      <label className={`label ${hasError ? "error" : ""}`}>
        {label}
        {required ? "*" : ""}
        <div className={"input flex items-center"}>
          <div className="tel-icon flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6"
              viewBox="0 0 5 3"
            >
              <rect width="5" height="3" y="0" x="0" fill="#000" />
              <rect width="5" height="2" y="1" x="0" fill="#D00" />
              <rect width="5" height="1" y="2" x="0" fill="#FFCE00" />
            </svg>
            &nbsp;&nbsp;+49
          </div>
          <input
            className="tel-input-field flex-1"
            type={"tel"}
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
        </div>
      </label>
    </div>
  );
};
