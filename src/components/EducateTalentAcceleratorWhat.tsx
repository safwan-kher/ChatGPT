import { FC } from "react";
import { Style } from "./style";

export const EducateTalentAcceleratorWhat: FC<{
  talent_accelerator_what_title: string;
  talent_accelerator_what_requirements: { requirement: string }[];
  talent_accelerator_what_steps: { title: string; content: string }[];
  talent_accelerator_what_disclaimer: string;
  talent_accelerator_what_image: any;
  style: Style;
}> = ({
  talent_accelerator_what_title,
  talent_accelerator_what_requirements,
  talent_accelerator_what_steps,
  talent_accelerator_what_disclaimer,
  talent_accelerator_what_image,

  style,
}) => {
  return (
    <section className="bg-gray-100 lg:bg-transparent my-16">
      <div className="flex flex-col lg:flex-row max-w-2xl lg:max-w-4xl mx-auto lg:px-4">
        <div className="bg-gray-100 py-8 px-4 lg:p-8 lg:w-8/12 lg:rounded-l-2xl">
          <h2 className={`${style.fontTitle1} text-3xl hyphens-auto`}>
            {talent_accelerator_what_title}
          </h2>
          <div className="mt-4 space-y-1">
            {talent_accelerator_what_requirements.map(
              ({ requirement }, index) => (
                <div key={index} className="flex items-start">
                  <svg
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 mt-1.5"
                  >
                    <g clip-path="url(#clip0_1474_17040)">
                      <path
                        d="M8.63755 0.000244141C9.83915 0.0351373 11.023 0.294626 12.1257 0.764835C12.2778 0.823346 12.4072 0.927308 12.4958 1.06203C12.5844 1.19675 12.6277 1.35543 12.6196 1.51564C12.6114 1.67584 12.5522 1.82948 12.4504 1.95485C12.3485 2.08022 12.2092 2.17097 12.052 2.2143C11.8484 2.26658 11.6324 2.24443 11.4442 2.15197C10.531 1.76351 9.57654 1.55262 8.58149 1.58668C5.72691 1.68234 3.57897 2.95932 2.30437 5.46616C0.204372 9.59712 2.72186 14.4898 7.3364 15.3631C11.172 16.0878 14.9715 13.5128 15.5977 9.73845C15.7002 9.11808 15.6855 8.47886 15.7143 7.84762C15.7327 7.45554 15.9599 7.1613 16.3361 7.07651C16.7543 6.98302 17.1961 7.25624 17.2544 7.67369C17.2828 7.93845 17.2914 8.2049 17.2802 8.47089C17.2544 10.9683 16.3375 13.091 14.4684 14.7891C13.1118 16.0378 11.3673 16.802 9.51532 16.9589C5.20394 17.3662 1.32334 14.6942 0.266332 10.6074C-0.948524 5.91114 2.11628 1.133 6.94398 0.217663C7.50162 0.108229 8.07254 0.0727172 8.63755 0.000244141Z"
                        fill="#30D1FF"
                      />
                      <path
                        d="M8.6416 9.04492C8.69836 8.96472 8.75942 8.88755 8.82453 8.81373C11.1692 6.50571 13.5148 4.19768 15.8614 1.88966C16.0731 1.68021 16.3099 1.54831 16.6152 1.59976C16.7568 1.61756 16.89 1.6753 16.9988 1.76599C17.1076 1.85667 17.1873 1.97641 17.2282 2.1107C17.2802 2.24527 17.2906 2.39195 17.2579 2.53227C17.2252 2.6726 17.151 2.80027 17.0445 2.89921C16.6285 3.31303 16.2051 3.72467 15.784 4.13849C13.6203 6.26727 11.4566 8.39556 9.29292 10.5234C8.85035 10.9626 8.43138 10.9633 7.98881 10.5284C7.24087 9.79502 6.48997 9.06376 5.75235 8.32744C5.36953 7.9484 5.4396 7.36427 5.89029 7.10627C6.20968 6.92363 6.57849 6.97581 6.86616 7.25556C7.40708 7.78171 7.94504 8.31028 8.48006 8.84127C8.52432 8.88765 8.5612 8.94418 8.6416 9.04492Z"
                        fill="#30D1FF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1474_17040">
                        <rect
                          width="17.2787"
                          height="17"
                          fill="white"
                          transform="translate(0 0.000244141)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div
                    className="text-lg"
                    dangerouslySetInnerHTML={{ __html: requirement }}
                  ></div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="lg:w-4/12 h-[431px] lg:h-auto flex">
          <div
            className={`hidden lg:block w-[19px] ${style.mainBg} h-full`}
          ></div>
          <div className="flex-1 px-4 lg:px-0">
            <img
              className="rounded lg:rounded-l-none lg:rounded-r-2xl h-full w-full object-cover"
              src={talent_accelerator_what_image.sizes.large}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="px-4 bg-white lg:bg-transparent">
        <div
          className={`lg:border ${
            style.style === "media-tech"
              ? "border-mediatechMain"
              : style.mainBorder
          } rounded-3xl max-w-2xl lg:max-w-6xl mx-auto px-auto px-4 lg:pb-14 lg:px-14 pt-32 -mt-20`}
        >
          <div className="grid lg:grid-cols-2 gap-x-5 gap-y-12">
            {talent_accelerator_what_steps.map(({ title, content }, index) => (
              <div key={index}>
                <p
                  className={`${style.fontTitle1} ${style.mainColor} text-5xl`}
                >
                  0{index + 1}.
                </p>
                <h3 className={`${style.fontTitle1} text-2xl mt-2`}>{title}</h3>
                <div
                  className={`${style.fontText} text-lg mt-4`}
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-lg">
            {talent_accelerator_what_disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};
