import { FC, useState } from "react";

type OrientationCourseFAQProps = {
  talent_accelerator_faq_title: string;
  talent_accelerator_faq_faqs: {
    question: string;
    answer: any;
  }[];
};

export const OrientationCourseFAQ: FC<OrientationCourseFAQProps> = ({
  talent_accelerator_faq_title,
  talent_accelerator_faq_faqs,
}) => {
  const [opens, setOpens] = useState<number[]>([]);
  return (
    <div className="py-20 lg:py-32">
      <div className="max-w-xl lg:max-w-3xl mx-auto px-4 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-[700]">
          {talent_accelerator_faq_title}
        </h2>
        <div className="mt-2 lg:mt-8">
          {talent_accelerator_faq_faqs.map(({ question, answer }, index) => (
            <div className={`border-b border-gray-200`} key={index}>
              <div
                onClick={() =>
                  setOpens((cur) =>
                    cur.includes(index)
                      ? cur.filter((n) => n !== index)
                      : cur.concat(index)
                  )
                }
                className="flex items-center justify-between cursor-pointer"
              >
                <p className={`text-lg lg:text-2xl font-bold-x py-6`}>
                  {question}
                </p>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${
                    opens.includes(index) ? "rotate-180" : ""
                  } flex-shrink-0 ml-2`}
                >
                  <path
                    d="M16.0002 19.9335C15.8225 19.9335 15.6558 19.9058 15.5002 19.8502C15.3447 19.7946 15.2002 19.7002 15.0669 19.5669L8.93356 13.4335C8.68912 13.1891 8.56689 12.878 8.56689 12.5002C8.56689 12.1224 8.68912 11.8113 8.93356 11.5669C9.17801 11.3224 9.48912 11.2002 9.86689 11.2002C10.2447 11.2002 10.5558 11.3224 10.8002 11.5669L16.0002 16.7669L21.2002 11.5669C21.4447 11.3224 21.7558 11.2002 22.1336 11.2002C22.5113 11.2002 22.8225 11.3224 23.0669 11.5669C23.3113 11.8113 23.4336 12.1224 23.4336 12.5002C23.4336 12.878 23.3113 13.1891 23.0669 13.4335L16.9336 19.5669C16.8002 19.7002 16.6558 19.7946 16.5002 19.8502C16.3447 19.9058 16.178 19.9335 16.0002 19.9335Z"
                    fill="#282828"
                  />
                </svg>
              </div>
              <div
                className={`${
                  opens.includes(index) ? "" : "hidden"
                } pb-6 text-lg lg:text-xl text-gray-500 space-y-2`}
                dangerouslySetInnerHTML={{ __html: answer }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
