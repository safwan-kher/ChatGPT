import { FC } from "react";
import Typewriter from "typewriter-effect";

export const TechMentorHeader: FC<{
  tech_mentor_header: any;
}> = ({ tech_mentor_header }) => {
  return (
    <div className="max-w-2xl lg:max-w-7xl mx-auto w-full px-4 lg:pr-8 py-16 pb-24 lg:py-32">
      <div className="compass-header lg:compass-header-lg">
        <div className="lg:hidden order-1">
          <h1 className="text-3xl font-[700] text-center">
            {tech_mentor_header.title}
            <br />
            <span>
              <Typewriter
                options={{
                  strings: tech_mentor_header.title_tails.map(
                    ({ tail }) => tail
                  ),
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 120,
                  delay: 80,
                  wrapperClassName: "bg-gray-50",
                }}
              />
            </span>
          </h1>
        </div>
        <div className="order-3 lg:order-1">
          <h1 className="hidden lg:block text-5xl font-[700]">
            {tech_mentor_header.title}
            <br />
            <span>
              <Typewriter
                options={{
                  strings: tech_mentor_header.title_tails.map(
                    ({ tail }) => tail
                  ),
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 120,
                  delay: 80,
                  wrapperClassName: "bg-gray-50",
                }}
              />
            </span>
          </h1>
          <p className="text-center lg:text-left text-xl lg:text-3xl mt-4">
            {tech_mentor_header.description}
          </p>
          <div className="flex mt-14 gap-2 justify-center lg:justify-start flex-wrap">
            <div className="border-2 border-gray-200 rounded-md p-2 h-20">
              <img
                className="h-full w-auto"
                src={tech_mentor_header.logo_1.sizes.thumbnail}
              />
            </div>
            <div className="border-2 border-gray-200 rounded-md p-2 h-20">
              <img
                className="h-full w-auto"
                src={tech_mentor_header.logo_2.sizes.medium}
                width={tech_mentor_header.logo_2.sizes["medium-width"]}
                height={tech_mentor_header.logo_2.sizes["medium-height"]}
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
                <p className="text-sm">{tech_mentor_header.logo_3_text}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="block lg:hidden order-2 justify-self-center relative">
          <img
            className="h-auto w-[calc(100%-140px)] mx-auto aspect-[216/270] object-cover"
            src={tech_mentor_header.image.sizes.large}
          />
          <div className="bg-[#481CFF] z-2 p-4 rounded-lg absolute top-9">
            <p className="text-white text-center font-bold-x text-xl">
              {tech_mentor_header.cards[0].label}
            </p>
            <p className="text-white text-sm text-center mt-1">
              {tech_mentor_header.cards[0].text}
            </p>
          </div>
          <div className="bg-[#F36621] z-2 p-4 rounded-lg absolute bottom-2">
            <p className="text-white font-bold-x text-xl">
              {tech_mentor_header.cards[1].label}
            </p>
            <p className="text-white text-sm mt-1">
              {tech_mentor_header.cards[1].text}
            </p>
          </div>
          <div className="bg-white p-4 z-2 rounded-lg rotate-3 absolute right-0 -bottom-8">
            <div className="bg-[#282828] rounded-lg p-4">
              <p className="text-white text-center font-bold-x text-xl">
                {tech_mentor_header.cards[2].label}
              </p>
              <p className="text-white text-sm text-center mt-1">
                {tech_mentor_header.cards[2].text}
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block order-2 justify-self-center">
          <img
            className="w-[339px] h-[424px] object-cover ml-[100px] rounded-2xl rotate-6 relative"
            src={tech_mentor_header.image.sizes.large}
            alt=""
          />
          <div className="bg-[#481CFF] z-2 relative w-[126px] pt-5 px-5 pb-4 rounded-lg -mt-[300px]">
            <p className="text-white text-center font-bold-x text-3xl">
              {tech_mentor_header.cards[0].label}
            </p>
            <p className="text-white text-center mt-2">
              {tech_mentor_header.cards[0].text}
            </p>
          </div>
          <div className="bg-[#F36621] z-2 relative w-[187px] pt-5 px-5 pb-4 rounded-lg ml-[38px] mt-[111px]">
            <p className="text-white font-bold-x text-3xl">
              {tech_mentor_header.cards[1].label}
            </p>
            <p className="text-white mt-2">
              {tech_mentor_header.cards[1].text}
            </p>
          </div>
          <div className="bg-white p-6 z-2 relative rounded-lg ml-[300px] rotate-3 -mt-[111px]">
            <div className="bg-[#282828] rounded-lg pt-5 px-5 pb-4 w-[163px]">
              <p className="text-white text-center font-bold-x text-3xl">
                {tech_mentor_header.cards[2].label}
              </p>
              <p className="text-white text-center mt-2">
                {tech_mentor_header.cards[2].text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
