import { FC, useState } from "react";
import Button from "../Button";
import Modal from "react-modal";
import { SubscribeForm } from "components/SubscribeForm";

interface EventsFormProps {
  title: string;
  description: any;
  image: any;
  button_text: string;
  form_title: string;
  name_label: string;
  surname_label: string;
  birthdate_label: string;
  email_label: string;
  form_submit_button: string;
  success_message: string;
  form_image: any;
  lead_source: string;
  pipedrive_stage_id: number;
}

Modal.setAppElement("#__next");

export const EventsForm: FC<EventsFormProps> = ({
  title,
  description,
  image,
  button_text,
  form_title,
  name_label,
  surname_label,
  email_label,
  form_submit_button,
  success_message,
  form_image,
  lead_source,
  pipedrive_stage_id,
}) => {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const toggleForm = () => {
    setFormIsOpen((cur) => !cur);
  };
  return (
    <>
      <Modal
        style={{
          overlay: {
            zIndex: 20000,
          },
          content: {
            border: "none",
            borderRadius: "none",
            padding: "none",
            backgroundColor: "transparent",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
        }}
        isOpen={formIsOpen}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="max-w-6xl w-full px-2 relative">
            <img
              src="/assets/floaters/bolt.png"
              className="absolute z-20 -top-10 lg:-top-20 left-6 w-24 lg:w-32"
              alt=""
            />
            <div
              style={{ clipPath: "url(#image-mask-small-mirror)" }}
              className="w-full bg-indigo-700 px-12 lg:px-24 pt-20 pb-40 relative"
            >
              <div className="flex">
                <h2 className="text-white text-4xl lg:text-5xl font-semibold uppercase">
                  {form_title}
                </h2>
                <button className="flex" onClick={() => setFormIsOpen(false)}>
                  <svg
                    className="ml-16 w-10 h-10"
                    viewBox="0 0 43 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="21.2211"
                      cy="21.2211"
                      r="21.2211"
                      fill="white"
                    />
                    <rect
                      x="8.00781"
                      y="32.4561"
                      width="34.9524"
                      height="2.4966"
                      rx="1.2483"
                      transform="rotate(-45 8.00781 32.4561)"
                      fill="#481BFF"
                    />
                    <rect
                      x="9.25391"
                      y="7.49023"
                      width="34.9524"
                      height="2.4966"
                      rx="1.2483"
                      transform="rotate(45 9.25391 7.49023)"
                      fill="#481BFF"
                    />
                  </svg>
                </button>
              </div>
              <div className="relative">
                <div className="lg:max-w-sm">
                  <SubscribeForm
                    nameLabel={name_label}
                    surnameLabel={surname_label}
                    emailLabel={email_label}
                    submitButton={form_submit_button}
                    successMessage={success_message}
                    lead_source={lead_source}
                    pipedrive_stage_id={pipedrive_stage_id}
                  />
                </div>
              </div>
            </div>
            <div className="absolute top-1/3 -right-16">
              <img
                style={{ clipPath: "url(#background-mask)" }}
                src={form_image.sizes.medium}
                className="w-[400px] h-[300px] object-cover hidden lg:block"
                alt=""
              />
            </div>
          </div>
        </div>
      </Modal>
      <section className="mt-16 pb-16 max-w-5xl mx-auto w-full relative">
        <div className="lg:w-1/2 relative z-20 px-4 mb-8 lg:mb-0">
          <h2 className="text-4xl lg:text-6xl font-bold">{title}</h2>
          <div
            className="text-lg mt-4 mb-4"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
          <Button
            onClick={toggleForm}
            label={button_text}
            variant="transparent-blue"
          />
        </div>
        <div className="lg:absolute pl-4 inset-y-0 right-0 lg:w-3/5">
          <div className="h-full w-full relative overflow-x-hidden lg:overflow-visible">
            <svg
              className="w-full translate-x-32 lg:translate-x-0"
              viewBox="0 0 546 457"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M545.444 4.67024C545.735 2.2221 543.764 0.0954752 541.301 0.200664L3.99166 23.1459C1.78636 23.24 0.0741863 25.1028 0.165781 27.3082L15.4149 394.475C15.4961 396.429 16.9778 398.038 18.9183 398.279L487.566 456.504C489.766 456.778 491.769 455.209 492.031 453.008L545.444 4.67024Z"
                fill="#F3EFFF"
              />
            </svg>
            <div className="absolute lg:-right-16 lg:left-1/4 inset-y-0 flex justify-end items-center">
              <svg
                className="absolute"
                viewBox="0 0 447 317"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M446.5 4.66895C446.5 2.73595 444.933 1.16895 443 1.16895H4.59457C2.53943 1.16895 0.926575 2.93129 1.10828 4.97838L28.437 312.885C28.6133 314.871 30.4119 316.309 32.3888 316.044L443.466 260.878C445.203 260.645 446.5 259.162 446.5 257.409V4.66895Z"
                  stroke="#481BFF"
                />
              </svg>
              <img
                style={{ clipPath: "url(#image-mask)" }}
                className="object-cover aspect-[4/3]"
                src={image.sizes.medium}
                alt={image.alt}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
