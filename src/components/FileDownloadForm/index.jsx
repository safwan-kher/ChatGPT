import React, { useState } from "react";

// Helper
import api from "api";

// Components
import Button from "components/Button";
import Input from "components/Input";
import { useCookies } from "react-cookie";
import { createPersonAndDeal } from "createPersonAndDeal";

// Styles

const FileDownloadForm = ({
  isVisible,
  setIsVisible,
  step1Title,
  step1InputLabel,
  step1ButtonText,
  step2LinkText,
  fileUrl,
  language,
  leadSource,
  pipelineId,
}) => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [cookies] = useCookies();

  const submitForm = async () => {
    if (isEmailValid) {
      window.ttq.track("SubmitForm");
      setIsBusy(true);
      const customFields = {
        "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": leadSource
          ? leadSource
          : "Download Course Package",
        dc0a286b9fe00ab025597776b38364624d981bb9:
          language === "de" ? "Deutsch" : "English",
      };
      const customData = {
        content_name: "File Download",
        file_url: fileUrl,
        language: language,
      };
      api.trackFbEvent({
        eventName: "Lead",
        externalId: cookies.session,
        email: email,
        customDataObj: customData,
      });

      await createPersonAndDeal({
        firstName: email,
        lastName: "",
        email: email,
        pipedriveStageId: pipelineId ? pipelineId : 8,
        customFields: customFields,
        courseName: leadSource,
      });

      setIsBusy(false);
      setIsDownloadReady(true);
    }
  };

  let className = "download-overlay__blocker";
  if (isVisible) {
    className += " download-overlay__blocker--show";
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
        {isDownloadReady ? (
          <a
            className="download-overlay__download"
            href={fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            {step2LinkText}
          </a>
        ) : (
          <>
            <div className="download-overlay__title">{step1Title}</div>
            <Input
              id="download-course-package-input"
              label={step1InputLabel}
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
              label={step1ButtonText}
              busy={isBusy}
              disabled={!isEmailValid}
              onClick={() => {
                submitForm();
              }}
              variant="transparent-white"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FileDownloadForm;
