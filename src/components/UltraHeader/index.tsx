import React, { FC, ReactElement } from "react";
import Link from "next/link";

import utils from "utils";
import { useRouter } from "next/router";

export const UltraHeader: FC<{
  backgroundImageUrl: string;
  language: "en" | "de";
  title: string;
  badge: string;
  subtitle: string;
  form: ReactElement;
  hideBadge?: boolean;
  alternativeLanguagePageSlug?: string;
  hideLanguageSwitchButton?: boolean;
  threeExtraLogos?: any[];
}> = ({
  backgroundImageUrl,
  language,
  title,
  badge,
  subtitle,
  form,
  alternativeLanguagePageSlug,
  hideBadge,
  hideLanguageSwitchButton,
  threeExtraLogos,
}) => {
  const router = useRouter();
  return (
    <header className="ultra-header-container">
      <div className="ultra-header full-width-outer">
        <div
          className="ultra-image-background"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(72, 27, 255, 0.9), rgba(72, 27, 255, 0)), url(${backgroundImageUrl})`,
          }}
        >
          <div className="ultra-container z-20">
            <div className="ultra-logo">
              <div className="flex gap-6 items-center flex-wrap">
                <Link href={`/${language}`} className="header__logo">

                </Link>
                {threeExtraLogos?.map?.(({ extra_logo }) => (
                  <img
                    className="max-h-[40px] sm:max-h-[60px] max-w-[100px] sm:max-w-[120px]"
                    src={extra_logo.sizes.medium}
                  />
                ))}
              </div>
              {hideLanguageSwitchButton !== true && (
                (<Link
                  locale={language === "en" ? "de" : "en"}
                  href={
                    alternativeLanguagePageSlug
                      ? alternativeLanguagePageSlug
                      : router.asPath
                  }
                  className="simple-language-switch">

                  {language === "en" ? "Deutsch" : "English"}

                </Link>)
              )}
            </div>
            <div className="ultra-title-container">
              <div className="ultra-badge-title">
                <h1 className="ultra-badge-title__text">
                  <span>{title}</span>
                </h1>
                {!hideBadge && badge && (
                  <div className="badge-floating">
                    <span
                      className={`ultra-badge-title__badge${
                        badge.length > 6
                          ? " ultra-badge-title__badge--small"
                          : ""
                      }`}
                    >
                      {badge}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div
              className="ultra-subtitle-mobile"
              dangerouslySetInnerHTML={{
                __html: utils.cleanText(subtitle, true),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="ultra-container">
        <div
          className="ultra-subtitle"
          dangerouslySetInnerHTML={{ __html: utils.cleanText(subtitle, true) }}
        ></div>
      </div>
      <div className="ultra-form-container">{form}</div>
    </header>
  );
};
