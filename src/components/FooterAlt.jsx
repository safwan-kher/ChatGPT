import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// Helper
import FooterItems from "footer";

export default function FooterAlt() {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const FooterLinks = [];
  const currentLanguage = router.locale || "en";

  if (FooterItems[currentLanguage] && FooterItems[currentLanguage].links) {
    FooterItems[currentLanguage].links.forEach((column, index) => {
      const items = [];
      column.items.forEach((page) => {
        if (
          page.slug.substr(0, 7) !== "http://" &&
          page.slug.substr(0, 8) !== "https://"
        ) {
          items.push(
            <Link
              locale={page.lang || currentLanguage}
              key={page.slug}
              href={`/${page.slug}`}
              target={page.openInNewTab ? "_blank" : "_self"}
              className="footer__list__item">

              <span>{page.label}</span>

            </Link>
          );
        } else {
          items.push(
            <a
              key={page.slug}
              href={page.slug}
              className="footer__list__item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{page.label}</span>
            </a>
          );
        }
      });
      FooterLinks.push(
        <div className="col-2 col-6-sm" key={index}>
          <div className="footer__list">
            <div className="footer__list__heading">{column.heading}</div>
            {items}
          </div>
        </div>
      );
    });
  }
  const slogan = FooterItems[currentLanguage]
    ? FooterItems[currentLanguage].slogan
    : "";
  const certificate = FooterItems[currentLanguage]
    ? FooterItems[currentLanguage].certificate
    : "";

  return (
    <footer className="footer" role="complementary">
      <div className="full-width-outer">
        <div className="max-w-[1440px] mx-auto pt-[70px] pb-[220px] md:pb-[140px] relative">
          <div className="row">
            <div className="col-1 col-0-sm" />
            <div className="col-3 col-12-sm">
              <div className="footer__logo" />
              <div className="footer__slogan">{slogan}</div>
            </div>

            {FooterLinks}
          </div>
          <div className="footer__copyright">
            &copy; {currentYear} StartSteps Digital Education GmbH
            <br />
            Built with 💚 in Berlin
          </div>
          <div className="footer__certification">
            <img
              className="footer__certification__logo"
              src={"/assets/certificate.png"}
              alt=""
            />
            <div className="footer__certification__text">{certificate}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
