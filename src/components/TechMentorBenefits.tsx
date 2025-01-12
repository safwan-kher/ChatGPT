import { FC } from "react";

export const TechMentorBenefits: FC<{ tech_mentor_benefits: any }> = ({
  tech_mentor_benefits,
}) => {
  return (
    <div className="max-w-2xl lg:max-w-7xl mx-auto w-full px-4 py-32">
      <div className="lg:grid grid-cols-2 gap-16">
        <div>
          <h2 className="font-bold-x text-3xl lg:text-4xl">
            {tech_mentor_benefits.title}
          </h2>
          <div className="space-y-2 mt-7">
            {tech_mentor_benefits.content.map(({ text }) => (
              <div className="flex">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 flex-shrink-0 mt-2 mr-3"
                >
                  <circle cx="9" cy="9" r="9" fill="#43E1BC" />
                  <path
                    d="M4.90918 9.00002L8.18191 11.8637L12.6819 5.72729"
                    stroke="white"
                    stroke-width="2"
                  />
                </svg>

                <div
                  className="text-xl lg:text-2xl"
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block">
          <img
            className="aspect-[3/2] w-full h-auto object-cover rounded-md"
            src={tech_mentor_benefits.image.sizes.large}
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-4 gap-14 mt-20">
        {tech_mentor_benefits.benefits.map((benefit) => (
          <div className="flex flex-col items-center lg:items-start">
            <div className="bg-[#EDE8FF] w-[75px] h-[75px] rounded flex items-center justify-center">
              <img src={benefit.icon.sizes.thumbnail} />
            </div>
            <p className="mt-10 font-bold-x text-xl lg:text-2xl">
              {benefit.benefit}
            </p>
            <div
              className="text-lg lg:text-xl mt-3 text-center lg:text-left"
              dangerouslySetInnerHTML={{ __html: benefit.content }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
