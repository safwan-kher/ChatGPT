import { FC } from "react";

type StartStepsBenefitsProps = {
  heading: string;
  benefits: [{ icon: any; benefit: string }];
};

export const StartStepsBenefits: FC<StartStepsBenefitsProps> = ({
  heading,
  benefits,
}) => {
  return (
    <section className="my-24 max-w-6xl mx-auto px-4 w-full">
      <h2 className="text-3xl lg:text-5xl font-bold">{heading}</h2>
      <ul className="grid sm:grid-cols-2 gap-x-32 items-stretch mt-12 py-6">
        {benefits.map(({ benefit, icon }, index, items) => (
          <li className="list-none flex items-stretch relative" key={index}>
            <div
              className={`w-[75px] sm:w-[91px] h-6 rounded-t-3xl bg-indigo-100 -top-6 absolute ${
                [0, 1].includes(index) ? "block" : "hidden"
              }`}
            ></div>
            <div className="bg-indigo-100 px-4 sm:px-6 py-8 flex-shrink-0 flex items-center">
              <img src={icon.sizes.thumbnail} />
            </div>
            <div className="py-4 flex items-center">
              <p className="sm:text-xl ml-4">{benefit}</p>
            </div>
            <div
              className={`w-[75px] sm:w-[91px] h-6 rounded-b-3xl bg-indigo-100 -bottom-6 absolute ${
                [items.length - 1, items.length - 2].includes(index)
                  ? "block"
                  : "hidden"
              }`}
            ></div>
          </li>
        ))}
      </ul>
    </section>
  );
};
