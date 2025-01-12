import React, { useState, useRef } from "react";
import { UrlObject } from "url";
import { useRouter } from "next/router";

// Styles

const MultiSelectDropdown = ({
  options,
  label,
  queryStringKey,
  defaultOption = "Please Select",
  allOptions = "All",
}) => {
  const [open, setOpen] = useState(false);
  const selectorRef = useRef();
  const router = useRouter();

  const renderSelected = () => {
    if (!options.find((option) => !option.checked)) {
      return allOptions;
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
    const queryString = router.query[queryStringKey];
    let newQueryString;
    if (typeof queryString === "string") {
      newQueryString =
        queryString === value.toLowerCase()
          ? []
          : [queryString, value.toLowerCase()];
    } else if (Array.isArray(queryString)) {
      newQueryString = queryString.includes(value.toLowerCase())
        ? queryString.filter((x) => x !== value.toLowerCase())
        : queryString.concat(value.toLowerCase());
    } else {
      newQueryString = value.toLowerCase();
    }
    const newUrl: UrlObject = {
      query: { ...router.query, [queryStringKey]: newQueryString },
    };
    router.push(newUrl, undefined, { shallow: true });
  };

  return (
    <div className="multiselect relative z-50">
      <div ref={selectorRef} className=" selector">
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
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.value)}
                      className="checkbox"
                      type="checkbox"
                    />
                    <span className="option-text">{option.label}</span>
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

export default MultiSelectDropdown;
