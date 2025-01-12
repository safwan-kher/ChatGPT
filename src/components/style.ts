export const ZalandoStyle: Style = {
  fontTitle1: "font-arial font-[700]",
  fontTitle2: "font-georgia font-regular",
  fontTitle3: "font-georgia font-[700]",
  fontText: "font-arial font-regular",
  mainColor: "text-zalandoMain",
  secondaryColor: "text-zalandoSecondary",
  mainBg: "bg-zalandoMain",
  mainBorder: "border-zalandoMain",
  secondaryBg: "bg-zalandoSecondary",
  secondaryBgLg: "lg:bg-zalandoSecondary",
  style: "zalando",
};

// export const ServiceNowStyle: Style = {
//   fontTitle1: "font-gilroy font-[800]",
//   fontTitle2: "font-gilroy font-[700]",
//   fontTitle3: "font-gilroy font-[700]",
//   fontText: "font-gilroy font-regular",
//   mainColor: "text-servicenowSecondary",
//   secondaryColor: "text-servicenowMain",
//   mainBg: "bg-servicenowSecondary",
//   mainBorder: "border-servicenowSecondary",
//   secondaryBg: "bg-servicenowMain",
//   secondaryBgLg: "lg:bg-servicenowMain",
//   style: "servicenow",
// };

/* Full Updated ServiceNowStyle */
export const ServiceNowStyle: Style = {
  fontTitle1: "font-gilroy font-[800]",
  fontTitle2: "font-gilroy font-[700]",
  fontTitle3: "font-gilroy font-[700]",
  fontText: "font-gilroy font-regular",
  mainColor: "text-white", // Updated for white text
  secondaryColor: "text-servicenowMain",
  mainBg: "bg-servicenowSecondary",
  mainBorder: "border-green-500", // Updated for green border
  secondaryBg: "bg-servicenowMain",
  secondaryBgLg: "lg:bg-servicenowMain",
  style: "servicenow",
};

export const MediaTechStyle: Style = {
  fontTitle1: "font-mont font-[900]",
  fontTitle2: "font-mont font-[300]",
  fontTitle3: "font-mont font-[300]",
  fontText: "font-mont font-regular",
  mainColor: "text-mediatechSecondary",
  secondaryColor: "text-mediatechMain",
  mainBg: "bg-mediatechSecondary",
  mainBorder: "border-mediatechSecondary",
  secondaryBg: "bg-mediatechMain",
  secondaryBgLg: "lg:bg-mediatechMain",
  style: "media-tech",
};

export const EducateStyle: Style = {
  fontTitle1: "font-encode font-[700]",
  fontTitle2: "font-encode font-[400]",
  fontTitle3: "font-encode font-[400]",
  fontText: "font-encode font-regular",
  mainColor: "text-educateSecondary",
  secondaryColor: "text-educateMain",
  mainBg: "bg-educateSecondary",
  mainBorder: "border-educateAccent2",
  secondaryBg: "bg-educateMain",
  secondaryBgLg: "lg:bg-educateMain",
  style: "educate",
};

export type Style = {
  fontTitle1: string;
  fontTitle2: string;
  fontTitle3: string;
  fontText: string;
  mainColor: string;
  secondaryColor: string;
  mainBg: string;
  mainBorder: string;
  secondaryBg: string;
  secondaryBgLg: string;
  style: "zalando" | "servicenow" | "media-tech" | "educate";
};
