import React, { FC } from "react";
import Head from "next/head";
import Script from "next/script";
import { InferGetStaticPropsType, GetStaticProps } from "next";
import api from "../src/api";
import { IGetLayout } from "../src/components/DefaultLayout";
import utils from "../src/utils";
import { useRouter } from "next/router";
import { Input, TextArea, Checkbox } from "../src/components/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { getReferral } from "../src/components/ReferralWrapper";
import { useCookies } from "react-cookie";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  terms: boolean;
  consent: boolean;
};

const ContactPage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content }) => {
  const router = useRouter();
  const [cookies] = useCookies();

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
      subject: "",
      message: "",
      terms: false,
      consent: false,
    },
  });

  const submit: SubmitHandler<FormData> = async (data) => {
    try {
      const customFields = {
        "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": `Contact${getReferral(
          cookies["ref"]
        )}`,
        dc0a286b9fe00ab025597776b38364624d981bb9:
          router.locale === "de" ? "Deutsch" : "English",
        "71ca4b983574f88b475c4ec915836606676ddd5e": data.subject,
        "4c7f032479a698cac32406114330602b5802567f": data.message,
        ff8fcfd408c0714269993b513855617459da45d6: data.consent ? "Yes" : "No",
      };

      (window as any)?.ttq?.identify({
        email: data.email,
      });

      (window as any)?.ttq?.track("SubmitForm");

      const customData = {
        language: router.locale === "de" ? "Deutsch" : "English",
      };

      await Promise.all([
        api.trackFbEvent({
          eventName: "Lead",
          externalId: cookies.session,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          customDataObj: customData,
        }),

        api.addPerson(
          data.firstName,
          data.lastName,
          data.email,
          customFields,
          "Contact",
          1
        ),
      ]);
    } catch (e) {
      setError("message", {
        message: "Unable to submit form. Please try again later.",
      });
      console.error(e);
    }
  };

  const {
    contact_title,
    contact_text,
    contact_first_name_input_label,
    contact_last_name_input_label,
    contact_email_input_label,
    contact_subject_input_label,
    contact_message_input_label,
    contact_checkbox_label_terms_pre,
    contact_checkbox_label_terms_link,
    contact_checkbox_label_terms_link_label,
    contact_checkbox_label_terms_post,
    contact_checkbox_label_consent,
    contact_button_label,
    contact_block_title,
    contact_block_button_label,
    contact_message,
  } = content;

  const checkboxLabelTerms = `${contact_checkbox_label_terms_pre} <a href="${contact_checkbox_label_terms_link}" target="_blank">${contact_checkbox_label_terms_link_label}</a> ${contact_checkbox_label_terms_post}`;

  return (
    <div className="contact slider-block slider-block-first-load">
      <Head>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </Head>
      <Script src="https://assets.calendly.com/assets/external/widget.js" />
      <div className=" overflow-hidden">
        <div className="pt-16 lg:pt-32 py-32">
          <div className="max-w-3xl lg:max-w-6xl mx-auto px-0 lg:px-4">
            <div className="lg:px-12 pt-16 lg:pt-0 flex justify-between">
              <div className="px-4 lg:px-0 lg:w-7/12">
                <h1 className="text-indigo-700 font-bold-x text-5xl uppercase">
                  {contact_title}
                </h1>
                <div
                  className="text-black text-xl space-y-6 contact-rich-text pt-4"
                  dangerouslySetInnerHTML={{
                    __html: utils.cleanText(contact_text, true),
                  }}
                />
              </div>
              <div className="hidden z-10 lg:block p-6 rounded-xl bg-indigo-600 w-[40%] -mb-48">
                <div className="flex justify-center">
                  <img src="/assets/phone.png" alt="" />
                </div>
                <p className="text-center text-white font-bold-x text-xl mt-3">
                  {content.card_text}
                </p>
                <button
                  onClick={() => {
                    (window as any).Calendly.initPopupWidget({
                      url: "https://calendly.com/d/crr-xxj-qhs/let-s-chat-startsteps",
                    });
                  }}
                  className="bg-white hover:bg-indigo-300 transition-colors duration-300 uppercase text-indigo-700 mt-4 text-lg font-bold-x tracking-widest w-full rounded px-5 py-2"
                >
                  {contact_block_button_label}
                </button>
                <a
                  target="_blank"
                  href={`https://wa.me/${content.whatsapp_number}`}
                  className="bg-white block hover:bg-indigo-300 text-center transition-colors duration-300 uppercase text-indigo-700 text-lg font-bold-x tracking-widest w-full rounded px-5 py-2 mt-3"
                >
                  {content.whatsapp_button_label}
                </a>
              </div>
            </div>
            <div className="bg-indigo-700 relative p-5 lg:p-12 lg:rounded-3xl mt-12 flex flex-col lg:flex-row items-center lg:items-end">
              <form onSubmit={handleSubmit(submit)} className="lg:w-[55%]">
                <div className="row">
                  <div className="col-6 col-12-sm">
                    <Input
                      label={`${contact_first_name_input_label}*`}
                      type="text"
                      disabled={isSubmitting || isSubmitSuccessful}
                      register={register("firstName", { required: true })}
                      error={errors.firstName}
                    />
                  </div>
                  <div className="col-6 col-12-sm">
                    <Input
                      label={`${contact_last_name_input_label}*`}
                      type="text"
                      disabled={isSubmitting || isSubmitSuccessful}
                      register={register("lastName", { required: true })}
                      error={errors.lastName}
                    />
                  </div>
                </div>
                <Input
                  label={`${contact_email_input_label}*`}
                  type="email"
                  disabled={isSubmitting || isSubmitSuccessful}
                  register={register("email", {
                    required: true,
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                  error={errors.email}
                />
                <Input
                  label={`${contact_subject_input_label}*`}
                  type="text"
                  disabled={isSubmitting || isSubmitSuccessful}
                  register={register("subject", { required: true })}
                  error={errors.subject}
                />
                <TextArea
                  label={`${contact_message_input_label}*`}
                  disabled={isSubmitting || isSubmitSuccessful}
                  register={register("message", { required: true })}
                  error={errors.message}
                />
                <div className="contact__checkboxes">
                  <Checkbox
                    label={`${checkboxLabelTerms}*`}
                    disabled={isSubmitting || isSubmitSuccessful}
                    register={register("terms", { validate: Boolean })}
                    error={errors.terms}
                  />
                  <Checkbox
                    label={`${contact_checkbox_label_consent}`}
                    disabled={isSubmitting || isSubmitSuccessful}
                    register={register("consent")}
                    error={errors.consent}
                  />
                </div>
                {isSubmitSuccessful ? (
                  <div className="contact__message">{contact_message}</div>
                ) : (
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={`button button--small button--transparent-blue-alt ${
                      !isValid || isSubmitting ? "button--disabled" : ""
                    } ${isSubmitting ? "button--busy" : ""}`}
                  >
                    {contact_button_label}
                  </button>
                )}
              </form>
              <div className="hidden lg:block absolute w-[600px] left-[700px]">
                <div className="relative">
                  <svg
                    width="462"
                    height="345"
                    viewBox="0 0 462 345"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.49303 26.5065C1.35909 24.8172 2.65 23.3523 4.34278 23.2727L456.965 1.9957C458.726 1.91292 460.179 3.35917 460.103 5.1205L445.756 340.797C445.682 342.526 444.165 343.834 442.444 343.652L25.6109 299.68C24.174 299.529 23.0492 298.374 22.935 296.934L1.49303 26.5065Z"
                      stroke="#EDE7FF"
                      stroke-width="2"
                    />
                  </svg>

                  <img
                    style={{ clipPath: "url(#image-mask-small-mirror)" }}
                    src={content.image.sizes.medium}
                    className="absolute inset-0 object-cover h-full w-full ml-4"
                    alt=""
                  />
                </div>
              </div>
              <div className="block lg:hidden p-6 rounded-xl bg-indigo-600 mt-8 -mb-64">
                <div className="flex justify-center">
                  <img src="/assets/phone.png" alt="" />
                </div>
                <p className="text-center text-white font-bold-x text-xl mt-3">
                  {content.card_text}
                </p>
                <button
                  onClick={() => {
                    (window as any).Calendly.initPopupWidget({
                      url: "https://calendly.com/d/crr-xxj-qhs/let-s-chat-startsteps",
                    });
                  }}
                  className="bg-white hover:bg-indigo-300 transition-colors duration-300 uppercase text-indigo-700 mt-4 text-lg font-bold-x tracking-widest w-full rounded px-5 py-2"
                >
                  {contact_block_button_label}
                </button>
                <a
                  target="_blank"
                  href={`https://wa.me/${content.whatsapp_number}`}
                  className="bg-white block hover:bg-indigo-300 text-center transition-colors duration-300 uppercase text-indigo-700 text-lg font-bold-x tracking-widest w-full rounded px-5 py-2 mt-3"
                >
                  {content.whatsapp_button_label}
                </a>
              </div>
            </div>
            <div className="px-4 lg:px-12 flex items-center text-xl mt-72 lg:mt-8">
              <img src="/assets/plane.png" className="h-12 mr-4" alt="" />
              <div>
                <p>{content.extra_information}</p>
                <a
                  className="text-indigo-700 font-semibol"
                  href="mailto:info@startsteps.org"
                >
                  info@startsteps.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ content: any }> = async (
  context
) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  const slug = locale === "en" ? "contact" : "kontakt";
  const content = (await api.getContent(slug, locale)) as any;
  return {
    props: {
      content: content.content,
      title: content.title,
      description: content.description,
      locale: context.locale,
    },
  };
};

export default ContactPage;
