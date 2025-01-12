import { useRouter } from "next/router";
import React, { FC } from "react";

const BootcampsHero: FC<{
  title1: string;
  title2: string;
  subtitle1: string;
  subtitle2: string;
  description: string;
  image: string;
}> = ({ title1, title2, subtitle1, subtitle2, description, image }) => {
  const router = useRouter();

  return (
    <>
      <header className="bootcamps-hero w-full mt-6">
        <div
          className="bootcamps-image"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className="header-reskill__gradient">
            <div className="max-w-5xl px-6 flex justify-center md:justify-start items-center h-full mx-auto w-full">
              <h1 className="text-white text-center md:text-left leading-tight">
                <span className="text-[38px]">{title1}</span>
                <br />
                <span className="font-bold text-5xl">{title2}</span>
              </h1>
            </div>
          </div>
        </div>
      </header>
      <div className="relative py-16 md:py-8">
        <div className="flex flex-col-reverse md:flex-row gap-6 md:items-center">
          <div className="flex-shrink">
            <img
              className="md:w-[679px]"
              src={
                router.locale === "de"
                  ? "/assets/images/de_computer.jpg"
                  : "/assets/images/computer.jpg"
              }
              alt=""
            />
          </div>
          <div className="px-6 md:pr-6 md:pl-0 md:max-w-xl">
            <h2 className="font-bold text-[40px] leading-9">
              <span className="text-black">{subtitle1}</span>
              <br />
              <span className="text-indigo-700">{subtitle2}</span>
            </h2>
            <p className="text-xl md:text-3xl pt-8">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BootcampsHero;
