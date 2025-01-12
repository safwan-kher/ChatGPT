import { FC, useState } from "react";
import { Style } from "./style";

export const EducateTalentAcceleratorFAQ: FC<{
  talent_accelerator_faq_title: string;
  talent_accelerator_faq_faqs: { question: string; answer: string }[];
  style: Style;
}> = ({ talent_accelerator_faq_title, talent_accelerator_faq_faqs, style }) => {
  const [opens, setOpens] = useState<number[]>([]);
  return (
    <section
      className={`${style.fontText} max-w-2xl lg:max-w-6xl mx-auto px-4 my-16`}
    >
      <h2
        className={`${style.fontTitle1} ${
          style.style === "servicenow" ? "text-black" : style.mainColor
        } text-[50px]`}
      >
        {talent_accelerator_faq_title}
      </h2>
      <div>
        {talent_accelerator_faq_faqs.map(({ question, answer }, index) => (
          <div className={`border-b border-educateAccent2`} key={index}>
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
              <p className={`text-lg px-0 py-6 lg:p-6 ${style.fontTitle1}`}>
                {question}
              </p>
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`text-educateAccent2 ${
                  opens.includes(index) ? "rotate-180" : ""
                } flex-shrink-0 ml-2`}
              >
                <path
                  d="M9.86602 14.5C9.48112 15.1667 8.51887 15.1667 8.13397 14.5L1.20577 2.5C0.820868 1.83333 1.30199 1 2.07179 1L15.9282 0.999999C16.698 0.999998 17.1791 1.83333 16.7942 2.5L9.86602 14.5Z"
                  className="stroke-current"
                  stroke-width="2"
                />
              </svg>
            </div>
            <div
              className={`${
                opens.includes(index) ? "" : "hidden"
              } px-0 pb-6 lg:px-6 text-lg rich-text space-y-2`}
              dangerouslySetInnerHTML={{ __html: answer }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
};
