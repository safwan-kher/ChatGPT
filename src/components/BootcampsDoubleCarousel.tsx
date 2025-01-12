import { FC } from "react";
import Flicking from "@egjs/react-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking.css";

type BootcampsDoubleCarouselProps = {
  title: string;
  subtitle: string;
  bootcamps1: {
    logo: any;
  }[];
  bootcamps2: {
    logo_2: any;
  }[];
};

export const BootcampsDoubleCarousel: FC<BootcampsDoubleCarouselProps> = ({
  title,
  subtitle,
  bootcamps1,
  bootcamps2,
}) => {
  return (
    <div className="py-20 lg:py-32">
      <div className="max-w-xl lg:max-w-7xl mx-auto px-4">
        <h2 className="text-center mx-auto max-w-3xl text-3xl lg:text-4xl font-[700]">
          {title}
        </h2>
        <p className="text-center mx-auto max-w-3xl text-xl mt-4 lg:text-2xl">
          {subtitle}
        </p>
      </div>
      <div className="relative mt-10 lg:mt-24">
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
