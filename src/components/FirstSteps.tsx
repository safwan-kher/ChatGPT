import { FC } from "react";
import Link from "next/link";

type FirstStepsProps = {
  title: string;
  subtitle: string;
  steps: {
    image: any;
    step_name: string;
    description: any;
  }[];
  consultingButton: string;
};

export const FirstSteps: FC<FirstStepsProps> = ({
  title,
  subtitle,
  steps,
  consultingButton,
}) => {
  return (
    <div className="py-20 lg:py-32">
      <div className="max-w-xl lg:max-w-7xl mx-auto px-4 lg:px-8">
        <h2 className="text-center mx-auto max-w-3xl text-3xl lg:text-4xl font-[700]">
          {title}
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: subtitle }}
          className="text-center mx-auto max-w-3xl text-xl mt-4 lg:text-2xl"
        ></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-32 mt-16 border-l-4 pl-8 lg:pl-0 lg:border-l-0 lg:border-b-4 border-gray-300 lg:pb-8 relative">
          {steps.map((step) => (
            <div className="">
              <img
                className="h-auto w-32 lg:w-52 object-contain"
                src={step.image.sizes.medium}
                width={step.image.sizes["medium-width"]}
                height={step.image.sizes["medium-height"]}
              />
              <div className="block lg:hidden mt-3">
                <p className="text-xl font-bold-x">{step.step_name}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: step.description }}
                  className="mt-3"
                ></div>
              </div>
            </div>
          ))}
          <svg
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-300 fill-current absolute -bottom-5 -left-[12px] lg:left-auto rotate-90 lg:rotate-0 lg:-bottom-[14px] lg:-right-5 w-5"
          >
            <path d="M0 0.452881L20 11.9999L0 23.5469V0.452881Z" />
          </svg>
        </div>
        <div className="hidden lg:grid grid-cols-3 gap-32 pt-8">
          {steps.map((step) => (
            <div className="">
              <p className="text-2xl font-bold-x">{step.step_name}</p>
              <div
                dangerouslySetInnerHTML={{ __html: step.description }}
                className="text-xl mt-3 space-y-2"
              ></div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-16">
          <button
            className="block mt-7 bg-indigo-700 uppercase px-6 py-[11px] rounded-[4px] text-white font-[700] tracking-wider text-center"
            onClick={() =>
              (window as any)?.Calendly?.initPopupWidget({
                url: "https://calendly.com/d/crr-xxj-qhs/let-s-chat-startsteps",
              })
            }
          >
            {consultingButton}
          </button>
        </div>
      </div>
    </div>
  );
};
