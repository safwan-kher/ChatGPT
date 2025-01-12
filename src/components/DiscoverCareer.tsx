import Link from "next/link";
import { FC, useContext, useRef, useState } from "react";
import { AppContext } from "../../pages/_app";

type DiscoverCareerProps = {
  title: string;
  subtitle: string;
  courseLink: string;
  courseDownloadLink: string;
  consultationCall: string;
  roles: {
    icon: any;
    name: string;
  }[];
};

export const DiscoverCareer: FC<DiscoverCareerProps> = ({
  title,
  subtitle,
  courseLink,
  courseDownloadLink,
  consultationCall,
  roles,
}) => {
  const context = useContext(AppContext);

  return (
    <div className="bg-gray-50">
      <div className="max-w-xl lg:max-w-7xl py-16 lg:py-20 mx-auto px-4 grid gap-6 grid-cols-1 lg:grid-cols-2 items-center">
        <div className="py-10">
          <h2 className="text-center lg:text-left max-w-3xl text-3xl lg:text-4xl font-[700]">
            {title}
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: subtitle }}
            className="text-center lg:text-left max-w-3xl text-xl mt-4 lg:text-2xl"
          ></div>
          <div className="hidden lg:block">
            {/* <button
              onClick={() => context.setIsDownloadOverlayVisible(true)}
              className="block w-max mt-7 bg-[#43E1BC] uppercase px-6 py-[11px] rounded-[4px] text-white font-[700] tracking-wider"
            >
              {courseLink}
            </button> */}
            <button
              className="flex w-max items-center gap-2 mt-24 font-bold-x text-xl"
              onClick={() =>
                (window as any)?.Calendly?.initPopupWidget({
                  url: "https://calendly.com/d/crr-xxj-qhs/let-s-chat-startsteps",
                })
              }
            >
              {consultationCall}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.4 18L5 16.6L14.6 7H6V5H18V17H16V8.4L6.4 18Z"
                  fill="#282828"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 lg:gap-2">
          <div className="grid gap-1 lg:gap-2 col-span-2 grid-cols-2 auto-rows-[auto_40%]">
            {roles.slice(0, 3).map((role, index) => (
              <div
                className={`border border-gray-100 rounded-[4px] p-4 lg:p-6 bg-white flex flex-col justify-between ${
                  index === 2 ? "col-span-2" : ""
                }`}
              >
                <img
                  className="w-6 lg:w-10 h-6 lg:h-10"
                  src={role.icon.sizes.thumbnail}
                />
                <p className="text-sm lg:text-2xl mt-4 lg:mt-7">{role.name}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-1 lg:gap-2 col-span-1 auto-rows-fr">
            {roles.slice(3).map((role) => (
              <div
                className={`border border-gray-100 rounded-[4px] p-4 lg:p-6 bg-white flex flex-col justify-between`}
              >
                <img
                  className="w-6 lg:w-10 h-6 lg:h-10"
                  src={role.icon.sizes.thumbnail}
                />
                <p className="text-sm lg:text-2xl mt-4 lg:mt-7">{role.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex mt-4 flex-col items-center lg:hidden">
          {/* <button
            onClick={() => context.setIsDownloadOverlayVisible(true)}
            className="block bg-[#43E1BC] uppercase px-6 py-[11px] rounded-[4px] text-white font-[700] tracking-wider"
          >
            {courseLink}
          </button> */}
          <button
            className="flex items-center gap-2 mt-8 font-bold-x text-xl"
            onClick={() =>
              (window as any)?.Calendly?.initPopupWidget({
                url: "https://calendly.com/d/crr-xxj-qhs/let-s-chat-startsteps",
              })
            }
          >
            {consultationCall}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.4 18L5 16.6L14.6 7H6V5H18V17H16V8.4L6.4 18Z"
                fill="#282828"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
