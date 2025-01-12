import { FC, CSSProperties } from "react";

export const OrientationCourseHeader: FC<{
  orientation_compass_course_header: any;
  altCards?: boolean;
}> = ({ orientation_compass_course_header, altCards }) => {
  return (
    <div className="max-w-2xl lg:max-w-7xl mx-auto w-full px-4 lg:pr-8 py-16 pb-24 lg:py-32">
      <div className="compass-header lg:compass-header-lg">
        <div className="lg:hidden order-1">
          <h1 className="text-3xl font-[700] text-center">
            {orientation_compass_course_header.title}
          </h1>
        </div>
        <div className="order-3 lg:order-1">
          <h1 className="hidden lg:block text-5xl font-[700]">
            {orientation_compass_course_header.title}
          </h1>
          <p className="text-xl lg:text-3xl mt-4">
            {orientation_compass_course_header.subtitle}
          </p>
          <div className="flex mt-14 gap-2 justify-center lg:justify-start flex-wrap">
            <div className="border-2 border-gray-200 rounded-md p-2 h-20">
              <img
                className="h-full w-auto"
                src={orientation_compass_course_header.logo_1.sizes.thumbnail}
              />
            </div>
            <div className="border-2 border-gray-200 rounded-md p-2 h-20">
              <img
                className="h-full w-auto"
                src={orientation_compass_course_header.logo_2.sizes.medium}
                width={
                  orientation_compass_course_header.logo_2.sizes["medium-width"]
                }
                height={
                  orientation_compass_course_header.logo_2.sizes[
                    "medium-height"
                  ]
                }
              />
            </div>
            <div className="border-2 border-gray-200 rounded-md p-2 py-4 h-20 flex items-center">
              <img className="h-full w-auto" src="/assets/google.png" />
              <div className="ml-2">
                <svg
                  width="87"
                  height="15"
                  viewBox="0 0 87 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.01422 0L10.1317 4.4376L15.0065 5.08018L11.4404 8.46536L12.3357 13.3001L8.01422 10.9546L3.69276 13.3001L4.58801 8.46536L1.02195 5.08018L5.8967 4.4376L8.01422 0Z"
                    fill="#FFD911"
                  />
                  <path
                    d="M25.7183 0L27.8358 4.4376L32.7106 5.08018L29.1445 8.46536L30.0398 13.3001L25.7183 10.9546L21.3969 13.3001L22.2921 8.46536L18.726 5.08018L23.6008 4.4376L25.7183 0Z"
                    fill="#FFD911"
                  />
                  <path
                    d="M43.4224 0L45.5399 4.4376L50.4147 5.08018L46.8486 8.46536L47.7439 13.3001L43.4224 10.9546L39.101 13.3001L39.9962 8.46536L36.4302 5.08018L41.3049 4.4376L43.4224 0Z"
                    fill="#FFD911"
                  />
                  <path
                    d="M61.1265 0L63.244 4.4376L68.1188 5.08018L64.5527 8.46536L65.448 13.3001L61.1265 10.9546L56.8051 13.3001L57.7003 8.46536L54.1343 5.08018L59.009 4.4376L61.1265 0Z"
                    fill="#FFD911"
                  />
                  <path
                    d="M78.8306 0L80.9481 4.4376L85.8229 5.08018L82.2568 8.46536L83.1521 13.3001L78.8306 10.9546L74.5092 13.3001L75.4044 8.46536L71.8384 5.08018L76.7131 4.4376L78.8306 0Z"
                    fill="#FFD911"
                  />
                </svg>
                <p className="text-sm">
                  {orientation_compass_course_header.logo_3_text}
                </p>
              </div>
            </div>
            <div className="border-2 border-gray-200 rounded-md p-2 py-4 h-20 flex items-center">
              <p className="text-indigo-700 font-[700] text-4xl">
                {orientation_compass_course_header.logo_4_title}
              </p>
              <p className="ml-2 text-sm">
                {orientation_compass_course_header.logo_4_subtitle}
              </p>
            </div>
          </div>
        </div>
        <div className="order-2 justify-self-center">
          <Card
            question={orientation_compass_course_header.cards[0].comment}
            color={altCards ? "#FFD80D" : "#27DAAF"}
            image={
              orientation_compass_course_header.cards[0].image.sizes.thumbnail
            }
            styles={{
              transform: "rotate(-5deg)",
              zIndex: 3,
              position: "relative",
            }}
            className=""
          />
          <Card
            question={orientation_compass_course_header.cards[1].comment}
            color={altCards ? "#47A7FF" : "#481BFF"}
            image={
              orientation_compass_course_header.cards[1].image.sizes.thumbnail
            }
            styles={{
              transform: "rotate(9deg)",
              position: "relative",
              zIndex: 2,
            }}
            className="ml-[126px] lg:ml-[219px] mt-[-123px] lg:mt-[-215px]"
          />
          <Card
            question={orientation_compass_course_header.cards[2].comment}
            color={altCards ? "#282828" : "#302D2A"}
            image={
              orientation_compass_course_header.cards[2].image.sizes.thumbnail
            }
            styles={{
              transform: "rotate(-3deg)",
              position: "relative",
              zIndex: 1,
            }}
            className="ml-[46px] lg:ml-[81px] mt-[-40px] lg:mt-[-79px]"
          />
        </div>
      </div>
    </div>
  );
};
export const Card: FC<{
  question: string;
  color: string;
  image: string;
  styles: CSSProperties;
  className: string;
}> = ({ question, color, image, styles, className }) => {
  return (
    <div
      style={{ backgroundColor: color, ...styles }}
      className={`rounded-lg pl-3 lg:pl-6 pt-3 lg:pt-7 pr-2 lg:pr-4 pb-2 lg:pb-4 text-white w-[131px] lg:w-[229px] ${className}`}
    >
      <svg
        width="32"
        height="25"
        viewBox="0 0 32 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 lg:w-8 lg:h-8"
      >
        <path
          d="M7.39526 24.3638C3.67222 24.3638 0.414551 21.128 0.414551 16.9676C0.414551 5.41098 9.72217 0.78833 9.72217 0.78833L12.0491 4.02419C12.0491 4.02419 8.32603 6.33551 7.39526 10.4959C11.1183 10.4959 14.376 13.7317 14.376 17.4299C14.376 21.128 11.1183 24.3638 7.39526 24.3638ZM24.6144 24.3638C20.8913 24.3638 17.6336 21.128 17.6336 16.9676C17.6336 5.41098 26.9413 0.78833 26.9413 0.78833L29.2682 4.02419C29.2682 4.02419 25.5451 6.33551 24.6144 10.4959C28.3374 10.4959 31.5951 13.7317 31.5951 17.4299C31.5951 21.128 28.3374 24.3638 24.6144 24.3638Z"
          fill="white"
        />
      </svg>

      <p className="font-[700] text-base lg:text-2xl mt-2">{question}</p>
      <div className="flex justify-end mt-2 lg:mt-6">
        <img
          className="rounded-full w-10 lg:w-20 h-10 lg:h-20"
          height={20}
          width={20}
          src={image}
        />
      </div>
    </div>
  );
};
