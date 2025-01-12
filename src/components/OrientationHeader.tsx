import { FC, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input, InputProps, Dropdown } from "./Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { getReferral } from "./ReferralWrapper";
import { useCookies } from "react-cookie";
import api from "api";

const featureImages = [
  "/assets/images/star_icon.png",
  "/assets/images/satellite_icon.png",
  "/assets/images/computer_icon.png",
  "/assets/images/diploma_icon.png",
  "/assets/images/handshake_icon.png",
];

export const PhoneInput: FC<InputProps> = ({
  label,
  error,
  register,
  type,
  disabled,
  light = false,
}) => {
  return (
    <>
      <div className={`tel-input ${light ? "input-only-light" : ""}`}>
        <label className={`label ${error ? "error" : ""}`}>
          {label}
          <div className={"input flex items-center"}>
            <div className="tel-icon flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6"
                viewBox="0 0 5 3"
              >
                <rect width="5" height="3" y="0" x="0" fill="#000" />
                <rect width="5" height="2" y="1" x="0" fill="#D00" />
                <rect width="5" height="1" y="2" x="0" fill="#FFCE00" />
              </svg>
              &nbsp;&nbsp;+49
            </div>
            <input
              disabled={disabled}
              className={`tel-input-field flex-1 w-full block min-w-0`}
              type={type}
              inputMode="tel"
              {...register}
              autoComplete="off"
            />
          </div>
        </label>
        {error && (
          <p className="header-reskill__form__error">{error.message}</p>
        )}
      </div>
    </>
  );
};

type FormData = {
  firstName: string;
  lastName: string;
  registered: string;
  email: string;
  phone: string;
  [key: string]: string;
};

type OrientationHeaderProps = {
  heading: string;
  sub_heading: string;
  content: string;
  image: string;
  features: [{ feature: string }];
  pipedrive_lead_source: string;
  pipedrive_stage_id: number;
  form_submit_success_message: string;
  extra_dropdowns?: {
    label: string;
    pipedrive_custom_field_id: string;
    options: { option_name: string; option_value: string }[];
  }[];
  trackPurchase?: boolean;
  altFormLabels?: boolean;
};

export const OrientationHeader: FC<OrientationHeaderProps> = ({
  heading,
  sub_heading,
  content,
  image,
  features,
  pipedrive_lead_source,
  pipedrive_stage_id,
  form_submit_success_message,
  extra_dropdowns,
  trackPurchase,
  altFormLabels,
}) => {
  const [cookies] = useCookies();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      registered: "",
      email: "",
      phone: "",
      ...(extra_dropdowns &&
        extra_dropdowns.reduce(
          (acc, { pipedrive_custom_field_id }) => ({
            ...acc,
            [pipedrive_custom_field_id]: "",
          }),
          {}
        )),
    },
  });

  const locale = router.locale === "en" ? "en" : "de";

  const submit: SubmitHandler<FormData> = async (data) => {
    const parnerRecommendation = "partner-recommendation-";
    const referralCookie = cookies["ref"];
    const isParnerRecommendation =
      typeof referralCookie === "string" &&
      referralCookie.startsWith(parnerRecommendation);
    try {
      const customFields = {
        "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": isParnerRecommendation
          ? referralCookie.slice(parnerRecommendation.length)
          : `${pipedrive_lead_source}${getReferral(cookies["ref"])}`,
        "8a2d9fc96a0b7d037839d71aa4b3acc774c9b9c8": data.registered,
        dc0a286b9fe00ab025597776b38364624d981bb9:
          router.locale === "de" ? "German" : "English",
        phone: `+49 ${data.phone}`,
        ...(extra_dropdowns &&
          extra_dropdowns.reduce(
            (acc, { pipedrive_custom_field_id }) => ({
              ...acc,
              [pipedrive_custom_field_id]: data[pipedrive_custom_field_id],
            }),
            {}
          )),
      };
      (window as any)?.ttq?.identify({
        email: data.email,
        phone_number: `+49 ${data.phone}`,
      });
      (window as any)?.ttq?.track("SubmitForm");

      await Promise.all([
        api.trackFbEvent({
          eventName: "Lead",
          externalId: cookies.session,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: `+49 ${data.phone}`,
          customDataObj: customFields,
        }),
        api.addPerson(
          data.firstName,
          data.lastName,
          data.email,
          customFields,
          pipedrive_lead_source,
          isParnerRecommendation ? 96 : pipedrive_stage_id
        ),
        trackPurchase &&
          api.trackFbEvent({
            eventName: "Purchase",
            externalId: cookies.session,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: `+49 ${data.phone}`,
            customDataObj: customFields,
          }),
      ]);
    } catch (error) {
      console.error(error);
      setError("phone", {
        message: "Error submitting form. Please try again later.",
      });
    }
  };

  const i18n = {
    formText: {
      en: "Complete this application form and we will contact you regarding the next steps.",
      de: "Fülle dieses Anmeldeformular aus und wir werden dich bezüglich der nächsten Schritte kontaktieren.",
    },
    formFirstNameLabel: {
      en: "First name",
      de: "Vorname",
    },
    formLastNameLabel: {
      en: "Last name",
      de: "Nachname",
    },
    formEmailLabel: {
      en: "Email",
      de: "Email",
    },
    formPhoneLabel: {
      en: "Phone",
      de: "Telefonnummer",
    },
    formButtonLabel: {
      en: "Apply for the Compass Course",
      de: "Weitere Infos anfordern",
    },
    formRegisteredLabel: {
      en: "Are you currently registered at the JobCenter/Agentur für Arbeit?",
      de: "Bist du beim Jobcenter/der Agentur für Arbeit registriert?",
    },
    formRegisteredError: {
      en: "You need to be registered with Agentur für Arbeit or Jobcenter for this course.",
      de: "Für diesen Kurs musst du bei der Agentur für Arbeit oder dem Jobcenter registriert sein.",
    },
    formTooltip: {
      en: "You are currently (or will soon be) unemployed & are officially registered in Germany (not with a student visa).",
      de: "Du bist im Moment oder demnächst arbeitslos & offiziell in Deutschland gemeldet (kein Student).",
    },
    formSuccessMessage: {
      en: `💎 Your request has been successfully received.👍\n
📞We'll get back to you ASAP!`,
      de: `💎 Deine Anfrage ist erfolgreich bei uns eingegangen.👍\n
📞Wir melden uns so schnell wie möglich bei dir zurück!`,
    },
    altFormRegisteredLabel: {
      en: "Are you currently registered as unemployed with the Agentur für Arbeit or Jobcenter?",
      de: "Bist du beim Jobcenter oder der Agentur für Arbeit als arbeitssuchend gemeldet?",
    },
    altFormRegisteredError: {
      en: `<p>
          You need to be registered with Agentur für Arbeit or Jobcenter for
          this course – you can find
          <a class="underline" href="/en/bootcamps-we-work-with">
            other courses & certificates without this requirement here.
          </a>
        </p>`,
      de: `<p>Für diesen Kurs musst du bei der Agentur für Arbeit oder dem Jobcenter registriert sein. Falls das nicht auf dich zutrifft, findest du hier <a class="underline" href="/de/bootcamps">weitere Kurse und Zertifikate ohne diese Voraussetzung.</a><p>`,
    },
  };

  return (
    <>
      <header
        className="bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(72, 27, 255, 78%), rgba(255, 255, 255, 0%)), url(${image})`,
        }}
      >
        <div className="max-w-7xl px-4 mx-auto">
          <div className="ultra-logo">
            <Link href={`/${router.locale}`} className="header__logo"></Link>
            <Link
              locale={router.locale === "en" ? "de" : "en"}
              href={router.asPath}
              className="simple-language-switch"
            >
              {router.locale === "en" ? "Deutsch" : "English"}
            </Link>
          </div>
          <div className="sm:w-1/2 py-32 text-white">
            <h1 className="text-center sm:text-left">
              <span className="font-bold text-5xl">{heading}</span>
              <br />
              <span className="text-4xl">{sub_heading}</span>
            </h1>
            <p className="text-lg mt-2 text-center leading-snug sm:text-left">
              {content}
            </p>
          </div>
        </div>
      </header>
      <div className="max-w-7xl md:px-4 mx-auto flex flex-col md:flex-row md:space-x-16">
        <div className="flex-1 -mt-6 px-4 md:px-0">
          <div className="bg-indigo-200 w-[81px] md:w-[89px] h-10"></div>
          <ul>
            {features.map(({ feature }, index) => (
              <li key={index} className="flex items-stretch list-none">
                <div className="bg-indigo-200 w-[81px] md:w-[89px] flex-shrink-0 flex items-center justify-center">
                  <img src={featureImages[index]} alt="" />
                </div>
                <div className="flex items-center justify-center ml-4 md:ml-6 py-6">
                  <p
                    className={`text-xl md:text-2xl ${
                      index === 0 ? "font-bold" : ""
                    }`}
                  >
                    {feature}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="bg-indigo-200 w-[81px] md:w-[89px] h-6"></div>
        </div>
        <div className="flex-1 md:-mt-32 mt-16 w-full md:w-auto">
          <div className="bg-indigo-200 p-3">
            {isSubmitSuccessful ? (
              <div className="bg-indigo-700 py-8 px-6 sm:px-12">
                <p className="font-semibold text-xl text-white w-10/12">
                  {form_submit_success_message}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(submit)}
                autoComplete="off"
                className="bg-indigo-700 py-8 px-6 sm:px-12"
              >
                <p className="font-semibold text-xl text-white w-10/12">
                  {i18n.formText[locale]}
                </p>
                <div className="flex flex-col sm:flex-row sm:gap-x-5 pt-5">
                  <Input
                    disabled={isSubmitting || isSubmitSuccessful}
                    type={"text"}
                    label={`${i18n.formFirstNameLabel[locale]}*`}
                    error={errors.firstName}
                    register={register("firstName", { required: true })}
                  />
                  <Input
                    disabled={isSubmitting || isSubmitSuccessful}
                    type={"text"}
                    label={`${i18n.formLastNameLabel[locale]}*`}
                    error={errors.lastName}
                    register={register("lastName", { required: true })}
                  />
                </div>
                {altFormLabels ? (
                  <Dropdown
                    disabled={isSubmitting || isSubmitSuccessful}
                    label={`${i18n.altFormRegisteredLabel[locale]}*`}
                    error={errors.registered}
                    register={register("registered", {
                      validate: (val) =>
                        ["yes", "soon"].includes(val.toLowerCase())
                          ? undefined
                          : i18n.altFormRegisteredError[locale],
                    })}
                    options={
                      locale === "de"
                        ? [
                            {
                              item: "Ja, ich bin derzeit arbeitslos und gemeldet.",
                              value: "Yes",
                            },
                            {
                              item: "Bald, ich bin derzeit erwerbstätig, aber es besteht die Möglichkeit, dass ich arbeitslos werde.",
                              value: "Soon",
                            },
                            {
                              item: "Nein, ich bin nicht gemeldet.",
                              value: "No",
                            },
                          ]
                        : [
                            {
                              item: "Yes, I am currently unemployed & registered.",
                              value: "Yes",
                            },
                            {
                              item: "Soon to be, I am currently employed but facing the possibility of unemployment.",
                              value: "Soon",
                            },
                            {
                              item: "No, I am not registered.",
                              value: "No",
                            },
                          ]
                    }
                    tooltip={i18n.formTooltip[locale]}
                    autocomplete={false}
                  />
                ) : (
                  <Dropdown
                    disabled={isSubmitting || isSubmitSuccessful}
                    label={`${i18n.formRegisteredLabel[locale]}*`}
                    error={errors.registered}
                    register={register("registered", {
                      validate: (val) =>
                        ["yes", "ja"].includes(val.toLowerCase())
                          ? undefined
                          : i18n.formRegisteredError[locale],
                    })}
                    options={
                      locale === "de"
                        ? [{ item: "Ja" }, { item: "Nein" }]
                        : [{ item: "Yes" }, { item: "No" }]
                    }
                    tooltip={i18n.formTooltip[locale]}
                    autocomplete={false}
                  />
                )}
                <Input
                  disabled={isSubmitting || isSubmitSuccessful}
                  type={"email"}
                  label={`${i18n.formEmailLabel[locale]}*`}
                  error={errors.email}
                  register={register("email", { required: true })}
                />
                <PhoneInput
                  disabled={isSubmitting || isSubmitSuccessful}
                  type={"text"}
                  label={`${i18n.formPhoneLabel[locale]}*`}
                  error={errors.phone}
                  register={register("phone", { required: true })}
                  autocomplete={false}
                />
                {extra_dropdowns &&
                  extra_dropdowns.map(
                    ({ label, pipedrive_custom_field_id, options }, index) => (
                      <Fragment key={index}>
                        <Dropdown
                          label={label}
                          disabled={isSubmitting || isSubmitSuccessful}
                          error={errors[pipedrive_custom_field_id]}
                          register={register(pipedrive_custom_field_id, {
                            required: true,
                          })}
                          options={options.map(
                            ({ option_name, option_value }) => ({
                              item: option_name,
                              value: option_value,
                            })
                          )}
                          autocomplete={false}
                        />
                      </Fragment>
                    )
                  )}
                <div className="flex justify-center">
                  <button
                    disabled={isSubmitting}
                    className={`button button--transparent-blue-alt button--wide ${
                      isSubmitting ? "button--busy" : ""
                    }`}
                    type="submit"
                  >
                    {i18n.formButtonLabel[locale]}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
