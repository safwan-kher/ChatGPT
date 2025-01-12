import React, { useEffect, useState, useContext, FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// Helper
import api from "api";

// Components
import Button from "components/Button";

// Helper
import NavigationItems from "navigation";

// Styles

const findRelatedPage = (locationBits, currentLanguage) => {
  const availableLanguages = Object.keys(NavigationItems);
  // const currentLanguage = locationBits[1] || availableLanguages[0];

  let otherLanguage = "";
  availableLanguages.forEach((language) => {
    if (language !== currentLanguage) {
      otherLanguage = language;
    }
  });
  const pages = [
    { en: "courses", de: "kurse" },
    { en: "about-us", de: "ueber-uns" },
    { en: "contact", de: "kontakt" },
    { en: "apply-now", de: "los-gehts" },
    { en: "careers", de: "karriere" },
    { en: "why-is-it-free", de: "warum-ist-es-kostenlos" },
    { en: "events", de: "events" },
    { en: "bootcamps-we-work-with", de: "bootcamps" },
    { en: "professional-certificates", de: "professional-certificates" },
    { en: "business", de: "fuer-unternehmen" },
  ];
  const subPages = [
    {
      en: "compass-course-digital-skills-jobs",
      de: "compass-kurs-digital-skills-jobs",
    },
    {
      en: "code-mentor-web-development",
      de: "ihr-personliches-intro-zu-web-development",
    },
    { en: "tech-mentor", de: "tech-mentor" },
  ];

  // Home page
  if (locationBits.length === 2) {
    return `/${otherLanguage}`;

    // Pages with dynamic slugs
  } else if (locationBits.length === 4) {
    const page = pages.find(
      (page) => page[currentLanguage] === locationBits[2]
    );
    const subPage = subPages.find(
      (page) => page[currentLanguage] === locationBits[3]
    );
    if (page && page[otherLanguage]) {
      return `/${otherLanguage}/${page[otherLanguage]}/${subPage[otherLanguage]}`;
      // '/courses/:slug'
    } else {
      return `/${otherLanguage}/${locationBits[2]}/${locationBits[3]}`;
      // '/partner/:partner'
      // '/legal/:slug'
    }

    // Non-translated
  } else if (["faq", "jobcenter", "blog"].includes(locationBits[2])) {
    return `/${otherLanguage}/${locationBits[2]}`;

    // Manual assignment
  } else {
    const page = pages.find(
      (page) => page[currentLanguage] === locationBits[2]
    );
    if (page && page[otherLanguage]) {
      return `/${otherLanguage}/${page[otherLanguage]}`;
    }
    return `/${otherLanguage}`;
  }
};

export const BetterHeader: FC<{ small: boolean }> = ({ small }) => {
  const router = useRouter();

  const availableLanguages = Object.keys(NavigationItems);
  const currentPathWithoutQuery = router.asPath.split("?")[0];
  const locationBits = `/${router.locale}${
    currentPathWithoutQuery === "/" ? "" : currentPathWithoutQuery
  }`.split("/");
  const currentLanguage = router.locale;

  const NavItems = [];
  const LanguageItems = [];
  if (NavigationItems[currentLanguage]) {
    NavigationItems[currentLanguage].forEach((page, index) => {
      let classes = "header__nav__item";
      if (page.hideOnDesktop) {
        classes += " hide-on-desktop";
      }
      if (page.isButton) {
        NavItems.push(
          <React.Fragment key={index}>
            <div className="header__nav__button">
              <Button
                label={page.label}
                link={`/${currentLanguage}/${page.slug}`}
                variant="small"
                onClick={() => setIsMenuOpen(false)}
              />
            </div>
            <div className="header__nav__button-mobile">
              <Button
                label={page.label}
                link={`/${currentLanguage}/${page.slug}`}
                onClick={() => setIsMenuOpen(false)}
              />
            </div>
          </React.Fragment>
        );
      } else if (page.children) {
        const children = [];
        page.children.forEach((subPage, index) => {
          children.push(
            <div key={subPage.slug} className="navigation-dropdown-item">
              <Link
                href={
                  subPage.fullSlug
                    ? subPage.fullSlug.slug
                    : `/${currentLanguage}/${page.slug && `${page.slug}/`}${
                        subPage.slug
                      }`
                }
                locale={subPage.fullSlug && subPage.fullSlug.locale}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="between-align-start">
                  <img
                    className="hands-image"
                    src={`/assets/${subPage.image}`}
                    alt=""
                  />
                  <div>
                    <p className="header__nav__item__new__label">
                      {subPage.label}
                    </p>
                    <p className="header__nav__item__new__sub-label">
                      {subPage.subLabel}
                    </p>
                    {subPage.subSubLabel && (
                      <p className="header__nav__item__new__sub-sub-label">
                        {subPage.subSubLabel}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          );
        });
        const isParentActive = locationBits[2] === page.slug;

        NavItems.push(
          <div
            key={page.label}
            className={`header__nav__item ${
              isParentActive ? "header__nav__item--active" : ""
            }`}
          >
            <span>{page.label}</span>
            <div
              className={`header__nav__item__new__dropdown ${
                page.dropdownWide ? "navigation-wide-dropdown" : ""
              } ${
                page.dropdownAlignLeft ? "navigation-align-left-dropdown" : ""
              }`}
            >
              {children}
            </div>
          </div>
        );
      } else {
        NavItems.push(
          <Link
            key={page.slug}
            href={`/${currentLanguage}/${page.slug}`}
            onClick={() => setIsMenuOpen(false)}
            className={`${classes} ${
              `/${page.slug}` === router.asPath
                ? "header__nav__item--active"
                : ""
            }`}
          >
            <span>{page.label}</span>
          </Link>
        );
      }
    });
  }
  availableLanguages.forEach((language) => {
    if (language !== currentLanguage) {
      const pathname = findRelatedPage(locationBits, router.locale);
      const { slug, ...query } = router.query;
      LanguageItems.push(
        <Link
          locale={false}
          key={language}
          href={{ pathname, query }}
          onClick={() => setIsMenuOpen(false)}
          className="header__nav__language__list__item"
        >
          {language.toUpperCase()}
        </Link>
      );
    }
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let menuToggleClass = "header__menu-toggle";
  let navClass = "header__nav";
  let body;
  if (typeof document !== "undefined") {
    body = document.querySelector("body");
  }

  if (isMenuOpen) {
    menuToggleClass += " header__menu-toggle--open";
    navClass += " header__nav--open";
    if (body) {
      body.classList.add("overlay");
    }
  } else if (body) {
    body.classList.remove("overlay");
  }

  const [bannerText, setBannerText] = useState(null);
  const [bannerSubtext, setBannerSubtext] = useState(null);
  useEffect(() => {
    api.getContent("header-banner", "en", true).then(({ content }) => {
      setBannerText(content[`banner_text_${currentLanguage}`]);
      setBannerSubtext(content[`banner_subtext_${currentLanguage}`]);
    });
  }, [currentLanguage]);

  return (
    <header className={`header w-full backdrop-blur-md bg-white bg-opacity-50`}>
      <div
        className={`max-w-7xl mx-auto px-4 ${
          small ? "h-[80px] sm:h-[60px]" : "h-[80px] sm:h-[100px]"
        } flex items-center transition-all ease-in-out duration-300`}
      >
        <div className="flex justify-between w-full">
          <Link href={`/${currentLanguage}`} className="header__logo"></Link>
          <>
            <div
              className={menuToggleClass}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <div className="header__menu-toggle__one" />
              <div className="header__menu-toggle__two" />
              <div className="header__menu-toggle__three" />
            </div>
            <nav className={navClass} role="navigation">
              {NavItems}
              <div className="header__nav__language">
                <div className="header__nav__language__current">
                  {currentLanguage}
                  <div className="header__nav__language__list">
                    {LanguageItems}
                  </div>
                </div>
              </div>
            </nav>
          </>
          {bannerText && (
            <div className="header__banner">
              <span>{bannerText}</span>
              {bannerSubtext && <span>&mdash; {bannerSubtext} &mdash;</span>}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};