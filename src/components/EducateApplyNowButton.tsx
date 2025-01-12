import { FC } from "react";
import { Style } from "./style";
import { useRouter } from "next/router";

export const EducateApplyNowButton: FC<{
  style: Style;
  dark: boolean;
  onClick: () => void;
  text: string;
  special?: boolean;
}> = ({ style, dark, onClick, text, special }) => {
  const { locale } = useRouter();

  return (
    <button
      onClick={onClick}
      className={`bg-educateAccent font-educate font-[700] text-white rounded uppercase px-8 py-1.5 text-[21px]`}
    >
      {text}
      <span className={`${dark ? "text-white" : ""}`}>
        &nbsp;<span className="font-gilroy">→</span>
      </span>
    </button>
  );
};
