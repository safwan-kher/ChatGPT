import React, { FC, MutableRefObject, forwardRef, useState } from "react";
import { useForm, UseFormRegisterReturn, FieldError } from "react-hook-form";
import { useCookies } from "react-cookie";

import api from "api";
import utils from "utils";

import Button from "components/Button";
import { getReferral } from "components/ReferralWrapper";

interface FormProps {
  text: string;
  firstNameLabel: string;
  lastNameLabel: string;
  showJobcenter: boolean;
  jobcenterLabel: string;
  jobcenterOptions: any[];
  jobcenterErrorMessage: string;
  jobcenterTooltip: string;
  emailLabel: string;
  showPhone: boolean;
  phoneLabel: string;
  buttonLabel: string;
  successMessage: string;
  language: "de" | "en";
  stageId: number;
  leadSource: string;
  showMeetingDate: boolean;
  meetingDateLabel?: string;
  meetingDateOptions?: { meeting_date: string }[];
  meetingDateSubmit?: string;
  meetingDateSuccessMessage?: string;
  showDropdown: boolean;
  dropdownLabel: string;
  dropdownOptions: { dropdown_option: string }[];
  redirectURL?: string;
  showEmailConsentCheckbox?: boolean;
  emailConsentCheckboxLabel?: string;
  showTicketTypeDropdown?: boolean;
  ticketTypeOptions?: { ticket_type_option: string }[];
  makePhoneInputOptional?: boolean;
}

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  jobcenter: string;
  dropdown: string;
  emailConsent: boolean;
  ticketType: string;
};

type MeetingBookingData = {
  meetingDate: string;
};

export interface InputProps {
  disabled: boolean;
  label: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  type: string;
  autocomplete?: boolean;
  light?: boolean;
}

interface DropdownProps {
  disabled: boolean;
  label: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  tooltip?: string | JSX.Element;
  options: { item: string; value?: string }[];
  autocomplete?: boolean;
  light?: boolean;
}

interface DateDropdownProps {
  disabled: boolean;
  label: string;
  register: UseFormRegisterReturn;
  options: { meeting_date: string }[];
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      register: { ref, ...rest },
      type,
      disabled,
      autocomplete = true,
      light = false,
    },
    forwardRef
  ) => {
    return (
      <div className={`input-only ${light ? "input-only-light" : ""}`}>
        <label className={`label ${error ? "error" : ""}`}>
          {label}
          <input
            disabled={disabled}
            className={`input`}
            type={type}
            {...rest}
            autoComplete={autocomplete ? "on" : "off"}
            ref={(e) => {
              ref(e);
              if (forwardRef && "current" in forwardRef) {
                forwardRef.current = e;
              }
            }}
          />
        </label>
      </div>
    );
  }
);

export const TextArea: FC<Omit<InputProps, "type">> = ({
  label,
  error,
  register,
  disabled,
  autocomplete = true,
  light = false,
}) => {
  return (
    <div className={`input-only ${light ? "input-only-light" : ""}`}>
      <label className={`label ${error ? "error" : ""}`}>
        {label}
        <textarea
          rows={4}
          disabled={disabled}
          className={`input text-area-remove`}
          {...register}
          autoComplete={autocomplete ? "on" : "off"}
        />
      </label>
    </div>
  );
};

export interface CheckboxProps {
  disabled: boolean;
  label: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  error,
  register,
  disabled,
}) => {
  return (
    <div className={"checkbox"}>
      <label className={`label ${error ? "error" : ""}`}>
        <input
          className={"input"}
          type="checkbox"
          disabled={disabled}
          {...register}
        />
        <span dangerouslySetInnerHTML={{ __html: utils.cleanText(label) }} />
      </label>
      {error && <p>{error.message}</p>}
    </div>
  );
};

const PhoneInput: FC<Omit<InputProps, "type">> = ({
  label,
  error,
  register,
  disabled,
  light = false,
}) => {
  return (
    <div className={`tel-input`}>
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
            className="tel-input-field flex-1"
            type={"tel"}
            disabled={disabled}
            {...register}
          />
        </div>
      </label>
    </div>
  );
};

export const Dropdown: FC<DropdownProps> = ({
  label,
  error,
  register,
  options,
  tooltip,
  disabled,
  autocomplete = true,
  light = false,
}) => {
  return (
    <>
      <label
        className={`label ${error ? "error" : ""} ${
          light ? "label-light" : ""
        }`}
      >
        <div className="jobcenter-dropdown-label flex items-center">
          {label}
          {tooltip && (
            <div className="jobcenter-info-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM12 20.7188C7.18594 20.7188 3.28125 16.8141 3.28125 12C3.28125 7.18594 7.18594 3.28125 12 3.28125C16.8141 3.28125 20.7188 7.18594 20.7188 12C20.7188 16.8141 16.8141 20.7188 12 20.7188Z"
                  fill={light ? "black" : "white"}
                />
                <path
                  d="M14.6153 7.42192C13.9121 6.80552 12.984 6.46802 11.9996 6.46802C11.0153 6.46802 10.0871 6.80786 9.38401 7.42192C8.65276 8.06177 8.24963 8.92192 8.24963 9.84302V10.0211C8.24963 10.1243 8.33401 10.2086 8.43713 10.2086H9.56213C9.66526 10.2086 9.74963 10.1243 9.74963 10.0211V9.84302C9.74963 8.80942 10.7598 7.96802 11.9996 7.96802C13.2395 7.96802 14.2496 8.80942 14.2496 9.84302C14.2496 10.5719 13.734 11.2399 12.9348 11.5469C12.4379 11.7368 12.016 12.0696 11.7137 12.5055C11.4067 12.9508 11.2473 13.4852 11.2473 14.0266V14.5305C11.2473 14.6336 11.3317 14.718 11.4348 14.718H12.5598C12.6629 14.718 12.7473 14.6336 12.7473 14.5305V13.9985C12.7485 13.771 12.8183 13.5491 12.9474 13.3618C13.0766 13.1745 13.2593 13.0305 13.4715 12.9485C14.8543 12.4165 15.7473 11.1977 15.7473 9.84302C15.7496 8.92192 15.3465 8.06177 14.6153 7.42192ZM11.0621 17.1555C11.0621 17.4042 11.1609 17.6426 11.3367 17.8184C11.5125 17.9942 11.751 18.093 11.9996 18.093C12.2483 18.093 12.4867 17.9942 12.6625 17.8184C12.8384 17.6426 12.9371 17.4042 12.9371 17.1555C12.9371 16.9069 12.8384 16.6684 12.6625 16.4926C12.4867 16.3168 12.2483 16.218 11.9996 16.218C11.751 16.218 11.5125 16.3168 11.3367 16.4926C11.1609 16.6684 11.0621 16.9069 11.0621 17.1555Z"
                  fill={light ? "black" : "white"}
                />
              </svg>
              <div className="jobcenter-tooltip">
                <p>{tooltip}</p>
              </div>
            </div>
          )}
        </div>
        <select
          disabled={disabled}
          className={`dropdown ${light ? "dropdown-light" : ""}`}
          {...register}
          autoComplete={autocomplete ? "on" : "off"}
        >
          <option value="" selected={true}></option>
          {options.map((option) => (
            <option value={option.value || option.item} key={option.item}>
              {option.item}
            </option>
          ))}
        </select>
      </label>
      {error && (
        <div
          className="header-reskill__form__error"
          dangerouslySetInnerHTML={{
            __html: error.message,
          }}
        />
      )}
    </>
  );
};

const DateDropdown: FC<DateDropdownProps> = ({
  label,
  register,
  options,
  disabled,
}) => {
  return (
    <>
      <label className={`label`}>
        <div className="jobcenter-dropdown-label">{label}</div>
        <select disabled={disabled} className={"dropdown"} {...register}>
          {options.map((option) => (
            <option value={option.meeting_date} key={option.meeting_date}>
              {option.meeting_date}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};

const MeetingBookingForm: FC<{
  meetingDateLabel: string;
  meetingDateOptions: { meeting_date: string }[];
  buttonLabel: string;
  meetingDateSuccessMessage: string;
  successMessage: string;
  personId: string;
}> = ({
  meetingDateLabel,
  meetingDateOptions,
  buttonLabel,
  meetingDateSuccessMessage,
  successMessage,
  personId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty, isSubmitSuccessful },
  } = useForm<MeetingBookingData>({
    mode: "all",
    defaultValues: {
      meetingDate: "",
    },
  });
  const onSubmit = async (data: MeetingBookingData) => {
    try {
      await api.updatePerson(personId, {
        "389b4b29fec96c9802a32a9757bebf470c0f1d40": data.meetingDate,
      });
    } catch (e) {
      console.error("error");
    }
  };
  return (
    <>
      {isSubmitSuccessful ? (
        <div>
          <div className="landing-page__hero__form__text">
            {meetingDateSuccessMessage}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="landing-page__hero__form__text">{successMessage}</div>

          <DateDropdown
            disabled={false}
            label={`${meetingDateLabel}*`}
            options={meetingDateOptions}
            register={register("meetingDate", { required: true })}
          />
          <div className="landing-page__hero__form__button">
            <Button
              busy={isSubmitting}
              disabled={
                isSubmitting || !isDirty || !isValid || isSubmitSuccessful
              }
              onClick={() => undefined}
              label={`${buttonLabel}`}
              variant="transparent-blue-alt"
            />
          </div>
        </form>
      )}
    </>
  );
};

export const Form: FC<FormProps> = ({
  text,
  firstNameLabel,
  lastNameLabel,
  showJobcenter,
  jobcenterLabel,
  jobcenterOptions,
  jobcenterErrorMessage,
  emailLabel,
  showPhone,
  phoneLabel,
  buttonLabel,
  successMessage,
  language,
  stageId,
  leadSource,
  showMeetingDate,
  meetingDateLabel,
  meetingDateOptions,
  meetingDateSubmit,
  meetingDateSuccessMessage,
  showDropdown,
  dropdownLabel,
  dropdownOptions,
  redirectURL,
  showEmailConsentCheckbox,
  emailConsentCheckboxLabel,
  showTicketTypeDropdown,
  ticketTypeOptions,
  makePhoneInputOptional,
}) => {
  const [cookies] = useCookies();
  const [personId, setpersonId] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty, isSubmitSuccessful },
  } = useForm<FormData>({
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      ...(showJobcenter !== false && { jobcenter: "" }),
      ...(showPhone !== false && { phone: "" }),
      ...(showDropdown !== false && { dropdown: "" }),
      ...(showEmailConsentCheckbox === true && { emailConsent: false }),
      ...(showTicketTypeDropdown === true && { ticketType: "" }),
      email: "",
    },
  });
  const onSubmit = async (data: FormData) => {
    const finalLeadSource = showDropdown
      ? `${leadSource}${data.dropdown}`
      : leadSource;
    try {
      (window as any).ttq.track("SubmitForm");
      const customFields = {
        // Lead Source ->
        "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": `${finalLeadSource}${getReferral(
          cookies.ref
        )}`,
        ...(showPhone !== false && { phone: `+49 ${data.phone}` }),
        ...(showJobcenter !== false && {
          "8a2d9fc96a0b7d037839d71aa4b3acc774c9b9c8": data.jobcenter,
        }),
        ...(showTicketTypeDropdown === true && {
          "52234b4b01246fcb183fcf6fdbb082f747774cda": data.ticketType,
        }),
        ...(showEmailConsentCheckbox !== false && {
          ff8fcfd408c0714269993b513855617459da45d6: data.emailConsent
            ? "Yes"
            : "No",
        }),
        dc0a286b9fe00ab025597776b38364624d981bb9:
          language === "de" ? "Deutsch" : "English",
      };
      const customData = {
        registered: data.jobcenter,
        language: language === "de" ? "Deutsch" : "English",
      };
      api.trackFbEvent({
        eventName: "Lead",
        externalId: cookies.session,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: `+49 ${data.phone}`,
        customDataObj: customData,
      });
      const personId = await api.addPerson(
        data.firstName,
        data.lastName,
        data.email,
        customFields,
        finalLeadSource,
        stageId
      );
      setpersonId(personId);
    } catch (err) {
      console.error(err);
    }
  };

  const i18n = {
    jobcenterTooltip: {
      en: "You are currently (or will soon be) unemployed & are officially registered in Germany (not with a student visa).",
      de: "Du bist im Moment oder demnächst arbeitslos & offiziell in Deutschland gemeldet (kein Student).",
    },
    ticketTypeLabel: {
      en: "Attending",
      de: "An Veranstaltung teilnehmen",
    },
  };

  return (
    <div className="landing-page__hero__form slider slider-delay-1 reset-form-styles">
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
      {isSubmitSuccessful ? (
        showMeetingDate !== false ? (
          <div>
            <MeetingBookingForm
              successMessage={successMessage}
              meetingDateLabel={meetingDateLabel}
              meetingDateOptions={meetingDateOptions}
              buttonLabel={meetingDateSubmit}
              meetingDateSuccessMessage={meetingDateSuccessMessage}
              personId={personId}
            />
          </div>
        ) : (
          <div>
            <div className="landing-page__hero__form__text">
              {successMessage}
            </div>
          </div>
        )
      ) : redirectURL ? (
        <div>
          <div className="landing-page__hero__form__text">{text}</div>
          <div className="landing-page__hero__form__button">
            <Button
              link={redirectURL}
              label={`${buttonLabel}`}
              variant="transparent-blue-alt"
            />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="landing-page__hero__form__text">{text}</div>
          <div className="row">
            <div className="col-6 col-12-sm">
              <Input
                disabled={isSubmitting || isSubmitSuccessful}
                type={"text"}
                label={`${firstNameLabel}*`}
                error={errors.firstName}
                register={register("firstName", { required: true })}
              />
            </div>
            <div className="col-6 col-12-sm">
              <Input
                disabled={isSubmitting || isSubmitSuccessful}
                type={"text"}
                label={`${lastNameLabel}*`}
                error={errors.lastName}
                register={register("lastName", { required: true })}
              />
            </div>
          </div>
          {showJobcenter !== false && (
            <Dropdown
              disabled={isSubmitting || isSubmitSuccessful}
              label={`${jobcenterLabel}*`}
              error={errors.jobcenter}
              tooltip={i18n.jobcenterTooltip[language]}
              register={register("jobcenter", {
                required: {
                  value: true,
                  message: jobcenterErrorMessage,
                },
                validate: (value) =>
                  value.startsWith("Yes") ||
                  value.startsWith("Ja") ||
                  jobcenterErrorMessage,
              })}
              options={jobcenterOptions}
            />
          )}
          <Input
            disabled={isSubmitting || isSubmitSuccessful}
            type={"text"}
            label={`${emailLabel}*`}
            error={errors.email}
            register={register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {showPhone !== false && (
            <PhoneInput
              disabled={isSubmitting || isSubmitSuccessful}
              label={`${phoneLabel}${makePhoneInputOptional ? "" : "*"}`}
              error={errors.phone}
              register={register("phone", {
                required: !makePhoneInputOptional,
                ...(!makePhoneInputOptional && { minLength: 7 }),
              })}
            />
          )}
          {showDropdown === true && (
            <DateDropdown
              disabled={isSubmitting || isSubmitSuccessful}
              label={`${dropdownLabel}*`}
              register={register("dropdown", {
                required: true,
              })}
              options={dropdownOptions.map((option) => ({
                meeting_date: option.dropdown_option,
              }))}
            />
          )}
          {showTicketTypeDropdown === true && (
            <Dropdown
              disabled={isSubmitting || isSubmitSuccessful}
              label={`${i18n.ticketTypeLabel[language]}*`}
              error={errors.ticketType}
              register={register("ticketType", {
                required: true,
              })}
              options={ticketTypeOptions.map(({ ticket_type_option }) => ({
                item: ticket_type_option,
              }))}
            />
          )}
          {showEmailConsentCheckbox === true && (
            <Checkbox
              error={errors.emailConsent}
              disabled={isSubmitting || isSubmitSuccessful}
              label={`${emailConsentCheckboxLabel}`}
              register={register("emailConsent")}
            />
          )}
          <div className="landing-page__hero__form__button">
            <Button
              busy={isSubmitting}
              disabled={
                isSubmitting || !isDirty || !isValid || isSubmitSuccessful
              }
              onClick={() => undefined}
              label={`${buttonLabel}`}
              variant="transparent-blue-alt"
            />
          </div>
        </form>
      )}
    </div>
  );
};
