import { FC, useState } from "react";

export const TechMentorCourseHow: FC<{
  tech_mentor_how: any;
}> = ({ tech_mentor_how }) => {
  const [stepIndex, setStep] = useState(0);

  return (
    <div className=" bg-gray-50 my-16">
      <div className="max-w-2xl lg:max-w-7xl mx-auto w-full px-4 py-16">
        <div className="lg:w-1/2">
          <h2 className="text-center lg:text-left font-bold-x text-3xl lg:text-4xl">
            {tech_mentor_how.title}
          </h2>
          <div className="space-y-2 mt-7">
            {tech_mentor_how.content.map(({ text }) => (
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
        <div className="lg:grid grid-cols-2 mt-8 gap-20">
          <img
            src={tech_mentor_how.steps[stepIndex].image.sizes.medium}
            className="w-full h-auto rounded-md"
            alt=""
          />
          <div className="mt-8 lg:mt-0">
            {tech_mentor_how.steps.map((step, index) => {
              const isActive = index === stepIndex;

              return (
                <div
                  onClick={() => setStep(index)}
                  className={`border-l-4 ${
                    isActive ? "border-indigo-700" : "border-gray-200"
                  } pl-6 lg:pl-20 pb-12 last:pb-0 cursor-pointer`}
                >
                  <p
                    className={`${
                      isActive ? "text-indigo-700" : "text-black"
                    } font-bold-x text-xl lg:text-2xl`}
                  >
                    {step.step_name}
                  </p>
                  <p className="font-bold-x text-xl mt-3">{step.description}</p>
                  <div
                    className="text-xl mt-3"
                    dangerouslySetInnerHTML={{ __html: step.content }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
