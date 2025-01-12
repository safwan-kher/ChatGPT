import { FC, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input, InputProps, Dropdown } from "./Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { getReferral } from "./ReferralWrapper";
import { useCookies } from "react-cookie";
import api from "api";
import { PhoneInput } from "./OrientationHeader";
import { LogoCarousel } from "./LogoCarousel";
import utils from "../utils";

type SpeakAndTechHeaderHeaderProps = {
  alt: boolean;
  heading: string;
  sub_heading: string;
  content: string;
  image: any;
  course_title: string;
  course_description: any;
  features: { course_feature_label: string; course_feature_detail: string }[];
  pipedrive_lead_source: string;
  pipedrive_stage_id: number;
  form_submit_success_message: string;
  form_title: string;
  form_submit_button_text: string;
  logo: any;
  course_image: any;
  form_consent_message: string;
  extra_dropdowns?: {
    label: string;
    pipedrive_custom_field_id: string;
    options: { option_name: string; option_value: string }[];
  }[];
  formRef: React.MutableRefObject<HTMLFormElement | null>;
};

type FormData = {
  firstName: string;
  lastName: string;
  registered: string;
  email: string;
  phone: string;
  [key: string]: string;
};

export const SpeakAndTechHeader: FC<SpeakAndTechHeaderHeaderProps> = ({
  heading,
  sub_heading,
  content,
  image,
  features,
  pipedrive_lead_source,
  pipedrive_stage_id,
  form_submit_success_message,
  extra_dropdowns,
  course_title,
  course_description,
  form_submit_button_text,
  form_title,
  course_image,
  alt,
  form_consent_message,
  logo,
  formRef,
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
    try {
      const customFields = {
        "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": `${pipedrive_lead_source}${getReferral(
          cookies["ref"]
        )}`,
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
          eventName: "BootcampPartnerConsultationRequest",
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
          pipedrive_stage_id,
          "BootcampPartnerConsultationRequest"
        ),
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
      en: "Are you currently registered as unemployed with the Agentur für Arbeit or Jobcenter?",
      de: "Bist du beim Jobcenter oder der Agentur für Arbeit als arbeitssuchend gemeldet?",
    },
    formRegisteredError: {
      en: `<p>
          You need to be registered with Agentur für Arbeit or Jobcenter for
          this course – you can find
          <a class="underline" href="/en/bootcamps-we-work-with">
            other courses & certificates without this requirement here.
          </a>
        </p>`,
      de: `<p>Für diesen Kurs musst du bei der Agentur für Arbeit oder dem Jobcenter registriert sein. Falls das nicht auf dich zutrifft, findest du hier <a class="underline" href="/de/bootcamps">weitere Kurse und Zertifikate ohne diese Voraussetzung.</a><p>`,
    },
    formTooltip: {
      en: "You are currently (or will soon be) unemployed & are officially registered in Germany (not with a student visa).",
      de: "Du bist im Moment oder demnächst arbeitslos & offiziell in Deutschland gemeldet (kein Student).",
    },
  };

  return <>
    <header
      className="bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(120deg, #604C9EC0, #00ADEE50), url(${image.sizes.large})`,
      }}
    >
      <div className="max-w-7xl px-4 mx-auto">
        <div className="ultra-logo">
          <Link href={`/${router.locale}`} className="header__logo">

          </Link>
        </div>
        <div className="sm:w-1/2 pt-32 pb-8 text-white">
          <h1 className="text-center sm:text-left">
            <span className="font-bold text-5xl">{heading}</span>
            <br />
            <span className="text-4xl">{sub_heading}</span>
          </h1>
          <p className="text-lg mt-2 text-center leading-snug sm:text-left">
            {content}
          </p>
          <div className="flex justify-center sm:justify-start">
            <img className="h-24 mt-4" src={logo.sizes.medium} alt="" />
          </div>
        </div>
      </div>
    </header>
    <div className="max-w-xl md:max-w-7xl md:px-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
      <div className="flex px-4 md:px-0 flex-col mt-11 sm:mt-28">
        <div>
          <h2 className="font-[700] text-4xl text-[40px]">{course_title}</h2>
          <div
            className="text-3xl mt-8 leading-snug"
            dangerouslySetInnerHTML={{
              __html: course_description,
            }}
          ></div>
        </div>
        <div className="mt-12">
          <img className="w-full" src={course_image.sizes.medium} alt="" />
          <dl className="border-l-2 border-b-2 border-r-2 border-gray-200 p-8 pb-12 rounded-b-2xl grid grid-cols-2 md:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <div key={index}>
                <dt className="text-xl font-[700]">
                  {feature.course_feature_label}
                </dt>
                <dd
                  className="text-gray-700 mt-4"
                  dangerouslySetInnerHTML={{
                    __html: feature.course_feature_detail,
                  }}
                ></dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="flex-1 md:-mt-32 mt-16 w-full md:w-auto">
        <div className="bg-purple-700 p-3">
          {isSubmitSuccessful ? (
            <div className="bg-gray-100 py-8 px-6 sm:px-12">
              <p className="font-semibold text-xl text-black">
                {form_submit_success_message}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(submit)}
              autoComplete="off"
              className="bg-gray-100 py-8 px-6 sm:px-12"
              ref={formRef}
            >
              <p className="font-semibold text-xl text-black">{form_title}</p>
              <div className="flex flex-col sm:flex-row sm:gap-x-5 pt-5">
                <Input
                  disabled={isSubmitting || isSubmitSuccessful}
                  type={"text"}
                  label={`${i18n.formFirstNameLabel[locale]}*`}
                  error={errors.firstName}
                  register={register("firstName", { required: true })}
                  light={true}
                />
                <Input
                  disabled={isSubmitting || isSubmitSuccessful}
                  type={"text"}
                  label={`${i18n.formLastNameLabel[locale]}*`}
                  error={errors.lastName}
                  register={register("lastName", { required: true })}
                  light={true}
                />
              </div>
              <Dropdown
                disabled={isSubmitting || isSubmitSuccessful}
                label={`${i18n.formRegisteredLabel[locale]}*`}
                error={errors.registered}
                register={register("registered", {
                  validate: (val) =>
                    ["yes", "soon"].includes(val.toLowerCase())
                      ? undefined
                      : i18n.formRegisteredError[locale],
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
                light={true}
              />
              <Input
                disabled={isSubmitting || isSubmitSuccessful}
                type={"email"}
                label={`${i18n.formEmailLabel[locale]}*`}
                error={errors.email}
                register={register("email", {
                  required: true,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email address.",
                  },
                })}
                light={true}
              />
              <PhoneInput
                disabled={isSubmitting || isSubmitSuccessful}
                type={"text"}
                label={`${i18n.formPhoneLabel[locale]}*`}
                error={errors.phone}
                register={register("phone", { required: true })}
                autocomplete={false}
                light={true}
              />
              {extra_dropdowns &&
                extra_dropdowns.map(
                  ({ label, pipedrive_custom_field_id, options }, index) => (
                    <Fragment key={index}>
                      <Dropdown
                        label={`${label}*`}
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
                        light={true}
                      />
                    </Fragment>
                  )
                )}
              <div className="flex justify-center mt-8">
                <button
                  className={`bg-purple-700 text-white rounded font-[700] text-center uppercase px-5 pt-[9px] pb-[7px] text-lg tracking-widest disabled:cursor-wait disabled:animate-pulse`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {form_submit_button_text}
                </button>
              </div>
              <p className="mt-4">{form_consent_message}</p>
            </form>
          )}
        </div>
      </div>
    </div>
  </>;
};
