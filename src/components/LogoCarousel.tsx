import { FC } from "react";
import Flicking from "@egjs/react-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking.css";

interface LogoCarouselProps {
  logos: any[];
  title: string;
  altStyle: boolean;
}

export const LogoCarousel: FC<LogoCarouselProps> = ({
  logos,
  title,
  altStyle,
}) => {
  return (
    <section className="mt-16 mb-16 full-width-outer">
      <div className="max-w-5xl mx-auto px-4 w-full">
        <h2 className="text-3xl lg:text-5xl font-[700]">{title}</h2>
      </div>
      <div className="relative mt-8">
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
          duration={1500}
        >
          {logos.map(({ logo }) => (
            <div className="w-32 h-32 mx-4 flex items-center justify-center">
              <img src={logo.sizes.medium} />
            </div>
          ))}
          {logos.map(({ logo }) => (
            <div className="w-32 h-32 mx-4 flex items-center justify-center">
              <img src={logo.sizes.medium} />
            </div>
          ))}
          {logos.map(({ logo }) => (
            <div className="w-32 h-32 mx-4 flex items-center justify-center">
              <img src={logo.sizes.medium} />
            </div>
          ))}
          {logos.map(({ logo }) => (
            <div className="w-32 h-32 mx-4 flex items-center justify-center">
              <img src={logo.sizes.medium} />
            </div>
          ))}
          {logos.map(({ logo }) => (
            <div className="w-32 h-32 mx-4 flex items-center justify-center">
              <img src={logo.sizes.medium} />
            </div>
          ))}
          {logos.map(({ logo }) => (
            <div className="w-32 h-32 mx-4 flex items-center justify-center">
              <img src={logo.sizes.medium} />
            </div>
          ))}
        </Flicking>
        <div
          style={{ width: `calc(50vw - 64px)` }}
          className={`absolute inset-0 backdrop-saturate-0 ${
            altStyle ? "bg-indigo-100/80" : "bg-gray-100/80"
          } z-50`}
        ></div>
        <div
          style={{ width: `calc(50vw - 64px)` }}
          className={`absolute right-0 inset-y-0 backdrop-saturate-0  ${
            altStyle ? "bg-indigo-100/80" : "bg-gray-100/50"
          } z-50`}
        ></div>
      </div>
    </section>
  );
};
