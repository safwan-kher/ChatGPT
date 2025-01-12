import { FC, RefObject, useEffect, useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { UrlObject } from "url";

export const NewMultiSelectDropdown: FC<{
  label: string;
  options: { value: string; label: string }[];
  queryStringKey: string;
  selectedOptions: string[];
  leftHalfContainerRef: RefObject<HTMLDivElement>;
}> = ({
  label,
  options,
  queryStringKey,
  selectedOptions,
  leftHalfContainerRef,
}) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOnLeftSide, setIsOnLeftSide] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const intersectionObserverCallback = (
    events: IntersectionObserverEntry[]
  ) => {
    const [event] = events;
    if (event.isIntersecting) {
      setIsOnLeftSide(true);
    } else {
      setIsOnLeftSide(false);
    }
  };

  const handleDocumentClick = (event) => {
    if (ref.current && (ref.current as any).contains(event.target)) {
      return undefined;
    } else {
      setIsOpen(false);
      document.onmousedown = null;
    }
  };

  const toggleDropdown = () => {
    setIsOpen((cur) => {
      if (cur) {
        document.onmousedown = null;
      } else {
        document.onmousedown = handleDocumentClick;
      }
      return !cur;
    });
  };

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    if (leftHalfContainerRef.current) {
      observer = new IntersectionObserver(intersectionObserverCallback, {
        root: leftHalfContainerRef.current,
        rootMargin: "0px",
        threshold: 0.5,
      });
    }
    if (ref.current && observer) {
      observer.observe(ref.current);
    }
    return () => {
      if (observer) observer.disconnect();
    };
  }, [leftHalfContainerRef.current, ref.current]);

  const select = (value: string): void => {
    toggleDropdown();
    const newUrl: UrlObject = {
      query: {
        ...router.query,
        [queryStringKey]: selectedOptions.includes(value)
          ? selectedOptions.filter((selected) => selected !== value)
          : selectedOptions.concat(value),
      },
    };
    router.push(newUrl, undefined, { shallow: true });
  };

  return (
    <div ref={ref} className="relative whitespace-nowrap">
      <button
        onClick={toggleDropdown}
        className={`text-lg px-3 py-3 sm:px-2 sm:py-1 border  border-indigo-700  ${
          isOpen ? "bg-indigo-700 text-white" : "bg-white"
        } rounded-lg flex items-center justify-between w-full sm:w-full min-w-[136px]`}
      >
        {label}
        <svg
          width="14"
          height="12"
          viewBox="0 0 14 12"
          className="ml-2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 11.1016L0.937822 0.601562L13.0622 0.601563L7 11.1016Z"
            fill="#EDE7FF"
          />
        </svg>
      </button>
      {isOpen && (
        <ul
          className={`absolute z-10 shadow-lg bg-white rounded-md w-full min-w-full sm:w-max ${
            isOnLeftSide ? "sm:left-0" : "sm:right-0"
          }`}
        >
          {options.map((option) => {
            const isSelected = selectedOptions.includes(option.value);

            return (
              <li
                className={`list-none p-2 pr-3 flex items-center text-lg cursor-pointer ui-active:bg-indigo-100`}
                onClick={() => select(option.value)}
              >
                <div
                  className={`h-6 w-6 border border-indigo-700/50  ${
                    isSelected ? "border-indigo-700 bg-indigo-700" : ""
                  } rounded mr-2 flex flex-shrink-0 items-center justify-center`}
                >
                  <svg
                    width="15"
                    height="12"
                    viewBox="0 0 15 12"
                    fill="none"
                    className={`${isSelected ? "block" : "hidden"}`}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 5.68084C0.0624948 5.3833 0.162087 5.10865 0.372971 4.89789C0.86922 4.40517 1.53526 4.44046 2.03122 4.99326C3.06272 6.13955 4.09298 7.28743 5.12201 8.4369C5.16592 8.4939 5.20661 8.55388 5.24386 8.6165C5.30492 8.53067 5.33631 8.47663 5.37627 8.43213C7.76572 5.76847 10.1549 3.10587 12.5438 0.444332C12.9002 0.0469767 13.3125 -0.100522 13.8022 0.0698644C14.531 0.324172 14.823 1.39703 14.3444 2.05887C14.2882 2.13735 14.2283 2.21248 14.1649 2.28393C11.4901 5.26378 8.81538 8.24373 6.14076 11.2238C5.78148 11.6246 5.36428 11.796 4.87431 11.603C4.69283 11.5268 4.52803 11.4084 4.3909 11.2556C3.04969 9.77424 1.71647 8.28272 0.379249 6.79661C0.177497 6.57219 0.0602119 6.30358 0 5.99809V5.68084Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <p className="whitespace-normal">{option.label}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
