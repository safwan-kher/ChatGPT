import React, { FC, useState } from "react";

// Components
import api from "../src/api";
import utils from "../src/utils";
import { IGetLayout } from "../src/components/DefaultLayout";
import { InferGetStaticPropsType, GetStaticProps } from "next";

import Input from "../src/components/Input";
import Dropdown from "../src/components/Dropdown";
import Checkbox from "../src/components/Checkbox";
import Button from "../src/components/Button";
import { getReferral } from "../src/components/ReferralWrapper";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { TelInput } from "../src/components/TelInput";

const ApplyNowPage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content }) => {
  const router = useRouter();
  const [cookies] = useCookies();

  const [state, setState] = useState({
    wasFormSent: false,
    isBusy: false,
    hasInvalidFields: true,
    showAgeError: false,
    campus: false,
    language: router.locale,
    first_name: "",
    last_name: "",
    registered: false,
    age: "",
    email: "",
    phone: "",
    city: "",
    referral: false,
    interest: false,
    earliestDate: false,
    consent: false,
    showRegisteredError: false,
  });

  const checkFormValidity = () => {
    const hasInvalidFields = [
      "campus",
      "language",
      "first_name",
      "last_name",
      "registered",
      "age",
      "email",
      "phone",
      "city",
      "referral",
      "interest",
      "earliestDate",
    ].some((key) => state[key] === false);
    setState((cur) => ({
      ...cur,
      hasInvalidFields,
    }));
  };

  const wasAnsweredPositively = (str) => {
    return ["yes", "ja"].includes(str.toLowerCase());
  };

  // Submit form to Pipedrive
  const submitForm = async () => {
    if (!state.hasInvalidFields) {
      setState((cur) => ({ ...cur, isBusy: true }));
      const first_name = state.first_name;
      const last_name = state.last_name;
      const email = state.email;
      const customFields = {
        "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": `Apply Now${getReferral(
          cookies["ref"]
        )}`,
        b43066ae82c7a041d90c15d192bec212599a55c3: state.campus,
        dc0a286b9fe00ab025597776b38364624d981bb9:
          state.language === "de" ? "Deutsch" : "English",
        "8a2d9fc96a0b7d037839d71aa4b3acc774c9b9c8": state.registered,
        "658c5427283dffb20a79af4c93abff499d8c6083": state.age,
        phone: state.phone,
        ff5cbb72cbacd4bd2a25faf31fd4cea46313b72a: state.city,
        "3c026432b11dd8fda78895fd33ae90b8d46edad3": state.referral,
        "9408128d84ee27ef18100c3cf19834b9f370a19f": state.earliestDate,
        ff8fcfd408c0714269993b513855617459da45d6: state.consent ? "Yes" : "No",
        "4c7f032479a698cac32406114330602b5802567f": state.interest,
      };

      const customData = {
        campus: state.campus,
        language: state.language === "de" ? "Deutsch" : "English",
        registered: state.registered,
        age: state.age,
        referral: state.referral,
        earliestDate: state.earliestDate,
      };

      api.trackFbEvent({
        eventName: "Lead",
        externalId: cookies["session"],
        firstName: first_name,
        lastName: last_name,
        email: email,
        phone: state.phone,
        city: state.city,
        customDataObj: customData,
      });

      await api.addPerson(
        first_name,
        last_name,
        email,
        customFields,
        "ApplyNow",
        1
      );

      setState((cur) => ({
        ...cur,
        isBusy: false,
        wasFormSent: true,
      }));
    }
  };

  const {
    applynow_title,
    applynow_text,
    applynow_campus_input_label,
    applynow_campus_items,
    applynow_language_input_label,
    applynow_language_items,
    applynow_first_name_input_label,
    applynow_last_name_input_label,
    applynow_registered_input_label,
    applynow_registered_items,
    applynow_age_input_label,
    applynow_email_input_label,
    applynow_phone_input_label,
    applynow_city_input_label,
    applynow_referral_input_label,
    applynow_referral_items,
    applynow_interest_input_label,
    applynow_interest_items,
    applynow_consent_input_label,
    applynow_button_label,
    applynow_message,
    applynow_earliest_starting_date_input_label,
    applynow_earliest_starting_date_items,
    registered_error_message,
  } = content;

  const {
    wasFormSent,
    isBusy,
    hasInvalidFields,
    showAgeError,
    showRegisteredError,
  } = state;

  return (
    <div className="apply-now-form slider-block slider-block-first-load">
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row">
            <div className="col-3 col-0-sm" />
            <div className="col-6 col-12-sm">
              <h1 className="apply-now-form__title slider">{applynow_title}</h1>
            </div>
            <div className="col-3 col-0-sm" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-2 col-0-sm" />
        <div className="col-8 col-12-sm">
          <div
            className="apply-now-form__form slider slider-delay-1"
            role="form"
          >
            <img
              className="apply-now-form__form__floater"
              src={"/assets/floaters/stairs4.png"}
              alt=""
            />
            <img
              className="apply-now-form__form__floater"
              src={"/assets/floaters/stairs-white4.png"}
              alt=""
            />
            <div className="apply-now-form__form__text">{applynow_text}</div>
            <Dropdown
              label={applynow_campus_input_label}
              items={applynow_campus_items.map((item) => item.item)}
              required={true}
              disabled={wasFormSent}
              onChange={(val, isValid) => {
                setState((cur) => ({
                  ...cur,
                  campus: isValid ? val : false,
                }));
                checkFormValidity();
              }}
            />
            <Dropdown
              label={applynow_interest_input_label}
              items={applynow_interest_items.map((item) => item.item)}
              required={true}
              disabled={wasFormSent}
              onChange={(val, isValid) => {
                setState((cur) => ({
                  ...cur,
                  interest: isValid ? val : false,
                }));
                checkFormValidity();
              }}
            />
            <Dropdown
              label={applynow_earliest_starting_date_input_label}
              items={applynow_earliest_starting_date_items.map(
                (item) => item.item
              )}
              required={true}
              disabled={wasFormSent}
              onChange={(val, isValid) => {
                setState((cur) => ({
                  ...cur,
                  earliestDate: isValid ? val : false,
                }));
                checkFormValidity();
              }}
            />
            <Dropdown
              label={applynow_language_input_label}
              items={applynow_language_items.map((item) => item.item)}
              required={true}
              disabled={wasFormSent}
              onChange={(val, isValid) => {
                setState((cur) => ({
                  ...cur,
                  language: isValid ? val : false,
                }));
                checkFormValidity();
              }}
            />
            <div className="row">
              <div className="col-6 col-12-sm">
                <Input
                  label={applynow_first_name_input_label}
                  required={true}
                  disabled={wasFormSent}
                  onChange={(val, isValid) => {
                    setState((cur) => ({
                      ...cur,
                      first_name: isValid ? val : false,
                    }));
                    checkFormValidity();
                  }}
                />
              </div>
              <div className="col-6 col-12-sm">
                <Input
                  label={applynow_last_name_input_label}
                  required={true}
                  disabled={wasFormSent}
                  onChange={(val, isValid) => {
                    setState((cur) => ({
                      ...cur,
                      last_name: isValid ? val : false,
                    }));
                    checkFormValidity();
                  }}
                />
              </div>
            </div>
            <Dropdown
              language={router.locale}
              label={applynow_registered_input_label}
              items={applynow_registered_items.map((item) => item.item)}
              required={true}
              disabled={wasFormSent}
              onChange={(val, isValid) => {
                const allGood = isValid && wasAnsweredPositively(val);

                setState((cur) => ({
                  ...cur,
                  registered: allGood ? val : false,
                  showRegisteredError: !allGood,
                }));
                checkFormValidity();
              }}
            />
            {showRegisteredError && (
              <div
                className="landing-page__hero__form__error"
                dangerouslySetInnerHTML={{
                  __html: utils.cleanText(registered_error_message, true),
                }}
              />
            )}
            <Input
              label={applynow_age_input_label}
              type="number"
              required={true}
              disabled={wasFormSent}
              minNum={18}
              onChange={(val, isValid, validate) => {
                const newState = {
                  age: isValid ? val : false,
                };
                if (validate || isValid) {
                  (newState as any).showAgeError = !isValid;
                }
                setState((cur) => ({ ...cur, ...newState }));
                checkFormValidity();
              }}
            />
            {showAgeError && (
              <div className="apply-now-form__form__error">
                {router.locale === "en"
                  ? "Applicants need to be 18 years or older"
                  : "Sie müssen 18 Jahre oder älter sein"}
              </div>
            )}
            <Input
              label={applynow_email_input_label}
              type="email"
              required={true}
              disabled={wasFormSent}
              onChange={(val, isValid) => {
                setState((cur) => ({
                  ...cur,
                  email: isValid ? val : false,
                }));
                checkFormValidity();
              }}
            />
            <TelInput
              id={"tel"}
              label={applynow_phone_input_label}
              required={true}
              disabled={wasFormSent}
              onChange={(val, isValid) => {
                setState((cur) => ({
                  ...cur,
                  phone: isValid ? `+49 ${val}` : false,
                }));
                checkFormValidity();
              }}
            />
            <Input
              label={applynow_city_input_label}
              required={true}
              disabled={wasFormSent}
              onChange={(val, isValid) => {
                setState((cur) => ({
                  ...cur,
                  city: isValid ? val : false,
                }));
                checkFormValidity();
              }}
            />
            <Dropdown
              label={applynow_referral_input_label}
              items={applynow_referral_items.map((item) => item.item)}
              required={true}
              disabled={wasFormSent}
              onChange={(val, isValid) => {
                setState((cur) => ({
                  ...cur,
                  referral: isValid ? val : false,
                }));
                checkFormValidity();
              }}
            />
            <div className="apply-now-form__form__checkboxes">
              <Checkbox
                label={applynow_consent_input_label}
                disabled={wasFormSent}
                onChange={(val) => {
                  setState((cur) => ({
                    ...cur,
                    consent: val,
                  }));
                  checkFormValidity();
                }}
              />
            </div>
            <div className="apply-now-form__form__button">
              {wasFormSent ? (
                <div className="apply-now-form__form__message">
                  {applynow_message}
                </div>
              ) : (
                <Button
                  busy={isBusy}
                  disabled={hasInvalidFields}
                  onClick={() => {
                    submitForm();
                  }}
                  label={applynow_button_label}
                  variant="transparent-blue-alt"
                />
              )}
            </div>
          </div>
        </div>
        <div className="col-2 col-0-sm" />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ content: any }> = async (
  context
) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  const slug = locale === "en" ? "apply-now" : "los-gehts";
  const content = (await api.getContent(slug, locale)) as any;
  return {
    props: {
      content: content.content,
      title: content.title,
      description: content.description,
      locale: context.locale,
    },
  };
};

export default ApplyNowPage;
