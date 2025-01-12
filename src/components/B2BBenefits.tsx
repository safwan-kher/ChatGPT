import { FC, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input, InputProps, Dropdown } from "./Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { getReferral } from "./ReferralWrapper";
import { useCookies } from "react-cookie";
import api from "api";

type B2BThreeFeaturesOptions = {
  benefits_heading_start: string;
  benefits_heading_end: string;
  benefits_picture: any;
  benefits: { benefit: string }[];
};

export const B2BBenefits: FC<B2BThreeFeaturesOptions> = ({
  benefits_heading_start,
  benefits_heading_end,
  benefits_picture,
  benefits,
}) => {
  return (
    <div className="max-w-xl md:max-w-7xl px-4 mx-auto py-0 md:py-16">
      <div className="flex-col items-end md:items-center md:flex-row flex">
        <img src="/assets/plane.png" className="h-[91px] md:mr-16" alt="" />
        <h2 className="font-[700] text-5xl mt-6 md:mt-0">
          <span>{benefits_heading_start}</span>
          <span className="text-indigo-700">{benefits_heading_end}</span>
        </h2>
      </div>
      <div className="md:flex mt-14 md:space-x-12 items-center">
        <div className="relative md:w-5/12">
          <svg
            viewBox="0 0 431 271"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.35973 8.68177C1.26046 6.69422 2.83615 5.02393 4.8261 5.00729L426.783 1.47847C428.859 1.46112 430.493 3.24286 430.297 5.30881L405.49 266.867C405.305 268.826 403.541 270.247 401.587 270.011L14.9949 223.379C13.3026 223.174 12.0034 221.781 11.9184 220.078L1.35973 8.68177Z"
              stroke="#481BFF"
            />
          </svg>

          <img
            style={{ clipPath: "url(#background-mask-mirror)" }}
            className="absolute inset-0 translate-x-2"
            src={benefits_picture.sizes.large}
            alt=""
          />
        </div>
        <ul className="space-y-4 flex-1 mt-12 md:mt-0">
          {benefits.map((benefit, index) => (
            <li
              className="bg-gray-100 rounded list-none text-xl py-2 px-4 text-center"
              key={index}
            >
              {benefit.benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
