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

type FormData = {
  firstName: string;
  lastName: string;
  registered: string;
  email: string;
  phone: string;
};

export const AltForm: FC<{
  form_heading_head: string;
  form_heading_tail: string;
  picture: any;
  form_submit_success_message: string;
  form_submit_button_text: string;
  form_title: string;
  pipedrive_lead_source: string;
  form_consent_message: string;
  pipedrive_stage_id: number;
  alt?: boolean;
}> = ({
  form_heading_head,
  form_heading_tail,
  picture,
  form_submit_success_message,
  form_submit_button_text,
  form_title,
  pipedrive_lead_source,
  pipedrive_stage_id,
  form_consent_message,
  alt = false,
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

  return (
    <div className="my-14 sm:mt-32 overflow-hidden">
      <div className="max-w-xl md:max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 flex-shrink-0">
          <h2 className="text-4xl md:text-5xl font-[700]">
            {form_heading_head}
            <span className={`${alt ? "text-indigo-700" : "text-purple-700"}`}>
              {form_heading_tail}
            </span>
          </h2>

          <div
            className={`${alt ? "bg-indigo-700" : "bg-purple-700"} p-3 mt-16`}
          >
            {isSubmitSuccessful ? (
              <div
                className={`${
                  alt ? "bg-white" : "bg-gray-100"
                } py-8 px-6 sm:px-12`}
              >
                <p className="font-semibold text-xl text-black">
                  {form_submit_success_message}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(submit)}
                autoComplete="off"
                className={`${
                  alt ? "bg-white" : "bg-gray-100"
                } py-8 px-6 sm:px-12`}
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
                <div className="flex justify-center mt-8">
                  <button
                    className={`${
                      alt ? "bg-indigo-700" : "bg-purple-700"
                    } text-white rounded font-[700] text-center uppercase px-5 pt-[9px] pb-[7px] text-lg tracking-widest disabled:cursor-wait disabled:animate-pulse`}
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
        <div className="relative md:ml-16 mt-52 md:mt-40">
          <svg
            className="w-[435px] md:w-[635px]"
            viewBox="0 0 635 460"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.3797 3.8595C34.5968 1.58919 36.6645 -0.0502491 38.9225 0.257691L630.642 80.9563C633.092 81.2904 634.643 83.7463 633.896 86.1077L516.482 457.165C515.868 459.107 513.895 460.286 511.898 459.905L3.68415 362.795C1.66523 362.409 0.275775 360.554 0.471612 358.506L34.3797 3.8595Z"
              fill="#EDE7FF"
            />
          </svg>
          <svg
            viewBox="0 0 607 392"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 "
          >
            <path
              d="M1.37469 22.3117C1.1874 20.3282 2.69948 18.621 4.69708 18.5608L602.764 0.52727C604.933 0.461873 606.677 2.35254 606.421 4.49193L560.617 387.596C560.406 389.354 558.901 390.651 557.117 390.61L38.2146 378.84C36.4093 378.799 34.9042 377.403 34.7352 375.612L1.37469 22.3117Z"
              stroke="#481BFF"
            />
          </svg>
          <img
            className="absolute inset-0 -top-40 left-8"
            src={picture.sizes.large}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
