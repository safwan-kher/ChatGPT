import { FC, useState } from "react";

interface WhatIsStartStepsProps {
  what_is_startsteps_heading: string;
  what_is_startsteps_content: string;
  free_consultation_button_text: string;
  students: {
    name: string;
    location: string;
    picture: any;
    logo_1: any;
    logo_2: any;
    logo_3: any;
    course_1: string;
    label_2: string;
    value_2: string;
    label_3: string;
    value_3: string;
  }[];
  questions: [{ question: string; answer: string; icon: any }];
  formRef: React.MutableRefObject<HTMLFormElement | null>;
  alt?: boolean;
}

export const WhatIsStartSteps: FC<WhatIsStartStepsProps> = ({
  what_is_startsteps_heading,
  what_is_startsteps_content,
  free_consultation_button_text,
  students,
  questions,
  formRef,
  alt = false,
}) => {
  const [selected, setSelected] = useState(1);
  const scrollIntoView = () => {
    formRef.current?.scrollIntoView?.({ behavior: "smooth" });
  };

  return (
    <section className="mt-7 sm:mt-24 mb-16">
      <div className="flex justify-center mb-20">
        <button
          onClick={scrollIntoView}
          className={`${
            alt ? "bg-indigo-700" : "bg-teal-300"
          } text-white rounded font-[700] text-center uppercase px-5 pt-[9px] pb-[7px] text-lg tracking-widest disabled:cursor-wait disabled:animate-pulse`}
        >
          {free_consultation_button_text}
        </button>
      </div>
      <div className="lg:grid grid-cols-2 grid-rows-2 max-w-7xl mx-auto px-4 items-start gap-x-12">
        <div className="row-span-2">
          <h2 className="text-3xl lg:text-5xl font-[700]">
            {what_is_startsteps_heading}
          </h2>
          <div
            className="text-lg lg:text-3xl mt-4"
            dangerouslySetInnerHTML={{ __html: what_is_startsteps_content }}
          ></div>
        </div>
        <div
          className={`hidden lg:block bg-gray-100 pt-3 px-4 pb-2 list-none flex-1 relative rounded-xl`}
        >
          <img
            className="absolute -top-12 right-2"
            src="/assets/floaters/like.png"
            alt=""
          />
          <div className="flex border-b border-gray-400 pb-2">
            <img
              className="rounded-full w-12 h-12"
              src={students[0].picture.sizes.thumbnail}
              alt=""
            />
            <div className="ml-4">
              <p className="uppercase text-xl font-bold leading-tight">
                {students[0].name}
              </p>
              <p className="uppercase text-lg text-gray-600 leading-tight">
                {students[0].location}
              </p>
            </div>
          </div>
          <div className="flex justify-between space-x-4 leading-none text-gray-600 pt-2 text-xs lg:text-sm">
            <div className="flex items-center">
              <img
                src={students[0].logo_1.sizes.thumbnail}
                className="w-8 h-8 mr-1"
                alt=""
              />
              <div className="uppercase font-bold ">
                <p>{students[0].course_1}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img
                src={students[0].logo_2.sizes.thumbnail}
                className="w-8 h-8 mr-1"
                alt=""
              />
              <div className="text-gray-600 ">
                <p className="uppercase font-bold">{students[0].label_2}</p>
                <p className="uppercase">{students[0].value_2}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img
                src={students[0].logo_3.sizes.thumbnail}
                className="w-8 h-8 mr-1"
                alt=""
              />
              <div className="text-gray-600 ">
                <p className="uppercase font-bold">{students[0].label_3}</p>
                <p className="uppercase">{students[0].value_3}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`hidden lg:block bg-gray-100 px-2 py-4 lg:p-6 lg:pb-2 list-none flex-1 relative rounded-xl col-start-2 col-end-3 row-start-2 -translate-x-8`}
        >
          <div className="flex border-b border-gray-400 pb-2">
            <img
              className="rounded-full w-12 h-12"
              src={students[1].picture.sizes.thumbnail}
              alt=""
            />
            <div className="ml-4">
              <p className="uppercase text-xl font-bold leading-tight">
                {students[1].name}
              </p>
              <p className="uppercase text-lg text-gray-600 leading-tight">
                {students[1].location}
              </p>
            </div>
          </div>
          <div className="flex justify-between space-x-4 leading-none text-gray-600 pt-2 text-xs lg:text-sm">
            <div className="flex items-center">
              <img
                src={students[1].logo_1.sizes.thumbnail}
                className="w-8 h-8 mr-1"
                alt=""
              />
              <div className="uppercase font-bold ">
                <p>{students[1].course_1}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img
                src={students[1].logo_2.sizes.thumbnail}
                className="w-8 h-8 mr-1"
                alt=""
              />
              <div className="text-gray-600 ">
                <p className="uppercase font-bold">{students[1].label_2}</p>
                <p className="uppercase">{students[1].value_2}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img
                src={students[1].logo_3.sizes.thumbnail}
                className="w-8 h-8 mr-1"
                alt=""
              />
              <div className="text-gray-600 ">
                <p className="uppercase font-bold">{students[1].label_3}</p>
                <p className="uppercase">{students[1].value_3}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${alt ? "lg:bg-white" : "lg:bg-gray-100"} lg:shadow-lg`}>
        <div className="max-w-6xl mx-auto lg:px-4 w-full">
          <ul className="flex flex-col lg:flex-row w-full mt-24 lg:mt-32 space-y-16 lg:space-y-0 ">
            {questions.map(({ question, answer, icon }, index) => (
              <li
                onClick={() => setSelected(index)}
                className={`list-none cursor-pointer px-4 relative flex-1 ${
                  alt ? "bg-white shadow-lg lg:shadow-none" : "bg-gray-100"
                }`}
                key={index}
              >
                <div
                  className={`py-10 h-full relative ${
                    selected === index
                      ? `${alt ? "bg-indigo-700" : "bg-purple-700"}`
                      : ""
                  }`}
                >
                  {selected === index && (
                    <div
                      className={`${
                        alt ? "bg-indigo-700" : "bg-purple-700"
                      } h-10 rounded-t-2xl absolute -top-10 w-full`}
                    ></div>
                  )}
                  {selected === index && (
                    <div className="w-full flex justify-center absolute -top-24">
                      <img src={icon.sizes.medium} className="max-h-[142px]" />
                    </div>
                  )}
                  <div className="px-5">
                    <h3
                      className={`text-lg lg:text-2xl font-bold text-center ${
                        selected === index ? "text-white" : "text-black"
                      }`}
                    >
                      {question}
                    </h3>
                    <div
                      className={`text-base lg:text-xl text-center pt-6 ${
                        selected === index ? "text-white" : "text-gray-500"
                      }`}
                      dangerouslySetInnerHTML={{ __html: answer }}
                    ></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-xl mx-auto px-4">
        <div
          className={`lg:hidden mt-24 bg-gray-100 pt-3 px-4 pb-2 list-none flex-1 relative rounded-xl`}
        >
          <img
            className="absolute -top-12 right-2"
            src="/assets/floaters/like.png"
            alt=""
          />
          <div className="flex border-b border-gray-400 pb-2">
            <img
              className="rounded-full w-12 h-12"
              src={students[0].picture.sizes.thumbnail}
              alt=""
            />
            <div className="ml-4">
              <p className="uppercase text-xl font-bold leading-tight">
                {students[0].name}
              </p>
              <p className="uppercase text-lg text-gray-600 leading-tight">
                {students[0].location}
              </p>
            </div>
          </div>
          <div className="flex justify-between space-x-4 leading-none text-gray-600 pt-2 text-xs lg:text-sm">
            <div className="flex items-center">
              <img
                src={students[0].logo_1.sizes.thumbnail}
                className="w-8 h-8 mr-1"
                alt=""
              />
              <div className="uppercase font-bold ">
                <p>{students[0].course_1}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img
                src={students[0].logo_2.sizes.thumbnail}
                className="w-8 h-8 mr-1"
                alt=""
              />
              <div className="text-gray-600 ">
                <p className="uppercase font-bold">{students[0].label_2}</p>
                <p className="uppercase">{students[0].value_2}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img
                src={students[0].logo_3.sizes.thumbnail}
                className="w-8 h-8 mr-1"
                alt=""
              />
              <div className="text-gray-600 ">
                <p className="uppercase font-bold">{students[0].label_3}</p>
                <p className="uppercase">{students[0].value_3}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`lg:hidden mt-8 bg-gray-100 px-2 py-4 lg:p-6 lg:pb-2 list-none flex-1 relative rounded-xl col-start-3 col-end-4 row-start-2 lg:-mt-4`}
        >
          <div className="flex border-b border-gray-400 pb-2">
            <img
              className="rounded-full w-12 h-12"
              src={students[1].picture.sizes.thumbnail}
              alt=""
            />
            <div className="ml-4">
              <p className="uppercase text-xl font-bold leading-tight">
                {students[1].name}
              </p>
              <p className="uppercase text-lg text-gray-600 leading-tight">
                {students[1].location}
              </p>
            </div>
          </div>
          <div className="flex justify-between space-x-4 leading-none text-gray-600 pt-2 text-xs lg:text-sm">
            <div className="flex items-center">
              <img
                src={students[1].logo_1.sizes.thumbnail}
                className="w-8 h-8 mr-1"
                alt=""
              />
              <div className="uppercase font-bold ">
                <p>{students[1].course_1}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img
                src={students[1].logo_2.sizes.thumbnail}
                className="w-8 h-8 mr-1"
                alt=""
              />
              <div className="text-gray-600 ">
                <p className="uppercase font-bold">{students[1].label_2}</p>
                <p className="uppercase">{students[1].value_2}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img
                src={students[1].logo_3.sizes.thumbnail}
                className="w-8 h-8 mr-1"
                alt=""
              />
              <div className="text-gray-600 ">
                <p className="uppercase font-bold">{students[1].label_3}</p>
                <p className="uppercase">{students[1].value_3}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
