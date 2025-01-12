import { FC } from "react";
import Button from "./Button";

interface QuestionsProps {
  title: string;
  image: any;
  phone_number_label: string;
  phone_number: string;
  email_label: string;
  email: string;
  fax_number_1_label: string;
  fax_number_1: string;
  fax_number_2_label: string;
  fax_number_2: string;
}

enum ContactType {
  PHONE,
  EMAIL,
}

const Contact: FC<{
  label: string;
  contact: string;
  alternativeStyle: boolean;
  type: ContactType;
}> = ({ label, contact, alternativeStyle, type }) => {
  return (
    <div>
      <p className="text-xl">{label}</p>
      <a
        href={
          type === ContactType.EMAIL ? `mailto:${contact}` : `tel:${contact}`
        }
        className={`${
          alternativeStyle
            ? "bg-teal-400 text-indigo-700"
            : "bg-indigo-700 text-white"
        } font-bold px-5 py-2.5 rounded mt-2 block text-lg text-center lg:text-left`}
      >
        {contact}
      </a>
    </div>
  );
};

export const Questions: FC<QuestionsProps> = ({
  title,
  image,
  phone_number_label,
  phone_number,
  email_label,
  email,
  fax_number_1_label,
  fax_number_1,
  fax_number_2_label,
  fax_number_2,
}) => {
  return (
    <section className="my-24 max-w-6xl mx-auto w-full px-4 flex gap-4 flex-col lg:flex-row justify-between lg:items-center relative overflow-x-hidden">
      <img
        className="w-40 lg:w-52 absolute lg:relative -right-16 top-8 lg:top-0 lg:-right-0 lg:block"
        src={image.sizes.medium}
        alt={image.alt}
      />
      <h2 className="text-4xl lg:text-5xl font-bold w-long-container lg:w-auto">
        {title}
      </h2>
      <div className="grid flex-shrink-0 lg:grid-cols-2 gap-4 w-long-container lg:w-auto">
        <Contact
          label={phone_number_label}
          contact={phone_number}
          alternativeStyle={false}
          type={ContactType.PHONE}
        />
        <Contact
          label={email_label}
          contact={email}
          alternativeStyle={false}
          type={ContactType.EMAIL}
        />
        <Contact
          label={fax_number_2_label}
          contact={fax_number_2}
          alternativeStyle={true}
          type={ContactType.PHONE}
        />
        <Contact
          label={fax_number_1_label}
          contact={fax_number_1}
          alternativeStyle={true}
          type={ContactType.PHONE}
        />
      </div>
    </section>
  );
};
