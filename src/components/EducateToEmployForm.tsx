import { FC, Fragment } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { getReferral } from "./ReferralWrapper";
import { useCookies } from "react-cookie";
import api from "api";
import {
  FormStyles,
  StyledDropdown,
  StyledInput,
  StyledPhoneInput,
} from "./TalentAcceleratorForm";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  registered: string;
  [key: string]: string;
};

export const EducateToEmployForm: FC<{
  closeForm: () => void;
  form: string;
  extra_dropdowns?: {
    label: string;
    pipedrive_custom_field_id: string;
    options: { option_name: string; option_value: string }[];
  }[];
  form_title: string;
  form_submit_button_text: string;
  form_success_message: string;
  pipedrive_lead_source: string;
  pipedrive_stage_id: number;
  form_disclaimer: string;
  style: FormStyles;
}> = ({
  closeForm,
  extra_dropdowns,
  form_title,
  form_submit_button_text,
  form_success_message,
  pipedrive_lead_source,
  pipedrive_stage_id,
  form_disclaimer,
  style,
}) => {
  const [cookies] = useCookies();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting, isValid, isSubmitSuccessful },
  } = useForm<FormData>({
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      registered: "",
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

      const customData = {
        registered: data.registered,
        language: router.locale === "de" ? "Deutsch" : "English",
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
          customDataObj: customData,
        }),
        api.addPerson(
          data.firstName,
          data.lastName,
          data.email,
          customFields,
          pipedrive_lead_source,
          pipedrive_stage_id
        ),
      ]);
    } catch (error) {
      setError("phone", {
        message: "Error submitting form. Please try again later.",
      });
    }
  };

  const i18n = {
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
    companyNameLabel: {
      en: "Company name",
      de: "Name der Firma",
    },
    formPhoneLabel: {
      en: "Phone",
      de: "Handynummer",
    },
    formRegisteredLabel: {
      en: "Are you currently registered as unemployed with the Agentur für Arbeit or Jobcenter?",
      de: "Bist du beim Jobcenter oder der Agentur für Arbeit als arbeitssuchend gemeldet?",
    },
    formRegisteredError: {
      en: `<p>
          Registration is mandatory to receive a Bildungsgutschein for this course. Please return once you are registered with the Agentur für Arbeit or Jobcenter.
        </p>`,
      de: `<p>Für diesen Kurs musst du bei der Agentur für Arbeit oder dem Jobcenter registriert sein. Falls das nicht auf dich zutrifft, findest du hier <a class="underline" href="https://startsteps.org/en/bootcamps-we-work-with">weitere Kurse und Zertifikate ohne diese Voraussetzung.</a><p>`,
    },
    formTooltip: {
      en: "You are currently (or will soon be) unemployed & are officially registered in Germany (not with a student visa).",
      de: "Du bist im Moment oder demnächst arbeitslos & offiziell in Deutschland gemeldet (kein Student).",
    },

    formDisclaimer: {
      en: "Your contact information will be shared with [COMPANY] so they can reach out to you with the next steps. You may get an email, a text message or a phone call so they can provide more course information.",
      de: "Deine Kontaktinformationen werden mit [COMPANY] geteilt, damit sie sich mit den nächsten Schritten an dich wenden können. Du kannst eine E-Mail, eine Textnachricht oder einen Anruf bekommen, um weitere Kursinformationen zu erhalten.",
    },
    options: {
      en: [
        {
          item: "Yes, I am currently unemployed & registered.",
          value: "Yes",
        },
        {
          item: "No, I am not registered.",
          value: "No",
        },
      ],
      de: [
        {
          item: "Ja, ich bin de arbeitslos und gemeldet.",
          value: "Yes",
        },
        {
          item: "Nein, ich bin nicht gemeldet.",
          value: "No",
        },
      ],
    },
  };

  return (
    <div className="max-w-2xl px-4 sm:px-10 py-4 sm:py-12">
      {isSubmitSuccessful ? (
        <div className="flex justify-between items-start">
          <p className={`${style.textColor} text-xl font-bold`}>
            {form_success_message}
          </p>
          <button
            type="button"
            onClick={closeForm}
            className="ml-4 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          >
            <svg
              width="51"
              height="51"
              viewBox="0 0 51 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={style.textColor}
            >
              <path
                d="M12.728 12.7279L38.1839 38.1837"
                stroke-width="2"
                stroke-linecap="round"
                className="stroke-current"
              />
              <path
                d="M12.728 38.1837L38.1839 12.7279"
                stroke-width="2"
                stroke-linecap="round"
                className="stroke-current"
              />
            </svg>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(submit)} className="h-full">
          <div className="flex justify-between mb-8 items-start">
            <p className={`${style.textColor} text-xl font-bold`}>
              {form_title}
            </p>

            <button
              type="button"
              onClick={closeForm}
              className="ml-4 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            >
              <svg
                width="51"
                height="51"
                viewBox="0 0 51 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={style.textColor}
              >
                <path
                  d="M12.728 12.7279L38.1839 38.1837"
                  stroke-width="2"
                  stroke-linecap="round"
                  className="stroke-current"
                />
                <path
                  d="M12.728 38.1837L38.1839 12.7279"
                  stroke-width="2"
                  stroke-linecap="round"
                  className="stroke-current"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <StyledInput
              label={i18n.formFirstNameLabel[locale]}
              type="text"
              disabled={isSubmitting}
              register={register("firstName", { required: true })}
              error={errors.firstName}
              textColor={style.textColor}
              inputBackgroundColor={style.inputBackgroundColor}
              borderColor={style.borderColor}
            />
            <StyledInput
              label={i18n.formLastNameLabel[locale]}
              type="text"
              disabled={isSubmitting}
              register={register("lastName", { required: true })}
              error={errors.lastName}
              textColor={style.textColor}
              inputBackgroundColor={style.inputBackgroundColor}
              borderColor={style.borderColor}
            />
          </div>
          <StyledInput
            disabled={isSubmitting || isSubmitSuccessful}
            type={"email"}
            label={`${i18n.formEmailLabel[locale]}`}
            error={errors.email}
            register={register("email", { required: true })}
            textColor={style.textColor}
            inputBackgroundColor={style.inputBackgroundColor}
            borderColor={style.borderColor}
          />
          <StyledPhoneInput
            label={i18n.formPhoneLabel[locale] + "*"}
            disabled={isSubmitting}
            type="text"
            register={register("phone", { required: true })}
            error={errors.phone}
            textColor={style.textColor}
            inputBackgroundColor={style.inputBackgroundColor}
            borderColor={style.borderColor}
          />
          <StyledDropdown
            disabled={isSubmitting || isSubmitSuccessful}
            label={`${i18n.formRegisteredLabel[locale]}*`}
            error={errors.registered}
            register={register("registered", {
              validate: (val) =>
                ["yes", "soon"].includes(val.toLowerCase())
                  ? undefined
                  : i18n.formRegisteredError[locale],
            })}
            options={i18n.options[locale]}
            tooltip={i18n.formTooltip[locale]}
            textColor={style.textColor}
            inputBackgroundColor={style.inputBackgroundColor}
            borderColor={style.borderColor}
            alt={style.textColor !== "text-black"}
          />
          {extra_dropdowns &&
            extra_dropdowns.map(
              ({ label, pipedrive_custom_field_id, options }, index) => (
                <Fragment key={index}>
                  <StyledDropdown
                    label={label + "*"}
                    disabled={isSubmitting || isSubmitSuccessful}
                    error={errors[pipedrive_custom_field_id]}
                    register={register(pipedrive_custom_field_id, {
                      required: true,
                    })}
                    options={options.map(({ option_name, option_value }) => ({
                      item: option_name,
                      value: option_value,
                    }))}
                    textColor={style.textColor}
                    inputBackgroundColor={style.inputBackgroundColor}
                    borderColor={style.borderColor}
                    alt={style.textColor !== "text-black"}
                  />
                  {/* Which of the following best describes you? */}
                  {pipedrive_custom_field_id ===
                    "4c7f032479a698cac32406114330602b5802567f" &&
                    [
                      "I have a Job-Seeker visa",
                      "I have a Student visa",
                    ].includes(
                      watch("4c7f032479a698cac32406114330602b5802567f")
                    ) && (
                      <p className="-mt-2 mb-4 text-red-600">
                        This visa type might exclude you from the services of
                        the Agentur für Arbeit or Jobcenter. Please verify your
                        eligibility for a Bildungsgutschein with them before
                        proceeding with this application
                      </p>
                    )}
                </Fragment>
              )
            )}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`rounded text-white ${
                style.buttonBackgroundColor
              } text-lg uppercase text-center px-5 pt-[9px] pb-[7px] tracking-widest font-[700] ${
                isSubmitting
                  ? "animate-pulse cursor-wait"
                  : !isValid
                  ? "cursor-not-allowed"
                  : ""
              }`}
            >
              {form_submit_button_text}
            </button>
          </div>
          <p className={`${style.textColor} mt-6`}>{form_disclaimer}</p>
        </form>
      )}
    </div>
  );
};
