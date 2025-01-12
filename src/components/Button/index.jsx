import React from "react";

// Styles
// import styles from './Button.module.scss';
import Link from "next/link";

export default function Button(props) {
  const { label, disabled, busy, variant, onClick, link } = props;

  let className = "button";
  if (variant) {
    const variantBits = variant.split(" ");
    variantBits.forEach((item) => {
      className += ` ${`button--${item}`}`;
    });
  }
  if (disabled) {
    className += ` ${"button--disabled"}`;
  }
  if (busy) {
    className += ` ${"button--busy"}`;
  }
  if (link && onClick) {
    return (
      (<Link
        href={link}
        onClick={() => {
          if (!disabled && !busy) {
            onClick();
          }
        }}
        className={className}>

        {label}

      </Link>)
    );
  } else if (link) {
    const isInternalLink =
      link.substr(0, 7) !== "http://" && link.substr(0, 8) !== "https://";
    if (disabled || busy) {
      return <div className={className}>{label}</div>;
    } else if (isInternalLink) {
      return (
        <Link href={link} className={className}>
          {label}
        </Link>
      );
    } else {
      return (
        <a
          className={className}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      );
    }
  } else if (onClick) {
    return (
      <button
        disabled={disabled}
        className={className}
        onClick={() => {
          if (!disabled && !busy) {
            onClick();
          }
        }}
      >
        {label}
      </button>
    );
  }
  return null;
}
