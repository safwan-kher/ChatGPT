import { FC, useState } from "react";

interface BigQuestionsProps {
  heading: string;
  questions: [{ question: string; answer: string; icon: string }];
}

export const BigQuestions: FC<BigQuestionsProps> = ({ heading, questions }) => {
  const [selected, setSelected] = useState(1);

  return (
    <section
      style={{ backgroundImage: 'url("/assets/dots-2.svg")' }}
      className="mt-16 mb-16 bg-no-repeat bg-top-left"
    >
      <h2 className="text-4xl lg:text-6xl font-bold text-center">{heading}</h2>
      <div className="lg:bg-indigo-200">
        <div className="max-w-6xl mx-auto lg:px-4 w-full">
          <ul className="flex flex-col lg:flex-row w-full mt-24 lg:mt-32 space-y-16 lg:space-y-0">
            {questions.map(({ question, answer, icon }, index) => (
              <li
                onClick={() => setSelected(index)}
                className={`list-none cursor-pointer px-4 relative flex-1 bg-indigo-200`}
                key={index}
              >
                <div
                  className={`py-10 h-full relative ${
                    selected === index ? "bg-indigo-700" : ""
                  }`}
                >
                  {selected === index && (
                    <div className="bg-indigo-700 h-10 rounded-t-2xl absolute -top-10 w-full"></div>
                  )}
                  {selected === index && (
                    <div className="w-full flex justify-center absolute -top-20">
                      <img src={icon} className="" />
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
                    <p
                      className={`text-base lg:text-xl text-center pt-6 ${
                        selected === index ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {answer}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
