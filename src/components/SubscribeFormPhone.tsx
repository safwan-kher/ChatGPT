import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "api";
import { useRouter } from "next/router";
import { getReferral } from "./ReferralWrapper";
import { useCookies } from "react-cookie";
import Button from "./Button";

const subscribeFormSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name" }),
  surname: z.string().min(1, { message: "Please enter your surname" }),
  email: z.string().email(),
  phone: z.string().min(1, { message: "Please enter your phone number" }),
});

type subscribeFormSchemaType = z.infer<typeof subscribeFormSchema>;

interface SubscribeFormProps {
  nameLabel: string;
  surnameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  submitButton: string;
  successMessage: string;
  pipedrive_stage_id: number;
  lead_source: string;
}

export const SubscribeFormPhone: FC<SubscribeFormProps> = ({
  nameLabel,
  surnameLabel,
  emailLabel,
  phoneLabel,
  submitButton,
  successMessage,
  pipedrive_stage_id,
  lead_source,
}) => {
  const router = useRouter();
  const [cookies] = useCookies();
  const onSubmit: SubmitHandler<subscribeFormSchemaType> = async (data) => {
    try {
      const customFields = {
        "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": `${lead_source}${getReferral(
          cookies["ref"]
        )}`,
        dc0a286b9fe00ab025597776b38364624d981bb9:
          router.locale === "de" ? "German" : "English",
        phone: data.phone,
      };
      await api.addPerson(
        data.name,
        data.surname,
        data.email,
        customFields,
        lead_source,
        pipedrive_stage_id
      );
    } catch (error) {
      console.error(error);
      setError("phone", {
        message: "Error submitting form. Please try again later.",
      });
    }
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<subscribeFormSchemaType>({
    resolver: zodResolver(subscribeFormSchema),
  });

  return (
    <>
      {isSubmitSuccessful ? (
        <p className="text-white mt-6 text-xl">{successMessage}</p>
      ) : (
        <form className="space-y-5 mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              placeholder={nameLabel}
              className={`bg-indigo-700 placeholder:uppercase border px-5 py-2 text-lg  ${
                errors.name
                  ? "border-red-500 text-red-500"
                  : "border-white text-white"
              } w-full rounded font-semibold placeholder:text-white`}
              type="text"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 mt-1 text-lg">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              placeholder={surnameLabel}
              className={`bg-indigo-700 placeholder:uppercase border px-5 py-2 text-lg ${
                errors.surname
                  ? "border-red-500 text-red-500"
                  : "border-white text-white"
              } w-full rounded font-semibold placeholder:text-white`}
              type="text"
              {...register("surname")}
            />
            {errors.surname && (
              <p className="text-red-500 mt-1 text-lg">
                {errors.surname.message}
              </p>
            )}
          </div>
          <div>
            <input
              placeholder={emailLabel}
              className={`bg-indigo-700 placeholder:uppercase border px-5 py-2 text-lg ${
                errors.email
                  ? "border-red-500 text-red-500"
                  : "border-white text-white"
              }  w-full rounded font-semibold placeholder:text-white`}
              type="text"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 mt-1 text-lg">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              placeholder={phoneLabel}
              className={`bg-indigo-700 placeholder:uppercase border px-5 py-2 text-lg ${
                errors.phone
                  ? "border-red-500 text-red-500"
                  : "border-white text-white"
              }  w-full rounded font-semibold placeholder:text-white`}
              type="text"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 mt-1 text-lg">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              busy={isSubmitting}
              disabled={isSubmitting}
              onClick={() => undefined}
              label={`${submitButton}`}
              variant="transparent-white"
            />
          </div>
        </form>
      )}
    </>
  );
};
