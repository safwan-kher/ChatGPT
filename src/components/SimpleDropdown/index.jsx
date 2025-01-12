import React, { useEffect, useState } from 'react';

// Styles


export default function SimpleDropdown(props) {
  const {
    placeholder,
    items,
    current,
    onChange,
  } = props;
  const currentItem = current.value ? current : { label: placeholder, value: '' };
  const [forceClose, setForceClose] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener('resize', onResize);
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return (
    <div className="simple-dropdown">
      {isMobile ? (
        <select onChange={(e) => {
          const found = items.find((item) => item.value === e.target.value);
          if (found) {
            onChange(found);
          }
        }}>
          {items.filter((item) => item.value).map((item, index) => (
            <option
              key={index}
              value={item.value}
            >{item.label}</option>
          ))}
        </select>
      ) : (
          <div className="simple-dropdown__current">
            {currentItem.label}
            <div className={`simple-dropdown__list${forceClose ? ' simple-dropdown__list--closed' : ''}`}>
              {currentItem.label !== placeholder && (<div className="simple-dropdown__list__heading">{placeholder}</div>)}
              {items.filter((item) => item.value).map((item, index) => (
                <div
                  key={index}
                  className={`simple-dropdown__list__item${item === currentItem ? ' simple-dropdown__list__item--active' : ''}`}
                  onClick={() => {
                    onChange(item);
                    setForceClose(true);
                    setTimeout(() => {
                      setForceClose(false);
                    }, 50);
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}
