import { FC } from "react";
import { useRouter } from "next/router";
import { Input, Dropdown } from "./Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { getReferral } from "./ReferralWrapper";
import { useCookies } from "react-cookie";
import { PhoneInput } from "./OrientationHeader";
import api from "api";

type FormData = {
  firstName: string;
  lastName: string;
  registered: string;
  email: string;
  phone: string;
  [key: string]: string;
};

export const TechMentorForm: FC<{
  tech_mentor_form: any;
  extra_dropdowns: any[];
}> = ({ tech_mentor_form, extra_dropdowns }) => {
  const [cookies] = useCookies();
  const router = useRouter();

  const locale = router.locale === "en" ? "en" : "de";

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

  const submit: SubmitHandler<FormData> = async (data) => {
    try {
      const customFields = {
        "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": `${
          tech_mentor_form.pipedrive_lead_source
        }${getReferral(cookies["ref"])}`,
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
          tech_mentor_form.pipedrive_lead_source,
          tech_mentor_form.pipedrive_stage_id
        ),
      ]);
    } catch (error) {
      setError("root", {
        message: "Error submitting form. Please try again later.",
      });
    }
  };

  const sendFbEvent = async () => {
    await api.trackFbEvent({
      eventName: "Registered - Form Selection",
      externalId: cookies.session,
      customDataObj: {},
      customEvent: true,
    });
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
    <div className="relative">
      <div className="absolute top-16 bottom-16 bg-gray-50 inset-x-0"></div>
      <div className="max-w-2xl lg:max-w-4xl mx-auto w-full px-4 relative">
        <div
          id="contact"
          className="bg-white rounded-lg border border-gray-200 shadow-xl p-4 pt-8 lg:p-12 scroll-mt-24"
        >
          {isSubmitSuccessful ? (
            <div className="flex flex-col items-center">
              <img src={tech_mentor_form.success_icon.sizes.medium} />
              <p className="text-center lg:text-left font-bold-x text-3xl">
                {tech_mentor_form.success_title}
              </p>
              <p className="text-center lg:text-left mt-6 text-2xl">
                {tech_mentor_form.success_message}
              </p>
              <button
                className="block mt-7 bg-indigo-700 uppercase px-6 py-[11px] rounded-[4px] text-white font-[700] tracking-wider text-center"
                onClick={() =>
                  (window as any)?.Calendly?.initPopupWidget({
                    url: "https://calendly.com/d/crr-xxj-qhs/let-s-chat-startsteps",
                  })
                }
              >
                {tech_mentor_form.consultation_call}
              </button>
            </div>
          ) : (
            <>
              <h2
                className="text-2xl lg:text-3xl space-y-2"
                dangerouslySetInnerHTML={{ __html: tech_mentor_form.title }}
              ></h2>

              <form
                onSubmit={handleSubmit(submit)}
                className="lg:grid grid-cols-2 gap-4 mt-8 items-end"
              >
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
                <Input
                  disabled={isSubmitting || isSubmitSuccessful}
                  type={"email"}
                  light={true}
                  label={`${i18n.formEmailLabel[locale]}*`}
                  error={errors.email}
                  register={register("email", { required: true })}
                />
                <PhoneInput
                  disabled={isSubmitting || isSubmitSuccessful}
                  type={"text"}
                  light={true}
                  label={`${i18n.formPhoneLabel[locale]}*`}
                  error={errors.phone}
                  register={register("phone", { required: true })}
                  autocomplete={false}
                />
                <div>
                  <Dropdown
                    disabled={isSubmitting || isSubmitSuccessful}
                    label={`${i18n.altFormRegisteredLabel[locale]}*`}
                    error={errors.registered}
                    light={true}
                    register={register("registered", {
                      validate: (val) =>
                        ["yes", "soon"].includes(val.toLowerCase())
                          ? undefined
                          : i18n.altFormRegisteredError[locale],
                      onChange(event) {
                        if (event.target.value === "Yes") {
                          sendFbEvent();
                        }
                      },
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
                </div>
                {extra_dropdowns &&
                  extra_dropdowns.map(
                    ({ label, pipedrive_custom_field_id, options }, index) => (
                      <div key={index}>
                        <Dropdown
                          light={true}
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
                      </div>
                    )
                  )}
                {errors.root && (
                  <p className="text-sm text-red-600 mt-4">
                    {errors.root.message}
                  </p>
                )}
                <div className="flex justify-center col-span-2 mt-4">
                  <button
                    disabled={isSubmitting}
                    className={`button button--transparent button--wide ${
                      isSubmitting ? "button--busy" : ""
                    }`}
                    type="submit"
                  >
                    {tech_mentor_form.submit_button}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
