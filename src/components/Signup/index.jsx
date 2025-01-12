import React, { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";

// Helper
import api from "api";

// Components
import Input from "components/Input";
import Checkbox from "components/Checkbox";
import Button from "components/Button";
import FileDownloadForm from "components/FileDownloadForm";
import { getReferral } from "components/ReferralWrapper";
import { AppContext } from "../../../pages/_app";
import { CoursePackageDownloadForm } from "components/CoursePackageDownloadForm";

export default function Signup(props) {
  const context = useContext(AppContext);
  const router = useRouter();
  const currentLanguage = router.locale;
  // const currentLanguage = useLocation().pathname.split('/')[1] || 'en';
  const {
    title,
    firstNameInputLabel,
    lastNameInputLabel,
    emailInputLabel,
    phoneInputLabel,
    checkboxLabelJobCenter,
    checkboxLabelTermsPre,
    checkboxLabelTermsLink,
    checkboxLabelTermsLinkLabel,
    checkboxLabelTermsPost,
    checkboxLabelConsent,
    buttonLabel,
    block1Title,
    block1ButtonLabel,
    block2Title,
    block2ButtonLabel,
    message,
    fileUrl,
    language,
    step1Title,
    step1InputLabel,
    step1ButtonText,
    step2LinkText,
    leadSource,
    pipelineId,
  } = props;

  const [firstName, setFirstName] = useState(false);
  const [lastName, setLastName] = useState(false);
  const [email, setEmail] = useState(false);
  const [phone, setPhone] = useState(false);
  const [jobcenter, setJobcenter] = useState(false);
  const [terms, setTerms] = useState(false);
  const [consent, setConsent] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [hasInvalidFields, setHasInvalidFields] = useState(true);
  const [wasFormSent, setWasFormSent] = useState(false);
  const [fileDownloadFormIsOpen, setFileDownloadFormIsOpen] = useState(false);
  const [cookies] = useCookies();

  useEffect(() => {
    const hasInvalidFields =
      firstName === false ||
      lastName === false ||
      email === false ||
      jobcenter === false ||
      terms === false;
    setHasInvalidFields(hasInvalidFields);
  }, [firstName, lastName, email, jobcenter, terms]);

  // Submit form to Pipedrive
  const submitForm = () => {
    if (!hasInvalidFields) {
      window.ttq.track("SubmitForm");
      setIsBusy(false);
      setWasFormSent(true);
      const customFields = {
        "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": `I am interested${getReferral(
          cookies.ref
        )}`,
        dc0a286b9fe00ab025597776b38364624d981bb9:
          currentLanguage === "de" ? "Deutsch" : "English",
        phone,
        "8a2d9fc96a0b7d037839d71aa4b3acc774c9b9c8": jobcenter ? "Yes" : "No",
        ff8fcfd408c0714269993b513855617459da45d6: consent ? "Yes" : "No",
      };

      const customData = {
        language: currentLanguage === "de" ? "Deutsch" : "English",
        registered: jobcenter ? "Yes" : "No",
      };

      api.trackFbEvent({
        eventName: "Lead",
        externalId: cookies.session,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        customDataObj: customData,
      });

      api.addPerson(firstName, lastName, email, customFields, "Signup", 1);
    }
  };

  const checkboxLabelTerms = `${checkboxLabelTermsPre} <a href="${checkboxLabelTermsLink}" target="_blank">${checkboxLabelTermsLinkLabel}</a> ${checkboxLabelTermsPost}`;
  return (
    <div className="sign-up slider-block">
      <Head>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </Head>
      <Script src="https://assets.calendly.com/assets/external/widget.js" />

      <CoursePackageDownloadForm
        close={() => setFileDownloadFormIsOpen(false)}
        isOpen={fileDownloadFormIsOpen}
        leadSource={leadSource}
        fileUrl={fileUrl}
        pipelineId={String(pipelineId)}
        linkText={step2LinkText}
      />
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row">
            <div className="col-1 col-0-sm" />
            <div className="col-5 col-12-sm sign-up__block-wrapper">
              <div className="sign-up__button-block slider slider-delay-1">
                <img
                  className="sign-up__button-block__image"
                  src={"/assets/book.png"}
                  alt=""
                />
                <div className="sign-up__button-block__inner">
                  <div className="sign-up__button-block__title">
                    {block1Title}
                  </div>
                  <div className="sign-up__button-block__button">
                    <Button
                      label={block1ButtonLabel}
                      onClick={
                        fileUrl
                          ? () => setFileDownloadFormIsOpen(true)
                          : () => {
                              context.setIsDownloadOverlayVisible(true);
                            }
                      }
                      variant="transparent-white"
                    />
                  </div>
                </div>
              </div>
              <div className="sign-up__button-block slider slider-delay-2">
                <img
                  className="sign-up__button-block__image"
                  src={"/assets/chat.png"}
                  alt=""
                />
                <div className="sign-up__button-block__inner">
                  <div className="sign-up__button-block__title">
                    {block2Title}
                  </div>
                  <div className="sign-up__button-block__button">
                    <Button
                      label={block2ButtonLabel}
                      onClick={() => {
                        window.Calendly.initPopupWidget({
                          url: "https://calendly.com/d/crr-xxj-qhs/let-s-chat-startsteps",
                        });
                      }}
                      variant="transparent-white"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4 col-12-sm slider" role="form">
              <div className="sign-up__floater-wrapper">
                <img
                  className="sign-up__floater"
                  src={"/assets/floaters/bolt.png"}
                  alt=""
                />
              </div>
              <h2 className="sign-up__title">{title}</h2>
              <div className="row">
                <div className="col-6 col-12-sm">
                  <Input
                    label={firstNameInputLabel}
                    required={true}
                    disabled={wasFormSent}
                    onChange={(val, isValid) => {
                      setFirstName(isValid ? val : false);
                    }}
                  />
                </div>
                <div className="col-6 col-12-sm">
                  <Input
                    label={lastNameInputLabel}
                    required={true}
                    disabled={wasFormSent}
                    onChange={(val, isValid) => {
                      setLastName(isValid ? val : false);
                    }}
                  />
                </div>
              </div>
              <Input
                label={emailInputLabel}
                type="email"
                required={true}
                disabled={wasFormSent}
                onChange={(val, isValid) => {
                  setEmail(isValid ? val : false);
                }}
              />
              <Input
                label={phoneInputLabel}
                disabled={wasFormSent}
                onChange={(val, isValid) => {
                  setPhone(isValid ? val : false);
                }}
              />
              <div className="sign-up__checkboxes">
                <Checkbox
                  label={checkboxLabelJobCenter}
                  disabled={wasFormSent}
                  onChange={(val) => {
                    setJobcenter(val);
                  }}
                />
                <Checkbox
                  label={checkboxLabelTerms}
                  disabled={wasFormSent}
                  onChange={(val) => {
                    setTerms(val);
                  }}
                />
                <Checkbox
                  label={checkboxLabelConsent}
                  disabled={wasFormSent}
                  onChange={(val) => {
                    setConsent(val);
                  }}
                />
              </div>
              <div className="sign-up__button">
                {wasFormSent ? (
                  <div className="sign-up__message">{message}</div>
                ) : (
                  <Button
                    busy={isBusy}
                    disabled={hasInvalidFields}
                    onClick={() => {
                      submitForm();
                    }}
                    label={buttonLabel}
                    variant="transparent-blue-alt"
                  />
                )}
              </div>
            </div>
            <div className="col-1 col-0-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
