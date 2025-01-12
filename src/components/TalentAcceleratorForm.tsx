import { FC, Fragment } from "react";
import { useRouter } from "next/router";
import {
  useForm,
  SubmitHandler,
  UseFormRegisterReturn,
  FieldError,
} from "react-hook-form";
import { getReferral } from "./ReferralWrapper";
import { useCookies } from "react-cookie";
import api from "api";

export const StyledPhoneInput: FC<{
  disabled: boolean;
  label: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  type: string;
  textColor: string;
  borderColor: string;
  inputBackgroundColor: string;
}> = ({
  label,
  error,
  register,
  type,
  disabled,
  textColor,
  borderColor,
  inputBackgroundColor,
}) => {
  return (
    <>
      <div
        className={`text-xl mb-5 block ${textColor} ${
          disabled ? "opacity-50" : ""
        }`}
      >
        <label className={`block ${error ? "text-red-500" : ""}`}>
          {label}
          <div
            className={`w-full ${inputBackgroundColor} flex items-center h-[44px] rounded border ${
              error ? "border-red-500" : borderColor
            } mt-[3px] px-4 w-full ${
              error ? "bg-red-500/10" : inputBackgroundColor
            } disabled:cursor-not-allowed`}
          >
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
              className={` mt-0 bg-transparent pr-[15px] pl-[6px] ${textColor} flex-1 block min-w-0 outline-none focus:outline-none`}
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

export const StyledDropdown: FC<{
  disabled: boolean;
  label: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  tooltip?: string | JSX.Element;
  options: { item: string; value?: string }[];
  textColor: string;
  borderColor: string;
  inputBackgroundColor: string;
  alt: boolean;
}> = ({
  label,
  error,
  register,
  options,
  tooltip,
  disabled,
  textColor,
  borderColor,
  inputBackgroundColor,
  alt,
}) => {
  return (
    <div className={`mb-5 ${disabled ? "opacity-50" : ""}`}>
      <label className={`text-xl block`}>
        <div className="flex items-center">
          <span className={`${error ? "text-red-500" : textColor}`}>
            {label}
          </span>
          {tooltip && (
            <div className="jobcenter-info-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={textColor}
              >
                <path
                  d="M12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM12 20.7188C7.18594 20.7188 3.28125 16.8141 3.28125 12C3.28125 7.18594 7.18594 3.28125 12 3.28125C16.8141 3.28125 20.7188 7.18594 20.7188 12C20.7188 16.8141 16.8141 20.7188 12 20.7188Z"
                  className="fill-current"
                />
                <path
                  d="M14.6153 7.42192C13.9121 6.80552 12.984 6.46802 11.9996 6.46802C11.0153 6.46802 10.0871 6.80786 9.38401 7.42192C8.65276 8.06177 8.24963 8.92192 8.24963 9.84302V10.0211C8.24963 10.1243 8.33401 10.2086 8.43713 10.2086H9.56213C9.66526 10.2086 9.74963 10.1243 9.74963 10.0211V9.84302C9.74963 8.80942 10.7598 7.96802 11.9996 7.96802C13.2395 7.96802 14.2496 8.80942 14.2496 9.84302C14.2496 10.5719 13.734 11.2399 12.9348 11.5469C12.4379 11.7368 12.016 12.0696 11.7137 12.5055C11.4067 12.9508 11.2473 13.4852 11.2473 14.0266V14.5305C11.2473 14.6336 11.3317 14.718 11.4348 14.718H12.5598C12.6629 14.718 12.7473 14.6336 12.7473 14.5305V13.9985C12.7485 13.771 12.8183 13.5491 12.9474 13.3618C13.0766 13.1745 13.2593 13.0305 13.4715 12.9485C14.8543 12.4165 15.7473 11.1977 15.7473 9.84302C15.7496 8.92192 15.3465 8.06177 14.6153 7.42192ZM11.0621 17.1555C11.0621 17.4042 11.1609 17.6426 11.3367 17.8184C11.5125 17.9942 11.751 18.093 11.9996 18.093C12.2483 18.093 12.4867 17.9942 12.6625 17.8184C12.8384 17.6426 12.9371 17.4042 12.9371 17.1555C12.9371 16.9069 12.8384 16.6684 12.6625 16.4926C12.4867 16.3168 12.2483 16.218 11.9996 16.218C11.751 16.218 11.5125 16.3168 11.3367 16.4926C11.1609 16.6684 11.0621 16.9069 11.0621 17.1555Z"
                  className="fill-current"
                />
              </svg>
              <div className="jobcenter-tooltip">
                <p>{tooltip}</p>
              </div>
            </div>
          )}
        </div>
        <select
          style={{
            backgroundImage: alt
              ? "url(/assets/icons/dropdown-arrow-white.svg)"
              : "url(/assets/icons/dropdown-arrow-zalando.svg)",
            backgroundPosition: "right 15px center",
          }}
          disabled={disabled}
          className={`text-xl appearance-none bg-no-repeat h-[44px] rounded border ${
            error ? "border-red-500" : borderColor
          } mt-[3px] px-4 w-full ${
            error ? "bg-red-500/10" : inputBackgroundColor
          } ${textColor} disabled:cursor-not-allowed`}
          {...register}
        >
          <option value="" selected={true}></option>
          {options.map((option) => (
            <option
              className={"text-black"}
              value={option.value || option.item}
              key={option.item}
            >
              {option.item}
            </option>
          ))}
        </select>
      </label>
      {error && (
        <div
          className="text-red-500 mt-2"
          dangerouslySetInnerHTML={{
            __html: error.message,
          }}
        />
      )}
    </div>
  );
};

export const StyledInput: FC<{
  disabled: boolean;
  label: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  type: string;
  textColor: string;
  borderColor: string;
  inputBackgroundColor: string;
}> = ({
  label,
  error,
  register,
  type,
  disabled,
  textColor,
  borderColor,
  inputBackgroundColor,
}) => {
  return (
    <div
      className={`text-xl mb-5 block ${textColor} ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <label className={`block ${error ? "text-red-500" : ""}`}>
        {label}
        <input
          disabled={disabled}
          className={`text-xl h-[44px] rounded border ${
            error ? "border-red-500" : borderColor
          } mt-[3px] px-4 w-full ${
            error ? "bg-red-500/10" : inputBackgroundColor
          } disabled:cursor-not-allowed`}
          type={type}
          {...register}
        />
      </label>
    </div>
  );
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  registered: string;
  [key: string]: string;
};

export type FormStyles = {
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  borderColor: string;
  inputBackgroundColor: string;
  buttonBackgroundColor: string;
};

export const TalentAcceleratorForm: FC<{
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
          You need to be registered with Agentur für Arbeit or Jobcenter for
          this course – you can find
          <a class="underline" href="https://startsteps.org/en/bootcamps-we-work-with">
            other courses & certificates without this requirement here.
          </a>
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
          item: "Soon to be, I am currently employed but facing the possibility of unemployment.",
          value: "Soon",
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
          item: "Bald, ich bin derzeit erwerbstätig, aber es besteht die Möglichkeit, dass ich arbeitslos werde.",
          value: "Soon",
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
