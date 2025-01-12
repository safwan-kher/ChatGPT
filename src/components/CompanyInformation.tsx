import { FC } from "react";
import Button from "./Button";

interface CompanyInformationProps {
  title: string;
  contactInformation: any;
  companyInformation: any;
}

export const CompanyInformation: FC<CompanyInformationProps> = ({
  title,
  contactInformation,
  companyInformation,
}) => {
  return (
    <section className="mt-24 py-16 bg-indigo-200 full-width-outer relative">
      <div className="absolute inset-0 w-full h-full overflow-x-hidden pointer-events-none">
        <div className="relative w-full h-full max-w-6xl mx-auto">
          <img
            src="/assets/floaters/cube.png"
            className="absolute top-40 lg:-top-6 -right-4"
            alt=""
          />
          <img
            src="/assets/floaters/stairs-white3.png"
            className="absolute -bottom-20 z-50 left-8  block lg:hidden"
            alt=""
          />
        </div>
      </div>
      <div className="max-w-6xl px-6 mx-auto w-full">
        <h2 className="text-4xl lg:text-5xl font-bold">{title}</h2>
        <div
          className="flex lg:justify-between mt-8 lg:items-center flex-col lg:flex-row
        "
        >
          <img
            src="/assets/floaters/stairs-white3.png"
            className="hidden lg:block"
            alt=""
          />
          <div
            className="text-xl rich-text"
            dangerouslySetInnerHTML={{ __html: contactInformation }}
          ></div>
          <div
            className="text-xl rich-text mt-6 lg:mt-0"
            dangerouslySetInnerHTML={{ __html: companyInformation }}
          ></div>
        </div>
      </div>
    </section>
  );
};
