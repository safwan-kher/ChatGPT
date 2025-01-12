import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

// Helper
import api from "api";
import utils from "utils";

// Components
import Button from "components/Button";
import Input from "components/Input";
import { getReferral } from "components/ReferralWrapper";
import { useRouter } from "next/router";
import { createPersonAndDeal } from "createPersonAndDeal";

// Styles

export default function DownloadOverlay(props) {
  const router = useRouter();
  const currentLanguage = router.locale || "en";
  // const currentLanguage = useLocation().pathname.split('/')[1] || 'en';
  const { isVisible, setIsVisible } = props;
  const isLandingPage = utils.isLandingPage(false, router.asPath);
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [cookies] = useCookies();

  // Submit form to Pipedrive

  const submitForm = async () => {
    if (isEmailValid) {
      setIsBusy(true);
      const customFields = {
        "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": `Download Course Package${getReferral(
          cookies.ref
        )}`,
        dc0a286b9fe00ab025597776b38364624d981bb9:
          currentLanguage === "de" ? "Deutsch" : "English",
      };

      try {
        await createPersonAndDeal({
          firstName: email,
          lastName: "",
          email: email,
          pipedriveStageId: 61,
          customFields: customFields,
          courseName: "Compass Course Package",
        });
        setIsDownloadReady(true);
        setIsBusy(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    if (isLandingPage) return;
    const slug =
      currentLanguage === "en"
        ? "download-course-package"
        : "kursinfos-runterladen";
    api.getContent(slug, currentLanguage, true).then(({ content }) => {
      setContent(content);
    });
  }, [currentLanguage, isLandingPage]);

  useEffect(() => {
    const input = document.getElementById("download-course-package-input");
    if (isVisible && input) {
      input.focus();
    }
  }, [isVisible]);

  const {
    downloadoverlay_title,
    downloadoverlay_input_label,
    downloadoverlay_button_label,
    downloadoverlay_download_label,
    downloadoverlay_download_link,
  } = content;

  let className = "download-overlay__blocker";
  if (isVisible) {
    className += " download-overlay__blocker--show";
  }

  if (isLandingPage) {
    return null;
  }

  return (
    <div className={className}>
      <div className="download-overlay">
        <img
          className="download-overlay__floater"
          src={"/assets/floaters/book.png"}
          alt=""
        />
        <img
          className="download-overlay__close"
          src={"/assets/icons/close.svg"}
          alt=""
          onClick={() => setIsVisible(false)}
        />
        <>
          {isDownloadReady ? (
            <a
              className="download-overlay__download"
              href={downloadoverlay_download_link}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              {downloadoverlay_download_label}
            </a>
          ) : (
            <>
              <div className="download-overlay__title">
                {downloadoverlay_title}
              </div>
              <Input
                id="download-course-package-input"
                label={downloadoverlay_input_label}
                type="email"
                required={true}
                onChange={(value, isValid) => {
                  setEmail(value);
                  setIsEmailValid(isValid);
                }}
                onEnter={() => {
                  submitForm();
                }}
              />
              <Button
                label={downloadoverlay_button_label}
                busy={isBusy}
                disabled={!isEmailValid}
                onClick={() => {
                  submitForm();
                }}
                variant="transparent-white"
              />
            </>
          )}
        </>
      </div>
    </div>
  );
}
