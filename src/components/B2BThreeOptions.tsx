import { FC, Fragment, MutableRefObject } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input, InputProps, Dropdown } from "./Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { getReferral } from "./ReferralWrapper";
import { useCookies } from "react-cookie";
import api from "api";

type B2BThreeFeaturesOptions = {
  options_heading: string;
  options_description: string;
  three_options: {
    title: string;
    content: string;
    button_text: string;
    picture: any;
    form_lead_source: string;
  }[];
  refx: MutableRefObject<HTMLDivElement | null>;
  buildFormOpener: (leadSource: string) => () => void;
};

export const B2BThreeOptions: FC<B2BThreeFeaturesOptions> = ({
  options_heading,
  options_description,
  three_options,
  refx,
  buildFormOpener,
}) => {
  return (
    <div ref={refx} className="relative my-24">
      <div className="bg-gray-100 absolute top-0 inset-x-0 bottom-32"></div>
      <div className="max-w-xl md:max-w-7xl px-4 mx-auto pt-14 relative">
        <h2 className="font-[700] text-5xl">{options_heading}</h2>
        <p className="text-xl mt-4">{options_description}</p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-11 mt-12">
          {three_options.map((option, index) => (
            <li
              key={index}
              className="bg-white shadow-xl rounded-3xl px-8 pb-16 list-none flex items-start flex-col justify-between"
            >
              <div>
                <div className="px-4">
                  <img
                    src={option.picture.sizes.medium}
                    className="-mt-5 rounded-3xl aspect-video object-cover w-full h-auto shadow-xl"
                    alt=""
                  />
                </div>
                <h3 className="font-[700] text-2xl mt-6">{option.title}</h3>
                <p className="text-xl text-gray-700 mt-2">{option.content}</p>
              </div>
              <button
                onClick={buildFormOpener(option.form_lead_source)}
                className="mt-8 bg-indigo-700 text-white rounded font-[700] text-center uppercase px-5 pt-[9px] pb-[7px] text-lg tracking-widest"
              >
                {option.button_text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
