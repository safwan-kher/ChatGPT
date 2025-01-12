export const LOCATIONS = [
  { value: "ONLINE", label: { en: "Online", de: "Online" } },
  { value: "BERLIN", label: { en: "Berlin", de: "Berlin" } },
  { value: "COLOGNE", label: { en: "Cologne", de: "Köln" } },
  {
    value: "DORTMUND",
    label: { en: "Dortmund", de: "Dortmund" },
  },
  { value: "DRESDEN", label: { en: "Dresden", de: "Dresden" } },
  {
    value: "DUSSELDORF",
    label: { en: "Dusseldorf", de: "Düsseldorf" },
  },
  {
    value: "FRANKFURT",
    label: { en: "Frankfurt", de: "Frankfurt" },
  },
  { value: "HAMBURG", label: { en: "Hamburg", de: "Hamburg" } },
  { value: "LEIPZIG", label: { en: "Leipzig", de: "Leipzig" } },
  { value: "MUNICH", label: { en: "Munich", de: "München" } },
  {
    value: "RUHRGEBIET",
    label: { en: "Ruhrgebiet", de: "Ruhrgebiet" },
  },
  {
    value: "SUTTGART",
    label: { en: "Stuttgart", de: "Stuttgart" },
  },
  {
    value: "WOLFSBURG",
    label: { en: "Wolfsburg", de: "Wolfsburg" },
  },
];

export const FUNDING_OPTIONS = [
  {
    value: "FUNDED_BY_AGENTUR_FUR_ARBEIT",
    label: {
      en: "Funded by Agentur fur Arbeit or Jobcenter",
      de: "Finanziert von der Agentur für Arbeit/Jobcenter",
    },
  },
  {
    value: "UPFRONT_PAYMENT",
    label: { en: "Upfront Payment", de: "Vorauszahlung" },
  },
  {
    value: "MONTHLY_PAYMENT",
    label: { en: "Monthly Payment", de: "Monatliche Zahlung" },
  },
  {
    value: "STUDENT_LOAN",
    label: { en: "Student Loan", de: "Studiendarlehen" },
  },
  {
    value: "INCOME_SHARING_AGREEMENT",
    label: {
      en: "Income Sharing Agreement",
      de: "Einkommensteilungsvereinbarung",
    },
  },
  {
    value: "COMPLETELY_FREE",
    label: { en: "Completely Free", de: "Kostenlos" },
  },
  {
    value: "WITH_SCHOLARSHIP",
    label: { en: "With Scholarship", de: "Mit Stipendium" },
  },
  {
    value: "COMPANY_SPONSORED",
    label: { en: "Company Sponsored", de: "Unternehmensfinanzierung" },
  },
];

export const LANGUAGES = [
  {
    value: "ENGLISH",
    label: { en: "English", de: "Englisch" },
  },
  {
    value: "GERMAN",
    label: { en: "German", de: "Deutsch" },
  },
];

export const DURATIONS = [
  {
    value: "Over 6 months",
    slug: "over_6_months",
    label: { en: "Over 6 Months", de: "über 6 Monate" },
  },
  {
    value: "3–6 months",
    slug: "3-6_months",
    label: { en: "3–6 Months", de: "3–6 Monate" },
  },
  {
    value: "Under 3 months",
    slug: "under_3_months",
    label: { en: "Under 3 Months", de: "unter 3 Monate" },
  },
];

export const HIGHLIGHTS = [
  {
    value: "JOB_GUARANTEE",
    label: { en: "Job Guarantee", de: "Job Garantie" },
  },
  {
    value: "CAREER_COACHING",
    label: { en: "Career Coaching", de: "Jobcoaching" },
  },
  {
    value: "LAPTOP_PROVIDED",
    label: { en: "Laptop Provided", de: "Inklusiver Laptop" },
  },
];

export const PROGRAM_TYPES = [
  {
    value: "Full-time",
    label: { en: "Full-Time", de: "vollzeit" },
  },
  {
    value: "Part-time",
    label: { en: "Part-Time", de: "teilzeit" },
  },
  {
    value: "Self-paced",
    label: { en: "Self-Paced", de: "freie Zeiteinteilung" },
  },
];

export const getLocaleLabel = (
  valueList: {
    value: string;
    slug?: string;
    label: {
      en: string;
      de: string;
    };
  }[],
  key: string,
  locale: "en" | "de"
): string => {
  const value = valueList.find((val) =>
    val.slug ? val.slug === key : val.value.toLowerCase() === key
  );
  return value.label[locale];
};

export const CAREERS = [
  {
    value: "Software Engineering",
    slug: "software_engineering",
    label: { en: "Software Engineering", de: "Software-Engineering" },
  },
  {
    value: "Web Development",
    slug: "web_development",
    label: { en: "Web Development", de: "Web-Entwicklung" },
  },
  {
    value: "Mobile Development",
    slug: "mobile_development",
    label: { en: "Mobile Development", de: "Mobil-Entwicklung" },
  },
  {
    value: "Cloud",
    slug: "cloud",
    label: { en: "Cloud Computing", de: "Cloud Computing" },
  },
  {
    value: "Cyber Security",
    slug: "cyber_security",
    label: { en: "Cyber Security", de: "Cyber Security" },
  },
  {
    value: "Data",
    slug: "data",
    label: { en: "Data", de: "Data" },
  },
  {
    value: "Design",
    slug: "design",
    label: {
      en: "Design",
      de: "Design",
    },
  },
  {
    value: "Online Marketing",
    slug: "online_marketing",
    label: {
      en: "Online Marketing",
      de: "Online Marketing",
    },
  },
  {
    value: "Language & Tech",
    slug: "language_tech",
    label: { en: "Language & Tech", de: "kombinierte Sprach- & Tech-Kurse" },
  },
  {
    value: "Other",
    slug: "other",
    label: { en: "Other Tech Careers", de: "Andere Tech-Karrieren" },
  },
];
