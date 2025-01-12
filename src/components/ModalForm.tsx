import { FC, useState } from "react";

import Modal from "react-modal";
import { SubscribeFormPhone } from "./SubscribeFormPhone";
Modal.setAppElement("#__next");

type ModalFormProps = {
  isOpen: boolean;
  close: () => void;
  form_title: string;
  name_label: string;
  surname_label: string;
  email_label: string;
  phone_label: string;
  submit_button: string;
  success_message: string;
  pipedrive_stage_id: number;
  lead_source: string;
  form_image: any;
};

export const ModalForm: FC<ModalFormProps> = ({
  isOpen,
  close,
  form_title,
  name_label,
  surname_label,
  email_label,
  phone_label,
  submit_button,
  success_message,
  pipedrive_stage_id,
  lead_source,
  form_image,
}) => {
  return (
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
      isOpen={isOpen}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="max-w-4xl w-full px-2 relative">
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
              <button className="flex" onClick={close}>
                <svg
                  className="ml-16 w-10 h-10"
                  viewBox="0 0 43 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="21.2211" cy="21.2211" r="21.2211" fill="white" />
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
                <SubscribeFormPhone
                  nameLabel={name_label}
                  surnameLabel={surname_label}
                  emailLabel={email_label}
                  phoneLabel={phone_label}
                  submitButton={submit_button}
                  successMessage={success_message}
                  pipedrive_stage_id={pipedrive_stage_id}
                  lead_source={lead_source}
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
  );
};
