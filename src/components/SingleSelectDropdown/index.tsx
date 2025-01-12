import { useRouter } from "next/router";
import React, { useState, useRef } from "react";
import { UrlObject } from "url";

// Styles

const SingleSelectDropdown = ({
  options,
  label,
  queryStringKey,
  defaultOption = "Please Select",
}) => {
  const [open, setOpen] = useState(false);
  const selectorRef = useRef();
  const router = useRouter();

  const renderSelected = () => {
    if (!options.find((option) => !option.checked)) {
      return `All`;
    } else if (!options.find((option) => option.checked)) {
      return defaultOption;
    } else {
      const selected = options
        .filter((option) => option.checked)
        .map((option) => option.label)
        .join(", ");

      if (selected.length > 26) {
        const cut = selected.substring(0, 26);
        return cut.concat("...");
      }

      return selected;
    }
  };

  const handleSelectorClick = () => {
    if (!open) {
      closeOnClickOutside();
    }
    setOpen((cur) => !cur);
  };

  const closeOnClickOutside = () => {
    document.onmousedown = handleDocumentClick;
  };

  const handleDocumentClick = (event) => {
    if (
      selectorRef &&
      selectorRef.current &&
      (selectorRef.current as any).contains(event.target)
    ) {
      return undefined;
    } else {
      setOpen(false);
      document.onmousedown = null;
    }
  };

  const handleCheckboxChange = (value) => {
    const newUrl: UrlObject = {
      query: {
        ...router.query,
        [queryStringKey]: value.toLowerCase(),
      },
    };
    router.push(newUrl, undefined, { shallow: true });
  };

  return (
    <div className="multiselect z-50 relative">
      <div ref={selectorRef} className="selector">
        <div className="container">
          <span className="label">{label}</span>
          <div
            onClick={handleSelectorClick}
            className="flex-between open-selector"
          >
            <div className="selected">{renderSelected()}</div>
            <div className="icon">&#9660;</div>
          </div>
        </div>
        {open && (
          <ul className="options">
            <div className="wrapper">
              {options.map((option) => (
                <li key={option.value} className="option list-none">
                  <label className="flex-center selector-checkbox">
                    <input
                      onChange={() => handleCheckboxChange(option.value)}
                      checked={option.checked}
                      className="radio"
                      type="radio"
                    />
                    <span>{option.label}</span>
                  </label>
                </li>
              ))}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SingleSelectDropdown;
