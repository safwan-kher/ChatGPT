import React from 'react';

// Styles


export default function Loading(props) {
  return (
    <div className={`loading${props.errorMessage ? ' loading--error' : ''}`}>
      <div className="loading__dots">
        <div className="loading__dot"></div>
        <div className="loading__dot"></div>
        <div className="loading__dot"></div>
      </div>
      <div className="loading__error">{props.errorMessage}</div>
    </div>
  );
}
