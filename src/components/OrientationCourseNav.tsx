import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

export const OrientationCourseNav: FC<{
  enSlug?: string | undefined;
  deSlug?: string | undefined;
}> = ({ enSlug, deSlug }) => {
  const router = useRouter();
  const locale = router.locale === "en" ? "en" : "de";
  const altLocale = locale === "en" ? "de" : "en";

  return (
    <header className="sticky top-0 bg-white z-10">
      <nav className="h-20 flex items-center max-w-2xl lg:max-w-7xl mx-auto px-4 justify-between">
        <Link href={"/"}>
          <img className="w-auto h-11" src="/logo.png" />
        </Link>
        <div className="flex items-center gap-6 lg:gap-8">
          <Link
            className="block bg-indigo-700 uppercase px-2 lg:px-6 py-[11px] text-sm lg:text-base rounded-[4px] text-white font-[700] tracking-wider text-center"
            href={"#contact"}
          >
            {locale === "en" ? "Apply now" : "Bewirb dich jetzt"}
          </Link>
          <Link className="block lg:hidden" href={"tel:+4932221854528"}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.95 18C14.8667 18 12.8083 17.5458 10.775 16.6375C8.74167 15.7292 6.89167 14.4417 5.225 12.775C3.55833 11.1083 2.27083 9.25833 1.3625 7.225C0.454167 5.19167 0 3.13333 0 1.05C0 0.75 0.1 0.5 0.3 0.3C0.5 0.1 0.75 0 1.05 0H5.1C5.33333 0 5.54167 0.0791667 5.725 0.2375C5.90833 0.395833 6.01667 0.583333 6.05 0.8L6.7 4.3C6.73333 4.56667 6.725 4.79167 6.675 4.975C6.625 5.15833 6.53333 5.31667 6.4 5.45L3.975 7.9C4.30833 8.51667 4.70417 9.1125 5.1625 9.6875C5.62083 10.2625 6.125 10.8167 6.675 11.35C7.19167 11.8667 7.73333 12.3458 8.3 12.7875C8.86667 13.2292 9.46667 13.6333 10.1 14L12.45 11.65C12.6 11.5 12.7958 11.3875 13.0375 11.3125C13.2792 11.2375 13.5167 11.2167 13.75 11.25L17.2 11.95C17.4333 12.0167 17.625 12.1375 17.775 12.3125C17.925 12.4875 18 12.6833 18 12.9V16.95C18 17.25 17.9 17.5 17.7 17.7C17.5 17.9 17.25 18 16.95 18ZM3.025 6L4.675 4.35L4.25 2H2.025C2.10833 2.68333 2.225 3.35833 2.375 4.025C2.525 4.69167 2.74167 5.35 3.025 6ZM11.975 14.95C12.625 15.2333 13.2875 15.4583 13.9625 15.625C14.6375 15.7917 15.3167 15.9 16 15.95V13.75L13.65 13.275L11.975 14.95Z"
                fill="#282828"
              />
            </svg>
          </Link>
          <Link
            className="font-bold-x uppercase text-sm"
            href={
              locale === "en"
                ? deSlug ?? "orientierungskurs"
                : enSlug ?? "orientation-compass"
            }
            locale={altLocale}
          >
            {altLocale}
          </Link>
        </div>
      </nav>
    </header>
  );
};
