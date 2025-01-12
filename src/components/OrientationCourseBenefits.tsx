import { FC } from "react";

type OrientationCourseBenefitsProps = {
  title: string;
  benefits: {
    name: string;
    image: any;
  }[];
};

export const OrientationCourseBenefits: FC<OrientationCourseBenefitsProps> = ({
  title,
  benefits,
}) => {
  return (
    <div className="bg-gray-100 py-20 lg:py-32">
      <div className="max-w-xl lg:max-w-7xl mx-auto px-4 lg:px-8">
        <h2 className="text-center mx-auto max-w-3xl text-3xl lg:text-4xl font-[700]">
          {title}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6 mt-6 lg:mt-24">
          {benefits.map((benefit) => (
            <div className="shadow-md rounded-[4px] p-4 lg:p-6 bg-white flex flex-col justify-between">
              <img
                className="w-6 lg:w-10 h-6 lg:h-10"
                src={benefit.image.sizes.thumbnail}
              />
              <p className="text-base lg:text-2xl mt-4 lg:mt-16">
                {benefit.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
