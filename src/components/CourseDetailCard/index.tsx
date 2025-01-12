import React, { Fragment } from "react";

import utils from "utils";
import { useRouter } from "next/router";

import { PortalWithState } from "react-portal";
import { useForm, SubmitHandler } from "react-hook-form";

import { Dropdown, Input } from "../Form";
import { PhoneInput } from "../OrientationHeader";
import api from "../../api";
import { useCookies } from "react-cookie";
import { getReferral } from "components/ReferralWrapper";

type FormData = {
  firstName: string;
  lastName: string;
  registered: string;
  message: string;
  city: string;
  email: string;
  phone: string;
};

const CourseDetailCard = ({ course, logo, bootcamp_name, language }) => {
  const router = useRouter();
  const locale = router.locale === "en" ? "en" : "de";
  const i18n = {
    formText: {
      en: "Complete this application form and we will contact you regarding the next steps.",
      de: "Fülle dieses Anmeldeformular aus und wir werden dich bezüglich nächster Schritte kontaktieren.",
    },
    formFirstNameLabel: {
      en: "First name*",
      de: "Vorname*",
    },
    formLastNameLabel: {
      en: "Last name*",
      de: "Nachname*",
    },
    formEmailLabel: {
      en: "Email*",
      de: "E-Mail*",
    },
    formPhoneLabel: {
      en: "Phone*",
      de: "Handynummer*",
    },
    formButtonLabel: {
      en: "Request more info",
      de: "Formular absenden",
    },
    formMessageLabel: {
      en: "What is your current situation?*",
      de: "Wie ist dein aktueller Status?*",
    },
    formMessageOptions: {
      en: [
        { item: "I am currently employed", value: "Employed" },
        { item: "I am looking for a job", value: "Looking for a job" },
        {
          item: "I am looking for a training program",
          value: "Looking for a training program",
        },
        {
          item: "I recently graduated from my studies",
          value: "Recent graduate",
        },
        { item: "I am a currently a student", value: "Student" },
      ],
      de: [
        { item: "Ich bin angestellt", value: "Employed" },
        {
          item: "Ich bin auf der Suche nach einem Job",
          value: "Looking for a job",
        },
        {
          item: "Ich bin auf der Suche nach einem Kursprogramm",
          value: "Looking for a training program",
        },
        {
          item: "Ich habe vor kurzem mein Studium abgeschlossen",
          value: "Recent graduate",
        },
        { item: "Ich bin derzeit Student", value: "Student" },
      ],
    },
    formRegisteredLabel: {
      en: "Are you currently registered as unemployed with the Agentur für Arbeit or Jobcenter?*",
      de: "Bist du beim Jobcenter oder der Agentur für Arbeit als arbeitssuchend gemeldet?*",
    },
    formRegisteredTooltip: {
      en: "You are currently (or will soon be) unemployed & are officially registered in Germany (not with a student visa).",
      de: "Du bist im Moment oder demnächst arbeitslos & offiziell in Deutschland gemeldet (kein Student).",
    },
    formRegisteredOptions: {
      en: [
        {
          item: "Yes, I am currently unemployed & registered.",
          value: "Unemployed and registered",
        },
        {
          item: "Soon, I am currently employed but facing the possibility of unemployment.",
          value: "Facing the possibility of unemployment",
        },
        {
          item: "No, I am not registered.",
          value: "Not registered",
        },
      ],
      de: [
        {
          item: "Ja, ich bin derzeit arbeitslos und gemeldet.",
          value: "Unemployed and registered",
        },
        {
          item: "Bald, ich bin derzeit erwerbstätig, aber es besteht die Möglichkeit, dass ich arbeitslos werde.",
          value: "Facing the possibility of unemployment",
        },
        {
          item: "Nein, ich bin nicht gemeldet.",
          value: "Not registered",
        },
      ],
    },
    formCityLabel: {
      en: "Which state in Germany (Bundesland) do you currently live in?*",
      de: "In welchem Bundesland wohnst du?*",
    },
    formCityOptions: {
      en: [
        {
          item: "Baden-Württemberg",
          value: "Baden-Württemberg",
        },
        {
          item: "Bayern",
          value: "Bayern",
        },
        {
          item: "Berlin",
          value: "Berlin",
        },
        {
          item: "Brandenburg",
          value: "Brandenburg",
        },
        {
          item: "Bremen",
          value: "Bremen",
        },
        {
          item: "Hamburg",
          value: "Hamburg",
        },
        {
          item: "Hessen",
          value: "Hessen",
        },
        {
          item: "Mecklenburg-Vorpommern",
          value: "Mecklenburg-Vorpommern",
        },
        {
          item: "Niedersachsen",
          value: "Niedersachsen",
        },
        {
          item: "Nordrhein-Westfalen",
          value: "Nordrhein-Westfalen",
        },
        {
          item: "Rheinland-Pfalz",
          value: "Rheinland-Pfalz",
        },
        {
          item: "Saarland",
          value: "Saarland",
        },
        {
          item: "Sachsen",
          value: "Sachsen",
        },
        {
          item: "Sachsen-Anhalt",
          value: "Sachsen-Anhalt",
        },
        {
          item: "Schleswig-Holstein",
          value: "Schleswig-Holstein",
        },
        {
          item: "Thüringen",
          value: "Thüringen",
        },
      ],
      de: [
        {
          item: "Baden-Württemberg",
          value: "Baden-Württemberg",
        },
        {
          item: "Bayern",
          value: "Bayern",
        },
        {
          item: "Berlin",
          value: "Berlin",
        },
        {
          item: "Brandenburg",
          value: "Brandenburg",
        },
        {
          item: "Bremen",
          value: "Bremen",
        },
        {
          item: "Hamburg",
          value: "Hamburg",
        },
        {
          item: "Hessen",
          value: "Hessen",
        },
        {
          item: "Mecklenburg-Vorpommern",
          value: "Mecklenburg-Vorpommern",
        },
        {
          item: "Niedersachsen",
          value: "Niedersachsen",
        },
        {
          item: "Nordrhein-Westfalen",
          value: "Nordrhein-Westfalen",
        },
        {
          item: "Rheinland-Pfalz",
          value: "Rheinland-Pfalz",
        },
        {
          item: "Saarland",
          value: "Saarland",
        },
        {
          item: "Sachsen",
          value: "Sachsen",
        },
        {
          item: "Sachsen-Anhalt",
          value: "Sachsen-Anhalt",
        },
        {
          item: "Schleswig-Holstein",
          value: "Schleswig-Holstein",
        },
        {
          item: "Thüringen",
          value: "Thüringen",
        },
      ],
    },
    formDisclaimer: {
      en: "Your contact information will be shared with [BOOTCAMP] so they can reach out to you with the next steps. You may get an email, a text message or a phone call so they can provide more course information.",
      de: "Deine Kontaktinformationen werden mit [BOOTCAMP] geteilt, damit sie sich mit den nächsten Schritten an dich wenden können. Du kannst eine E-Mail, eine Textnachricht oder einen Anruf bekommen, um weitere Kursinformationen zu erhalten.",
    },
    formSuccessMessage: {
      en: `💎 Your request has been successfully received.👍\n
  📞We'll get back to you ASAP!`,
      de: `💎 Deine Anfrage ist erfolgreich bei uns eingegangen.👍\n
  📞Wir melden uns so schnell wie möglich bei dir zurück!`,
    },
    previousPageButton: {
      en: `Back to previous page`,
      de: "Zurück zur vorherigen Seite",
    },

    duration: {
      en: "Duration:",
      de: "Dauer:",
    },
    price: {
      en: "Price:",
      de: "Preis:",
    },
    paymentOptions: {
      en: "Payment Options:",
      de: "Zahlungsoptionen:",
    },
    requirements: {
      en: "Requirements:",
      de: "Anforderungen:",
    },
    interestedButton: {
      en: "Request Consultation",
      de: "Beratungsgespräch anfragen",
    },
    massnahmennummer: {
      en: "Maßnahmennummer:",
      de: "Maßnahmennummer:",
    },
  };

  const freezeBody = () => {
    const bodyTags = document.getElementsByTagName("body");
    const bodyTag = bodyTags.item(0);
    if (!bodyTag?.classList.contains("overflow-hidden")) {
      bodyTag?.classList.add("overflow-hidden");
    } else {
      bodyTag.classList.remove("overflow-hidden");
    }
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid, isDirty, isSubmitSuccessful },
  } = useForm<FormData>({
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      registered: "",
      email: "",
      phone: "",
      message: "",
      city: "",
    },
  });

  const [cookies] = useCookies();

  const submit: SubmitHandler<FormData> = async (data) => {
    const customFields = {
      "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": `Partner Page${getReferral(
        cookies["ref"]
      )}`,
      dc0a286b9fe00ab025597776b38364624d981bb9:
        router.locale === "de" ? "Deutsch" : "English",
      "52234b4b01246fcb183fcf6fdbb082f747774cda": course.title,
      "8cbaebfb84deca2ab3f762c3544a6aa4647d36b7": bootcamp_name,
      phone: data.phone,
      "8a2d9fc96a0b7d037839d71aa4b3acc774c9b9c8": data.registered,
      ff5cbb72cbacd4bd2a25faf31fd4cea46313b72a: data.city,
      "4c7f032479a698cac32406114330602b5802567f": data.message,
      first_name: data.firstName,
      last_name: data.lastName,
    };
    const customData = {
      selectedCourse: course.title,
      registered: data.registered,
      language: router.locale === "de" ? "Deutsch" : "English",
    };
    try {
      await Promise.all([
        api.trackFbEvent({
          eventName: "BootcampPartnerConsultationRequest",
          externalId: cookies["session"],
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          customDataObj: customData,
          customEvent: true,
        }),
        api.addPerson(
          data.firstName,
          data.lastName,
          data.email,
          customFields,
          "PartnerPage",
          15,
          "BootcampPartnerConsultationRequest"
        ),
      ]);
    } catch (e) {
      setError("city", {
        message:
          "Unexpected error submitting the form, please try again later.",
      });
    }
  };

  return (
    <div className="card">
      <div className="partner-course-flex-between partner-course-flex-between-reverse wrap-text">
        <p className="title">{course.title}</p>
        <img className="partner-course-logo" src={logo} alt="" />
      </div>
      <div className="card-section">
        <p className="subtitle">{bootcamp_name}</p>
        <div
          className="base-text space-y-md"
          dangerouslySetInnerHTML={{
            __html: utils.cleanText(course.description, true),
          }}
        ></div>
      </div>
      {course.duration && (
        <div className="card-section">
          <p className="subtitle">{i18n.duration[language]}</p>
          <p className="base-text">{course.duration}</p>
        </div>
      )}
      {course.price && (
        <div className="card-section">
          <p className="subtitle">{i18n.price[language]}</p>
          <p className="base-text">{course.price}</p>
        </div>
      )}
      {course.payment_options && (
        <div className="card-section">
          <p className="subtitle">{i18n.paymentOptions[language]}</p>
          <ul className="payment-list">
            {course.payment_options.map(({ payment_option }) => (
              <li key={payment_option} className="base-text">
                <span className="list-itemx">{payment_option}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="card-section partner-course-flex-between partner-course-flex-between-end">
        <div className="requirements-section">
          {course.requirements && (
            <>
              <p className="subtitle">{i18n.requirements[language]}</p>
              <ul className="payment-list">
                {course.requirements.map(({ requirement }) => (
                  <li key={requirement} className="base-text">
                    <span className="list-itemx">{requirement}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {course.voucher && (
            <div className="card-small-section">
              <p className="small-subtitle">
                {i18n.massnahmennummer[language]}
              </p>
              <p className="small-text">{course.massnahmennummer}</p>
            </div>
          )}
        </div>

        <PortalWithState
          onOpen={freezeBody}
          onClose={freezeBody}
          closeOnOutsideClick
          closeOnEsc
        >
          {({ openPortal, closePortal, isOpen, portal }) => (
            <Fragment>
              <button onClick={openPortal} className={`button button--small`}>
                {i18n.interestedButton[language]}
              </button>
              {portal(
                <div
                  style={{ zIndex: 1000 }}
                  onClick={closePortal}
                  className="fixed bg-white/90 inset-0 flex items-center justify-center"
                >
                  <div
                    onClick={(event) => event.stopPropagation()}
                    className="w-[700px] bg-indigo-700 max-h-screen overflow-y-auto px-4 sm:px-10 py-12 sm:rounded"
                  >
                    {isSubmitSuccessful ? (
                      <div className="flex justify-between items-start">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: i18n.formSuccessMessage[locale],
                          }}
                          className="text-white text-xl font-bold"
                        ></p>
                        <button
                          type="button"
                          onClick={closePortal}
                          className="ml-4 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                        >
                          <img src={"/assets/icons/close.svg"} alt="" />
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit(submit)} className="h-full">
                        <div className="flex justify-between mb-8 items-start">
                          <p className="text-white text-xl font-bold">
                            {i18n.formText[locale]}
                          </p>

                          <button
                            type="button"
                            onClick={closePortal}
                            className="ml-4 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                          >
                            <img src={"/assets/icons/close.svg"} alt="" />
                          </button>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                          <Input
                            label={i18n.formFirstNameLabel[locale]}
                            type="text"
                            disabled={isSubmitting}
                            register={register("firstName", { required: true })}
                            error={errors.firstName}
                          />
                          <Input
                            label={i18n.formLastNameLabel[locale]}
                            type="text"
                            disabled={isSubmitting}
                            register={register("lastName", { required: true })}
                            error={errors.lastName}
                          />
                        </div>
                        <Input
                          label={i18n.formEmailLabel[locale]}
                          type="email"
                          disabled={isSubmitting}
                          register={register("email", { required: true })}
                          error={errors.email}
                        />
                        <PhoneInput
                          label={i18n.formPhoneLabel[locale]}
                          disabled={isSubmitting}
                          type="text"
                          register={register("phone", { required: true })}
                          error={errors.phone}
                        />
                        {/* TODO: Fix selected option alignement */}
                        <Dropdown
                          label={i18n.formMessageLabel[locale]}
                          disabled={isSubmitting}
                          register={register("message", { required: true })}
                          options={i18n.formMessageOptions[locale]}
                          error={errors.message}
                        />
                        <Dropdown
                          label={i18n.formRegisteredLabel[locale]}
                          disabled={isSubmitting}
                          register={register("registered", { required: true })}
                          options={i18n.formRegisteredOptions[locale]}
                          error={errors.registered}
                        />
                        <Dropdown
                          label={i18n.formCityLabel[locale]}
                          disabled={isSubmitting}
                          register={register("city", { required: true })}
                          options={i18n.formCityOptions[locale]}
                          error={errors.city}
                        />
                        <div className="compass-tool-results__form__button">
                          <button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            onClick={openPortal}
                            className={`button button--small button--transparent-blue-alt ${
                              !isValid || isSubmitting ? "button--disabled" : ""
                            } ${isSubmitting ? "button--busy" : ""}`}
                          >
                            {i18n.formButtonLabel[locale]}
                          </button>
                        </div>
                        <div className="compass-tool-results__form__info">
                          {bootcamp_name
                            ? i18n.formDisclaimer[locale].replace(
                                "[BOOTCAMP]",
                                bootcamp_name
                              )
                            : ""}
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </Fragment>
          )}
        </PortalWithState>
      </div>
    </div>
  );
};

export default CourseDetailCard;
