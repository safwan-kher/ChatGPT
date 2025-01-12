import api from "api";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import utils from "utils";
import { AppContext } from "../../pages/_app";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Input from "./Input";

export const ReskillHeader: FC<{ content: any; pipelineId: number }> = ({
  content,
  pipelineId,
}) => {
  const context = useContext(AppContext);
  const router = useRouter();
  const currentLanguage = router.locale;
  const [cookies] = useCookies();

  const [isBusy, setIsBusy] = useState(false);
  const [wasFormSent, setWasFormSent] = useState(false);
  const [hasInvalidFields, setHasInvalidFields] = useState(true);
  const [showRegisteredError, setShowRegisteredError] = useState(false);

  const submitForm = async () => {
    if (!hasInvalidFields) {
      setIsBusy(true);
      const customFields = {
        "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": context.isApplyFormVisible
          ? "ReSkill Application"
          : "ReSkill Corporate Support",
      };
      const userData = {
        fn: firstName,
        ln: lastName,
        em: email,
      };
      const customData = {};
      if (context.isApplyFormVisible) {
        (customFields as any).phone = phone;
        customFields["8a2d9fc96a0b7d037839d71aa4b3acc774c9b9c8"] = registered;
        (userData as any).ph = phone;
        (customData as any).registered = registered;
      } else if (context.isSupportFormVisible) {
        customFields["f394b2ce194ed31252ece2d2f515d094f54269ba"] = company;
        customFields["73a29c62459f7032284650a188459026b47b9ed6"] = support;
        (customData as any).company = company;
        (customData as any).support = support;
      }
      const pipeline = context.isSupportFormVisible ? pipelineId : 1;
      await api.addPerson(
        firstName,
        lastName,
        email,
        customFields,
        "ReSkill",
        pipeline
      );
      await api.trackFbEvent({
        eventName: "Decision Results",
        externalId: cookies.session,
        firstName: firstName as any,
        lastName: lastName as any,
        email: email as any,
        phone: context.isApplyFormVisible ? phone : null,
        customDataObj: customData,
      });
      setWasFormSent(true);
      setIsBusy(false);
    }
  };
  const wasAnsweredPositively = (str) => {
    return ["yes", "ja"].includes(str.toLowerCase());
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [registered, setRegistered] = useState(false);
  const [support, setSupport] = useState("");
  useEffect(() => {
    if (context.isApplyFormVisible) {
      setHasInvalidFields(!firstName || !lastName || !email || !registered);
    } else if (context.isSupportFormVisible) {
      setHasInvalidFields(
        !firstName || !lastName || !email || !company || !support
      );
    }
  }, [
    firstName,
    lastName,
    email,
    company,
    registered,
    support,
    context.isApplyFormVisible,
    context.isSupportFormVisible,
  ]);
  return (
    <header className="header-reskill">
      <div
        className="full-width-outer"
        style={{
          backgroundImage: `url(${content.image})`,
        }}
      >
        <div className="header-reskill__gradient">
          <div className="full-width-inner">
            <div className="row">
              <div className="col-1 col-0-sm" />
              <div className="col-10 col-12-sm">
                <div className="header-reskill__logo-wrapper">
                  <img
                    className="header-reskill__logo hide-on-mobile"
                    src={"/assets/reskill-logo-new.png"}
                    alt=""
                  />
                  <img
                    className="header-reskill__logo hide-on-desktop"
                    src={"/assets/reskill-logo-mobile-new.png"}
                    alt=""
                  />
                </div>
                <h1 className="header-reskill__title">{content.title}</h1>
                <p className="header-reskill__text">{content.text}</p>
                <div className="header-reskill__buttons">
                  <Button
                    label={content.button_2_label}
                    onClick={() => {
                      context.setIsSupportFormVisible(true);
                      const input = document.getElementById(
                        "reskill-form-input2"
                      );
                      if (input) {
                        input.focus();
                      }
                    }}
                    variant="transparent-blue-alt2"
                  />
                </div>
              </div>
              <div className="col-1 col-0-sm" />
            </div>
          </div>
        </div>
        <div
          className={`header-reskill__form__blocker${
            context.isApplyFormVisible
              ? " header-reskill__form__blocker--show"
              : ""
          }`}
        >
          <div className="header-reskill__form">
            <img
              className="header-reskill__form__close"
              src={"/assets/icons/close.svg"}
              alt=""
              onClick={() => {
                context.setIsApplyFormVisible(false);
              }}
            />
            {wasFormSent ? (
              <div
                className="header-reskill__form__text"
                dangerouslySetInnerHTML={{
                  __html: utils.cleanText(content.form_success_message, true),
                }}
              />
            ) : (
              <>
                <div className="header-reskill__form__text">
                  {content.form_text}
                </div>
                <div className="row">
                  <div className="col-6 col-12-sm">
                    <Input
                      label={content.form_first_name_label}
                      required
                      disabled={isBusy}
                      id="reskill-form-input"
                      onChange={(val, isValid) => {
                        setFirstName(isValid ? val : false);
                      }}
                    />
                  </div>
                  <div className="col-6 col-12-sm">
                    <Input
                      label={content.form_last_name_label}
                      required
                      disabled={isBusy}
                      onChange={(val, isValid) => {
                        setLastName(isValid ? val : false);
                      }}
                    />
                  </div>
                </div>
                <Input
                  label={content.form_email_label}
                  type="email"
                  required
                  disabled={isBusy}
                  onChange={(val, isValid) => {
                    setEmail(isValid ? val : false);
                  }}
                />
                <Input
                  label={content.form_phone_label}
                  disabled={isBusy}
                  onChange={(val, isValid) => {
                    setPhone(isValid ? val : false);
                  }}
                />
                <Dropdown
                  language={currentLanguage}
                  label={content.form_registered_input_label}
                  items={content.form_registered_items.map((item) => item.item)}
                  required={true}
                  disabled={isBusy}
                  onChange={(val, isValid) => {
                    const allGood = isValid && wasAnsweredPositively(val);
                    setRegistered(allGood ? val : false);
                    setShowRegisteredError(!allGood);
                  }}
                />
                {showRegisteredError && (
                  <div
                    className="header-reskill__form__error"
                    dangerouslySetInnerHTML={{
                      __html: utils.cleanText(
                        content.form_registered_error_message,
                        true
                      ),
                    }}
                  />
                )}
                <div className="header-reskill__form__button">
                  <Button
                    label={content.form_button_label}
                    onClick={() => {
                      submitForm();
                    }}
                    busy={isBusy}
                    disabled={hasInvalidFields}
                    variant="small transparent-blue-alt"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className={`header-reskill__form__blocker${
            context.isSupportFormVisible
              ? " header-reskill__form__blocker--show"
              : ""
          }`}
        >
          <div className="header-reskill__form">
            <img
              className="header-reskill__form__close"
              src={"/assets/icons/close.svg"}
              alt=""
              onClick={() => {
                context.setIsSupportFormVisible(false);
              }}
            />
            {wasFormSent ? (
              <div
                className="header-reskill__form__text"
                dangerouslySetInnerHTML={{
                  __html: utils.cleanText(content.form_success_message, true),
                }}
              />
            ) : (
              <>
                <div className="header-reskill__form__text">
                  {content.form_text}
                </div>
                <div className="row">
                  <div className="col-6 col-12-sm">
                    <Input
                      label={content.form_first_name_label}
                      required
                      disabled={isBusy}
                      id="reskill-form-input2"
                      onChange={(val, isValid) => {
                        setFirstName(isValid ? val : false);
                      }}
                    />
                  </div>
                  <div className="col-6 col-12-sm">
                    <Input
                      label={content.form_last_name_label}
                      required
                      disabled={isBusy}
                      onChange={(val, isValid) => {
                        setLastName(isValid ? val : false);
                      }}
                    />
                  </div>
                </div>
                <Input
                  label={content.form_email_label}
                  type="email"
                  required
                  disabled={isBusy}
                  onChange={(val, isValid) => {
                    setEmail(isValid ? val : false);
                  }}
                />
                <Input
                  label={content.form_company_label}
                  required={true}
                  disabled={isBusy}
                  onChange={(val, isValid) => {
                    setCompany(isValid ? val : false);
                  }}
                />
                <Dropdown
                  label={content.form_support_input_label}
                  items={content.form_support_items.map((item) => item.item)}
                  required={true}
                  disabled={isBusy}
                  onChange={(val, isValid) => {
                    setSupport(isValid ? val : false);
                  }}
                />
                <div className="header-reskill__form__button">
                  <Button
                    label={content.form_button_label}
                    onClick={() => {
                      submitForm();
                    }}
                    busy={isBusy}
                    disabled={hasInvalidFields}
                    variant="small transparent-blue-alt"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
