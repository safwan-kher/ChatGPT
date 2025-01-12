import React, { FC, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import LearnMore from "../src/components/LearnMore";
import Input from "../src/components/Input";
import Dropdown from "../src/components/Dropdown";
import Checkbox from "../src/components/Checkbox";
import Button from "../src/components/Button";
import BadgeTitle from "../src/components/BadgeTitle";
import { getReferral } from "../src/components/ReferralWrapper";

import api from "../src/api";
import utils from "../src/utils";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { IGetLayout } from "../src/components/DefaultLayout";
import { useRouter } from "next/router";
import ImageText from "../src/components/ImageText";
import ThreeColumnImage from "../src/components/ThreeColumnImage";
import Timeline from "../src/components/Timeline";
import {
  getSpeakAndTechPost,
  getSpeakAndTechPosts,
} from "../src/getSpeakAndTechPosts";
import PreFooterBlocks from "../src/components/PreFooterBlocks";
import { UltraLandingPage } from "../src/components/UltraLandingPage/UltraLandingPage";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { fetchAcf } from "./speak-and-tech";

const DynamicSpeakAndCodePost = dynamic(() =>
  import("../src/components/SpeakAndCodePost").then(
    (mod) => mod.SpeakAndCodePost
  )
);

const LandingPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({
  content,
  slug,
  locale,
  isLandingPage,
  alternativeLanguagePageSlug,
  isSpeakAndCodePost,
  studentTestimonials,
}) => {
  if (isLandingPage) {
    return (
      <UltraLandingPage
        content={content}
        alternativeLanguagePageSlug={alternativeLanguagePageSlug}
      />
    );
  }

  if (isSpeakAndCodePost) {
    return (
      <DynamicSpeakAndCodePost
        content={content}
        studentTestimonials={studentTestimonials}
      />
    );
  }

  const router = useRouter();
  const [cookies] = useCookies();
  const [state, setState] = useState({
    currentLanguage: router.locale,
    eficadsPixel: null,
    showEficadsPixel: false,
    convId: null,
    wasFormSent: false,
    isBusy: false,
    hasInvalidFields: true,
    showAgeError: false,
    showRegisteredError: false,
    campus: false,
    language: true,
    first_name: "false",
    last_name: "false",
    registered: false,
    jobcoach: false,
    age: false,
    email: "",
    phone: false,
    city: "",
    referral: false,
    earliestDate: false,
    commitment: false,
    internet: false,
    consent: false,
    isExtendedForm: false,
    webinarDate: false,
    ticketType: false,
  });
  const isPhoneRequired = ![
    "aa-jc-event-upcoming",
    "aa-jc-event-upcoming-2",
  ].includes(router.query.slug as string);
  useEffect(() => {
    const timestamp = +new Date();
    const utmSource = new URL(window.location.href).searchParams.get(
      "utm_source"
    );
    if (
      utmSource === "eficads" &&
      ["/de/landing-page", "/en/landing-page"].includes(
        window.location.pathname
      )
    ) {
      const rand = Math.round(Math.random() * 1000);
      const convId = `${timestamp}${rand}`;
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "Eficads Pixel",
        convId,
      });
      const imageSrc = `https://perf.af.funneldrivers.com/ts/i5543965/tsa?typ=i&tst=${timestamp}&trc=default&ctg=Leads&sid=&cid=${convId}&orv=6&orc=EUR`;
      setState((cur) => ({
        ...cur,
        convId,
        eficadsPixel: (
          <img
            src={imageSrc}
            alt="Tracking pixel"
            height="1"
            width="1"
            style={{ display: "none" }}
          />
        ),
      }));
    }

    if (window.location.pathname === "/en/landing-page") {
      (window as any).VIDEOASK_EMBED_CONFIG = {
        kind: "widget",
        url: "https://www.videoask.com/fln1gmhw7",
        options: {
          widgetType: "VideoThumbnailExtraLarge",
          text: "Hi there 👋🏽",
          backgroundColor: "#3206e2",
          position: "bottom-right",
          dismissable: false,
        },
      };
      const headTag = document.getElementsByTagName("head")[0];
      var s = document.createElement("script");
      s.src = "https://www.videoask.com/embed/embed.js";
      headTag.appendChild(s);
    }
  }, []);

  const checkFormValidity = () => {
    let hasInvalidFields = [
      "first_name",
      "last_name",
      "registered",
      "email",
      "phone",
    ];
    if (state.isExtendedForm) {
      hasInvalidFields = [
        ...hasInvalidFields,
        "campus",
        "language",
        "age",
        "city",
        "referral",
        "earliestDate",
        "commitment",
        "internet",
      ];
    }
    if (content.landingpage_jobcoach_input_label) {
      hasInvalidFields = [...hasInvalidFields, "jobcoach"];
    }
    if (content.date_dropdown_label) {
      hasInvalidFields = ["first_name", "last_name", "email", "webinarDate"];
    }

    if (
      content.webinar_form_phone_input_label &&
      content.ticket_type_dropdown_label
    ) {
      hasInvalidFields = [
        "first_name",
        "last_name",
        "email",
        "phone",
        "ticketType",
      ];
    }
    setState((cur) => ({
      ...cur,
      hasInvalidFields: hasInvalidFields.some((key) => state[key] === false),
    }));
  };

  // Submit form to Pipedrive
  const wasAnsweredPositively = (str) => {
    return ["yes", "ja"].includes(str.toLowerCase());
  };

  const submitForm = () => {
    if (!state.hasInvalidFields) {
      const tiktokEvent = content.date_dropdown_label
        ? "Registration"
        : "SubmitForm";
      (window as any).ttq.track(tiktokEvent);
      setState((cur) => ({ ...cur, isBusy: true }));
      const first_name = state.first_name;
      const last_name = state.last_name;
      const landingPage = utils
        .landingPageSlugs(false)
        .find((landingPage) => landingPage.slug === slug);
      const email = state.email;
      let customFields: any = {
        "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": `${
          landingPage?.label || slug
        }${getReferral(cookies["ref"])}`,
        "8a2d9fc96a0b7d037839d71aa4b3acc774c9b9c8": state.registered,
        phone: state.phone,
        ff8fcfd408c0714269993b513855617459da45d6: state.consent ? "Yes" : "No",
      };
      if (state.isExtendedForm) {
        customFields["b43066ae82c7a041d90c15d192bec212599a55c3"] = state.campus;
        customFields["dc0a286b9fe00ab025597776b38364624d981bb9"] = locale;
        customFields["658c5427283dffb20a79af4c93abff499d8c6083"] = state.age;
        customFields["ff5cbb72cbacd4bd2a25faf31fd4cea46313b72a"] = state.city;
        customFields["3c026432b11dd8fda78895fd33ae90b8d46edad3"] =
          state.referral;
        customFields["9408128d84ee27ef18100c3cf19834b9f370a19f"] =
          state.earliestDate;
        customFields["7422b1af641c6d5fe50bbfe2a2a4a09b6f7f36ca"] =
          state.commitment;
        customFields["dcc1d23cec7811422298af1eb53258ccb0f97ef9"] =
          state.internet;
      } else {
        customFields["dc0a286b9fe00ab025597776b38364624d981bb9"] =
          state.currentLanguage === "de" ? "Deutsch" : "English";
      }
      if (content.landingpage_jobcoach_input_label) {
        customFields[
          "3c026432b11dd8fda78895fd33ae90b8d46edad3"
        ] = `JobCoach - ${state.jobcoach}`;
      }

      let showEficadsPixel = false;
      if (
        state.convId &&
        wasAnsweredPositively(state.registered) &&
        wasAnsweredPositively(state.commitment) &&
        wasAnsweredPositively(state.internet)
      ) {
        showEficadsPixel = true;
        customFields["54c549a35462af1013ec25ccdc64625aadffe99f"] = state.convId;
      }
      const userData: any = {
        fn: first_name,
        ln: last_name,
        em: email,
        ph: state.phone,
      };
      const customData: any = {
        registered: state.registered,
      };
      if (state.isExtendedForm) {
        userData.ct = state.city;
        customData.campus = state.campus;
        customData.language = locale === "de" ? "Deutsch" : "English";
        customData.age = state.age;
        customData.earliestDate = state.earliestDate;
        customData.referral = state.referral;
        customData.commitment = state.commitment;
        customData.internet = state.internet;
      }

      if (content.date_dropdown_label) {
        delete customData.registered;
        customFields = {
          "8cbaebfb84deca2ab3f762c3544a6aa4647d36b7": state.webinarDate,
          "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": content.lead_source
            ? `${content.lead_source}${getReferral(cookies["ref"])}`
            : `Webinar Signup${getReferral(cookies["ref"])}`,
          phone: state.phone,
          ff8fcfd408c0714269993b513855617459da45d6: state.consent
            ? "Yes"
            : "No",
          first_name: state.first_name,
          last_name: state.last_name,
          dc0a286b9fe00ab025597776b38364624d981bb9:
            router.locale === "de" ? "Deutsch" : "English",
        };
      }

      if (content.webinar_form_phone_input_label) {
        delete customData.registered;
        customFields = {
          "8cbaebfb84deca2ab3f762c3544a6aa4647d36b7": state.webinarDate,
          "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": content.lead_source
            ? `${content.lead_source}${getReferral(cookies["ref"])}`
            : `Webinar Signup${getReferral(cookies["ref"])}`,
          phone: state.phone,
          ff8fcfd408c0714269993b513855617459da45d6: state.consent
            ? "Yes"
            : "No",
          first_name: state.first_name,
          last_name: state.last_name,
          dc0a286b9fe00ab025597776b38364624d981bb9:
            router.locale === "de" ? "Deutsch" : "English",
        };
      }

      if (content.ticket_type_dropdown_label) {
        customFields["52234b4b01246fcb183fcf6fdbb082f747774cda"] =
          state.ticketType;
      }

      const event = content.date_dropdown_label
        ? "Complete Registration"
        : "Lead";
      const stageId = content.stage_id
        ? Number(content.stage_id)
        : content.date_dropdown_label
        ? 42
        : false;

      api.trackFbEvent({
        eventName: event,
        externalId: cookies["session"],
        firstName: first_name,
        lastName: last_name,
        email: email,
        phone: content.date_dropdown_label ? null : state.phone,
        customDataObj: customData,
      });

      api.addPerson(
        first_name,
        last_name,
        email,
        customFields,
        "LandingPage",
        stageId as any
      );

      setState((cur) => ({
        ...cur,
        isBusy: false,
        wasFormSent: true,
        showEficadsPixel,
      }));
    }
  };

  const showInputIfNotWebinarOrTicket = () => {
    if (content.date_dropdown_label) {
      return false;
    } else if (content.webinar_form_phone_input_label) {
      return false;
    } else {
      return true;
    }
  };

  const {
    landingpage_title,
    landingpage_badge,
    landingpage_text,
    landingpage_form_text,
    landingpage_campus_input_label,
    landingpage_campus_items,
    landingpage_language_input_label,
    landingpage_language_items,
    landingpage_first_name_input_label,
    landingpage_last_name_input_label,
    landingpage_registered_input_label,
    landingpage_registered_items,
    landingpage_registered_error_message,
    landingpage_jobcoach_input_label,
    landingpage_age_input_label,
    landingpage_age_minimum,
    landingpage_email_input_label,
    landingpage_phone_input_label,
    landingpage_city_input_label,
    landingpage_referral_input_label,
    landingpage_referral_items,
    landingpage_commitment_input_label,
    landingpage_commitment_items,
    landingpage_internet_input_label,
    landingpage_internet_items,
    landingpage_consent_input_label,
    landingpage_button_label,
    landingpage_message,
    landingpage_partners_title,
    landingpage_partners_items,
    landingpage_earliest_starting_date_input_label,
    landingpage_earliest_starting_date_items,
    learn_title,
    learn_text,
    learn_items,
    learn_button_label,
    learn_button_link,
    date_dropdown_label,
    date_dropdown_options,
  } = content;
  const {
    eficadsPixel,
    showEficadsPixel,
    wasFormSent,
    isBusy,
    hasInvalidFields,
    showAgeError,
    showRegisteredError,
    currentLanguage,
  } = state;

  const partners = [];
  landingpage_partners_items?.forEach((item, index) => {
    partners.push(
      <div className="col-3 col-6-sm" key={index}>
        <div className="landing-page__partners__images__item">
          <img src={item.image} alt={item.name} />
        </div>
      </div>
    );
  });

  return (
    <div className="landing-page">
      <div className="landing-page__hero slider-block slider-block-first-load">
        <div className="full-width-outer">
          <div className="full-width-inner">
            <div className="row">
              <div className="col-1 col-0-sm" />
              <div className="col-5 col-12-sm">
                <div className="landing-page__hero__content slider">
                  <BadgeTitle
                    title={landingpage_title}
                    badge={landingpage_badge}
                  />
                  <div
                    className="landing-page__hero__content__text"
                    dangerouslySetInnerHTML={{
                      __html: utils.cleanText(landingpage_text, true),
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-5 col-12-sm">
                <div
                  className="landing-page__hero__form slider slider-delay-1"
                  role="form"
                >
                  <img
                    className="landing-page__hero__form__floater"
                    src={"/assets/floaters/stairs.png"}
                    alt=""
                  />
                  <img
                    className="landing-page__hero__form__floater"
                    src={"/assets/floaters/cube.png"}
                    alt=""
                  />
                  <img
                    className="landing-page__hero__form__floater"
                    src={"/assets/floaters/stairs-white4.png"}
                    alt=""
                  />
                  <div className="landing-page__hero__form__text">
                    {landingpage_form_text}
                  </div>
                  {landingpage_campus_items && (
                    <Dropdown
                      label={landingpage_campus_input_label}
                      items={landingpage_campus_items.map((item) => item.item)}
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
                  )}
                  {landingpage_earliest_starting_date_items && (
                    <Dropdown
                      label={landingpage_earliest_starting_date_input_label}
                      items={landingpage_earliest_starting_date_items.map(
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
                  )}
                  {landingpage_language_items && (
                    <Dropdown
                      label={landingpage_language_input_label}
                      items={landingpage_language_items.map(
                        (item) => item.item
                      )}
                      value={
                        landingpage_language_items[
                          currentLanguage === "en" ? 0 : 1
                        ].item
                      }
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
                  )}
                  <div className="row">
                    <div className="col-6 col-12-sm">
                      <Input
                        label={landingpage_first_name_input_label}
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
                        label={landingpage_last_name_input_label}
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
                  {showInputIfNotWebinarOrTicket() && (
                    <Dropdown
                      language={router.locale}
                      label={landingpage_registered_input_label}
                      items={landingpage_registered_items.map(
                        (item) => item.item
                      )}
                      required={true}
                      disabled={wasFormSent}
                      onChange={(val, isValid) => {
                        const allGood = isValid && wasAnsweredPositively(val);
                        setState((cur) => ({
                          ...cur,
                          registered: allGood ? val : false,
                          showRegisteredErr: !allGood,
                        }));
                        checkFormValidity();
                      }}
                    />
                  )}
                  {showRegisteredError && (
                    <div
                      className="landing-page__hero__form__error"
                      dangerouslySetInnerHTML={{
                        __html: utils.cleanText(
                          landingpage_registered_error_message,
                          true
                        ),
                      }}
                    />
                  )}
                  {landingpage_jobcoach_input_label && (
                    <Input
                      label={landingpage_jobcoach_input_label}
                      required={true}
                      disabled={wasFormSent}
                      onChange={(val, isValid, validate) => {
                        setState((cur) => ({
                          ...cur,
                          jobcoach: isValid ? val : false,
                        }));
                        checkFormValidity();
                      }}
                    />
                  )}
                  {landingpage_age_input_label && (
                    <Input
                      label={landingpage_age_input_label}
                      type="number"
                      required={true}
                      disabled={wasFormSent}
                      minNum={landingpage_age_minimum}
                      onChange={(val, isValid, validate) => {
                        const newState: any = {
                          age: isValid ? val : false,
                        };
                        if (validate || isValid) {
                          newState.showAgeError = !isValid;
                        }
                        setState((cur) => ({ ...cur, ...newState }));
                        checkFormValidity();
                      }}
                    />
                  )}
                  {showAgeError && (
                    <div className="landing-page__hero__form__error">
                      {router.locale === "en"
                        ? `Applicants need to be ${landingpage_age_minimum} years or older`
                        : `Sie müssen ${landingpage_age_minimum} Jahre oder älter sein`}
                    </div>
                  )}
                  <Input
                    label={landingpage_email_input_label}
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
                  {showInputIfNotWebinarOrTicket() && (
                    <Input
                      label={landingpage_phone_input_label}
                      required={isPhoneRequired}
                      disabled={wasFormSent}
                      onChange={(val, isValid) => {
                        setState((cur) => ({
                          ...cur,
                          phone: isValid ? val : false,
                        }));
                        checkFormValidity();
                      }}
                    />
                  )}
                  {content.webinar_form_phone_input_label && (
                    <Input
                      label={content.webinar_form_phone_input_label}
                      required={isPhoneRequired}
                      disabled={wasFormSent}
                      onChange={(val, isValid) => {
                        setState((cur) => ({
                          ...cur,
                          phone: isValid ? val : false,
                        }));
                        checkFormValidity();
                      }}
                    />
                  )}
                  {landingpage_city_input_label && (
                    <Input
                      label={landingpage_city_input_label}
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
                  )}
                  {landingpage_referral_items && (
                    <Dropdown
                      label={landingpage_referral_input_label}
                      items={landingpage_referral_items.map(
                        (item) => item.item
                      )}
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
                  )}
                  {date_dropdown_label && (
                    <Dropdown
                      label={date_dropdown_label}
                      items={date_dropdown_options.map((item) => item.option)}
                      required={true}
                      disabled={wasFormSent}
                      onChange={(val, isValid) => {
                        setState((cur) => ({
                          ...cur,
                          webinarDate: isValid ? val : false,
                        }));
                        checkFormValidity();
                      }}
                    />
                  )}
                  {content.ticket_type_dropdown_label && (
                    <Dropdown
                      label={content.ticket_type_dropdown_label}
                      items={content.ticket_type_dropdown_options.map(
                        (item) => item.option
                      )}
                      required={true}
                      disabled={wasFormSent}
                      onChange={(val, isValid) => {
                        setState((cur) => ({
                          ...cur,
                          ticketType: isValid ? val : false,
                        }));
                        checkFormValidity();
                      }}
                    />
                  )}
                  {landingpage_commitment_items && (
                    <Dropdown
                      label={landingpage_commitment_input_label}
                      items={landingpage_commitment_items.map(
                        (item) => item.item
                      )}
                      required={true}
                      disabled={wasFormSent}
                      onChange={(val, isValid) => {
                        setState((cur) => ({
                          ...cur,
                          commitment: isValid ? val : false,
                        }));
                        checkFormValidity();
                      }}
                    />
                  )}
                  {landingpage_internet_items && (
                    <Dropdown
                      label={landingpage_internet_input_label}
                      items={landingpage_internet_items.map(
                        (item) => item.item
                      )}
                      required={true}
                      disabled={wasFormSent}
                      onChange={(val, isValid) => {
                        setState((cur) => ({
                          ...cur,
                          internet: isValid ? val : false,
                        }));
                        checkFormValidity();
                      }}
                    />
                  )}
                  <div className="landing-page__hero__form__checkboxes">
                    <Checkbox
                      label={landingpage_consent_input_label}
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
                  <div className="landing-page__hero__form__button">
                    {wasFormSent ? (
                      <div className="landing-page__hero__form__message">
                        {landingpage_message}
                        {showEficadsPixel && eficadsPixel}
                      </div>
                    ) : (
                      <Button
                        busy={isBusy}
                        disabled={hasInvalidFields}
                        onClick={() => {
                          submitForm();
                        }}
                        label={landingpage_button_label}
                        variant="transparent-blue-alt"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-1 col-0-sm" />
            </div>
          </div>
        </div>
      </div>
      {content.imagetext_title && (
        <ImageText
          title={content.imagetext_title}
          text={content.imagetext_text}
          image={content.imagetext_image}
        />
      )}

      {content.threecolumnimage_title && (
        <ThreeColumnImage
          title={content.threecolumnimage_title}
          text={content.threecolumnimage_text}
          items={content.threecolumnimage_items}
        />
      )}

      <div className="landing-page__partners slider-block">
        <div className="row">
          <div className="col-2 col-0-sm" />
          <div className="col-8 col-12-sm slider">
            <h2 className="landing-page__partners__title">
              {landingpage_partners_title}
            </h2>
            <div className="landing-page__partners__images">
              <div className="row">{partners}</div>
            </div>
          </div>
          <div className="col-2 col-0-sm" />
        </div>
      </div>

      {content.learn_button_link && (
        <LearnMore
          title={learn_title}
          text={learn_text}
          items={learn_items}
          buttonLabel={learn_button_label}
          buttonLink={learn_button_link}
          isLandingPage={true}
        />
      )}

      {content.timeline_title && (
        <Timeline
          title={content.timeline_title}
          text={content.timeline_text}
          items={content.timeline_items}
        />
      )}

      {content.prefooterblocks_title_left && (
        <PreFooterBlocks
          titleLeft={content.prefooterblocks_title_left}
          textLeft={content.prefooterblocks_text_left}
          textButtonLinkLeft={() => {
            router.push(content.prefooterblocks_button_left_link);
          }}
          textButtonLabelLeft={content.prefooterblocks_button_label_left}
          titleRight={content.prefooterblocks_title_right}
          textRight={content.prefooterblocks_text_right}
          textButtonLinkRight={() => {
            router.push(content.prefooterblocks_button_right_link);
          }}
          textButtonLabelRight={content.prefooterblocks_button_label_right}
        />
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const landingPages = utils.landingPageSlugs(false);
  const englishLandingPageSlugs = await api.getLandingPages("en");
  const germanLandingPageSlugs = await api.getLandingPages("de");
  const englishSpeakAndTechSlugs = await getSpeakAndTechPosts("en");

  return {
    paths: landingPages
      .map((landingPage) => ({
        params: {
          slug: landingPage.slug,
        },
        locale: landingPage.language,
      }))
      .concat(
        englishLandingPageSlugs.map((englishSlug) => ({
          params: { slug: englishSlug },
          locale: "en",
        }))
      )
      .concat(
        germanLandingPageSlugs.map((germanSlug) => ({
          params: { slug: germanSlug },
          locale: "de",
        }))
      )
      .concat(
        englishSpeakAndTechSlugs.map((englishSlug) => ({
          params: { slug: englishSlug },
          locale: "en",
        }))
      ),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  content: any;
  slug: string;
  locale: string;
  isLandingPage?: boolean;
  isSpeakAndCodePost?: boolean;
  alternativeLanguagePageSlug?: string;
  studentTestimonials?: any;
}> = async (props) => {
  const locale = props.locale === "default" ? "de" : props.locale;
  try {
    const content = (await api.getContent(
      props.params.slug as string,
      locale
    )) as any;
    return {
      props: {
        content: content.content,
        slug: props.params.slug as string,
        locale: locale,
        title: content.title,
        description: content.description,
      },
    };
  } catch (err) {
    try {
      const content = await api.getLandingPage(
        props.params.slug as string,
        locale
      );
      return {
        props: {
          isLandingPage: true,
          alternativeLanguagePageSlug:
            content.acf.alternative_language_page_slug,
          content: content.acf || null,
          slug: props.params.slug as string,
          title: content.title.rendered,
          description: utils.cleanText(content.content.rendered, true, true),
          locale: locale,
        },
      };
    } catch (err) {
      try {
        const content = await getSpeakAndTechPost(
          locale as string,
          props?.params?.slug as string
        );
        const studentTestimonials = await fetchAcf(
          "landing-page-compass-orientate-train-get-hired-tech",
          locale as any
        );
        return {
          props: {
            isSpeakAndCodePost: true,
            isLandingPage: false,
            content: content.acf || null,
            slug: props?.params?.slug as string,
            title: content.title.rendered,
            description: utils.cleanText(content.content.rendered, true, true),
            locale: locale,
            studentTestimonials,
          },
        };
      } catch {
        return { notFound: true };
      }
    }
  }
};

export default LandingPage;
