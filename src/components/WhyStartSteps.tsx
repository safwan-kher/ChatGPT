import { FC } from "react";

interface WhyStartStepsProps {
  title: string;
  reasons: any[];
}

export const WhyStartSteps: FC<WhyStartStepsProps> = ({ title, reasons }) => {
  return (
    <section className="mt-16 mb-16 max-w-6xl mx-auto px-4 w-full">
      <h2 className="text-4xl lg:text-5xl font-bold">{title}</h2>
      <ul className="mt-32 flex flex-col md:flex-row gap-32 md:gap-8 w-full">
        {reasons.map(({ reason }) => (
          <li className="bg-indigo-700 rounded p-8 md:w-1/3 relative list-none">
            <p className="text-white uppercase text-3xl font-semibold">
              {reason.name}
            </p>
            <div
              className="text-white mt-2 text-lg"
              dangerouslySetInnerHTML={{ __html: reason.description }}
            ></div>
            <img
              className="w-32 h-32 object-contain -top-24 right-0 absolute"
              src={reason.image.sizes.medium}
              alt=""
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
