import { FC, MutableRefObject } from "react";

type B2BHeaderProps = {
  headingStart: string;
  headingEnd: string;
  content: string;
  button_1: string;
  button_2: string;
  image: any;
  refx: MutableRefObject<HTMLDivElement | null>;
  openForm: () => void;
};

export const B2BHeader: FC<B2BHeaderProps> = ({
  headingStart,
  headingEnd,
  content,
  button_1,
  button_2,
  image,
  refx,
  openForm,
}) => {
  const scrollToRef = () => {
    refx.current?.scrollIntoView?.({ behavior: "smooth" });
  };

  return (
    <div className="max-w-xl md:max-w-7xl px-4 mx-auto pt-64 md:pt-[291px] md:pb-16 grid md:grid-cols-2 grid-r gap-16 md:gap-32">
      <div>
        <h1 className="font-[700] text-[40px] leading-10">
          <span>{headingStart}</span>
          <br />
          <span className="text-indigo-700">{headingEnd}</span>
        </h1>
        <div
          className="text-3xl mt-10"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-3 pt-10">
          <button
            onClick={openForm}
            className={`bg-indigo-700 text-white rounded font-[700] text-center uppercase px-5 pt-[9px] pb-[7px] text-lg tracking-widest`}
          >
            {button_1}
          </button>
          <button
            onClick={scrollToRef}
            className={`bg-indigo-300 text-indigo-700 border border-indigo-700 rounded font-[700] text-center uppercase px-5 pt-[9px] pb-[7px] text-lg tracking-widest`}
          >
            {button_2}
          </button>
        </div>
      </div>
      <div className="relative row-start-1 md:row-start-auto">
        <svg
          viewBox="0 0 431 271"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.35973 8.68177C1.26046 6.69422 2.83615 5.02393 4.8261 5.00729L426.783 1.47847C428.859 1.46112 430.493 3.24286 430.297 5.30881L405.49 266.867C405.305 268.826 403.541 270.247 401.587 270.011L14.9949 223.379C13.3026 223.174 12.0034 221.781 11.9184 220.078L1.35973 8.68177Z"
            stroke="#481BFF"
          />
        </svg>

        <img
          style={{ clipPath: "url(#background-mask-mirror)" }}
          className="absolute inset-0 translate-x-2"
          src={image.sizes.large}
          alt=""
        />
      </div>
    </div>
  );
};
