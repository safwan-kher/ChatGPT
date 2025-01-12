import { FC } from "react";
import Flicking from "@egjs/react-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking.css";

type BootcampsDoubleCarouselProps = {
  title: string;
  content: { text: any }[];
  bootcamps1: {
    logo: any;
  }[];
  title_2: string;
  bootcamps2: {
    logo_2: any;
  }[];
};

export const TechMentorDoubleCarousel: FC<BootcampsDoubleCarouselProps> = ({
  title,
  content,
  bootcamps1,
  title_2,
  bootcamps2,
}) => {
  return (
    <div className="py-20 lg:py-32">
      <div className="max-w-xl lg:max-w-7xl mx-auto px-4">
        <h2 className="text-center mx-auto max-w-3xl text-3xl lg:text-4xl font-[700]">
          {title}
        </h2>
        <div className="space-y-2 mt-7 max-w-3xl mx-auto">
          {content.map(({ text }) => (
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
                className="text-xl lg:text-2xl text-center"
                dangerouslySetInnerHTML={{ __html: text }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative mt-10 lg:mt-16">
        <Flicking
          plugins={[
            new AutoPlay({
              duration: 0,
              direction: "NEXT",
              stopOnHover: false,
            }),
          ]}
          viewportTag="div"
          cameraTag="div"
          align="center"
          horizontal={true}
          circular={true}
          collectstatistics={"false"}
          easing={(x: number) => x}
          duration={3000}
        >
          {bootcamps1.concat(bootcamps1).map(({ logo }) => (
            <img
              className="w-32 mx-4 h-32 lg:h-40 lg:w-40 object-contain"
              src={logo.sizes.medium}
            />
          ))}
        </Flicking>
      </div>
      <h2 className="text-center mx-auto max-w-3xl text-3xl lg:text-4xl font-[700] mt-8">
        {title_2}
      </h2>
      <div className="relative mt-6 lg:mt-9">
        <Flicking
          plugins={[
            new AutoPlay({
              duration: 0,
              direction: "PREV",
              stopOnHover: false,
            }),
          ]}
          viewportTag="div"
          cameraTag="div"
          align="center"
          horizontal={true}
          circular={true}
          collectstatistics={"false"}
          easing={(x: number) => x}
          duration={3000}
        >
          {bootcamps2.concat(bootcamps2).map(({ logo_2 }) => (
            <img
              className="w-32 mx-4 h-32 lg:h-40 lg:w-40 object-contain"
              src={logo_2.sizes.medium}
            />
          ))}
        </Flicking>
      </div>
    </div>
  );
};
