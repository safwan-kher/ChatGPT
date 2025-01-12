import { FC } from "react";
import utils from "utils";

type ThreeStepsProps = {
  heading: string;
  content: any;
  logo: any;
  three_steps: [{ step_label: string; step_description: string }];
  alt?: boolean;
};

export const ThreeSteps: FC<ThreeStepsProps> = ({
  heading,
  content,
  logo,
  three_steps,
  alt = false,
}) => {
  return (
    <div className="mt-24 relative">
      <div className="absolute bg-gray-100 w-full md:w-1/2 right-0 inset-y-0"></div>
      <div className="md:max-w-7xl mx-auto md:px-4 relative md:py-20">
        <div className="w-1/2 inset-y-0 left-0 absolute">
          <div className="relative w-full h-full">
            <div className="absolute bg-gray-100 w-1/2 right-0 inset-y-0"></div>
          </div>
        </div>
        <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-8 relative">
          <div
            className={`${
              alt ? "bg-white" : "bg-purple-700"
            } md:rounded-3xl px-8 md:px-16 py-9 shadow-lg`}
          >
            <div className="max-w-xl mx-auto">
              <h2
                className={`${
                  alt ? "text-black" : "text-white"
                } text-3xl md:text-5xl font-[700]`}
              >
                {heading}
              </h2>
              <div
                className={`${
                  alt ? "text-black" : "text-white"
                } text-lg md:text-xl mt-4`}
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              ></div>
              <div className="flex justify-center mt-8">
                <img src={logo.sizes.medium} className="h-28" alt="" />
              </div>
            </div>
          </div>
          <div className="">
            <div className="timeline max-w-xl mx-auto px-4 md:px-0 md:max-w-none">
              <div className="timeline__items">
                {three_steps.map((item, index) => (
                  <div className="timeline__item" key={index}>
                    <div className="timeline__item__title">
                      {item.step_label}
                    </div>
                    <div
                      className="timeline__item__text"
                      dangerouslySetInnerHTML={{
                        __html: item.step_description,
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
