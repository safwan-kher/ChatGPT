import { FC, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input, InputProps, Dropdown } from "./Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { getReferral } from "./ReferralWrapper";
import { useCookies } from "react-cookie";
import api from "api";

type B2BThreeFeaturesProps = {
  features: { text_1: string; text_2: string; icon: any }[];
};

export const B2BThreeFeatures: FC<B2BThreeFeaturesProps> = ({ features }) => {
  return (
    <div className="max-w-xl md:max-w-7xl px-4 mx-auto my-24 mt-32 grid grid-cols-1 md:grid-cols-3 gap-28 md:gap-16">
      {features.map((feature) => (
        <div className="bg-indigo-700 rounded-lg px-10 pb-6 pt-10 text-center uppercase flex items-center justify-center relative">
          <img
            src={feature.icon.sizes.medium}
            className="absolute -top-16 w-[100px]"
            alt=""
          />
          <div>
            <h2 className="font-[700] text-white text-3xl">{feature.text_1}</h2>
            <p className="text-xl text-white">{feature.text_2}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
