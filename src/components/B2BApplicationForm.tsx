import { FC, Fragment } from "react";
import { useRouter } from "next/router";
import { Input, Dropdown } from "./Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { getReferral } from "./ReferralWrapper";
import { useCookies } from "react-cookie";
import api from "api";
import { PhoneInput } from "./OrientationHeader";
import { Course } from "CourseService";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  [key: string]: string;
};

export const B2BApplicationForm: FC<{
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
}> = ({
  closeForm,
  form,
  extra_dropdowns,
  form_title,
  form_submit_button_text,
  form_success_message,
  pipedrive_lead_source,
  pipedrive_stage_id,
}) => {
  const [cookies] = useCookies();
  const router = useRouter();

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
      email: "",
      companyName: "",
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
        dc0a286b9fe00ab025597776b38364624d981bb9:
          router.locale === "de" ? "German" : "English",
        ...(data.phone && { phone: `+49 ${data.phone}` }),
        ...(extra_dropdowns &&
          extra_dropdowns.reduce(
            (acc, { pipedrive_custom_field_id }) => ({
              ...acc,
              [pipedrive_custom_field_id]: data[pipedrive_custom_field_id],
            }),
            {}
          )),
        ...(data.companyName && {
          f394b2ce194ed31252ece2d2f515d094f54269ba: data.companyName,
        }),
        first_name: data.firstName,
        last_name: data.lastName,
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
          "B2B",
          pipedrive_stage_id
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
  };

  return (
    <div className="max-w-2xl px-4 sm:px-10 py-4 sm:py-12">
      {isSubmitSuccessful ? (
        <div className="flex justify-between items-start">
          <p className="text-white text-xl font-bold">{form_success_message}</p>
          <button
            type="button"
            onClick={closeForm}
            className="ml-4 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          >
            <img src={"/assets/icons/close.svg"} alt="" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(submit)} className="h-full">
          <div className="flex justify-between mb-8 items-start">
            <p className="text-white text-xl font-bold">{form_title}</p>

            <button
              type="button"
              onClick={closeForm}
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
            disabled={isSubmitting || isSubmitSuccessful}
            type={"email"}
            label={`${i18n.formEmailLabel[locale]}`}
            error={errors.email}
            register={register("email", { required: true })}
          />

          <PhoneInput
            label={i18n.formPhoneLabel[locale]}
            disabled={isSubmitting}
            type="text"
            register={register("phone", { required: false })}
            error={errors.phone}
          />
          <Input
            label={i18n.companyNameLabel[locale]}
            type="text"
            disabled={isSubmitting}
            register={register("companyName", { required: false })}
            error={errors.companyName}
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
                      required: false,
                    })}
                    options={options.map(({ option_name, option_value }) => ({
                      item: option_name,
                      value: option_value,
                    }))}
                    autocomplete={false}
                  />
                </Fragment>
              )
            )}
          <div className="compass-tool-results__form__button">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`button button--small button--transparent-blue-alt ${
                !isValid || isSubmitting ? "button--disabled" : ""
              } ${isSubmitting ? "button--busy" : ""}`}
            >
              {form_submit_button_text}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
