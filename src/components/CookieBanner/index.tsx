import React, { useState } from "react";

// Components
import Button from "components/Button";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(
      localStorage.getItem("mayAddTrackingScripts") !== null ? false : true
    );
  }, []);
  const router = useRouter();
  const currentLocale = router.locale === "de" ? "de" : "en";
  const currentLanguage = router.locale;
  let cookieText =
    "This site uses cookies to provide you with a great user experience. Do you accept our use of cookies?";
  let linkText = "Learn more";
  if (currentLanguage === "de") {
    cookieText =
      "Diese Webseite verwendet Cookies, um Ihnen eine optimale Benutzererfahrung zu bieten. Sind Sie mit der Verwendung von Cookies einverstanden?";
    linkText = "Mehr erfahren";
  }

  const consent = () => {
    (window as any).gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });

    localStorage.setItem("mayAddTrackingScripts", "true");
    setIsVisible(false);
  };

  const i18n = {
    yes: {
      en: "Yes I do",
      de: "Ja",
    },
    no: {
      en: "No",
      de: "Nein",
    },
  };

  if (!isVisible) {
    return null;
  }
  return (
    <div className="cookie-banner">
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row">
            <div className="col-1 col-0-sm" />
            <div className="col-10 col-12-sm">
              <div className="cookie-banner__inner">
                <div className="row">
                  <div className="col-1">
                    <div className="cookie-banner__image">
                      <span aria-label="Cookie" role="img">
                        🍪
                      </span>
                    </div>
                  </div>
                  <div className="col-7 col-11-sm">
                    <span>{cookieText}</span>
                    <a
                      className="cookie-banner__more"
                      href="/en/legal/privacy"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {linkText}
                    </a>
                  </div>
                  <div className="col-4 col-12-sm">
                    <div className="cookie-banner__buttons">
                      <Button
                        label={i18n.yes[currentLocale]}
                        onClick={consent}
                      />
                      <Button
                        label={i18n.no[currentLocale]}
                        onClick={() => {
                          localStorage.setItem(
                            "mayAddTrackingScripts",
                            "false"
                          );
                          setIsVisible(false);
                        }}
                        variant="transparent-blue"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1 col-0-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
