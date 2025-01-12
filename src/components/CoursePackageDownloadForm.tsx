import { FC, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "./OrientationHeader";
import { useRouter } from "next/router";
import { Input } from "./Form";
import { createPersonAndDeal } from "createPersonAndDeal";
import api from "api";
import { useCookies } from "react-cookie";

const formSchema = z.object({
  firstName: z.string().min(1),
  email: z.string().min(1).email(),
  phone: z.string().optional(),
});

type FormSchema = z.TypeOf<typeof formSchema>;

export const CoursePackageDownloadForm: FC<{
  isOpen: boolean;
  close: () => void;
  leadSource: string;
  optionalPipeDriveLeadSource?: string;
  fileUrl: string;
  pipelineId: string;
  linkText: string;
}> = ({
  isOpen,
  close,
  leadSource,
  optionalPipeDriveLeadSource,
  pipelineId,
  fileUrl,
  linkText,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });
  const router = useRouter();
  const [cookies] = useCookies();
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const locale = router.locale === "en" ? "en" : "de";

  const i18n = {
    nameLabel: {
      en: "First Name*",
      de: "Vorname*",
    },
    emailLabel: {
      en: "Email*",
      de: "E-Mail-Adresse*",
    },
    phoneLabel: {
      en: "Phone",
      de: "Telefonnummer",
    },
    title: {
      en: "Interested in diving deeper into this course?",
      de: "Möchtest du mehr über unser vielfältiges Kursangebot erfahren?",
    },
    subtitle: {
      en: "Simply share a few details with us and gain instant access to our comprehensive course package.",
      de: "Teile uns deine Kontaktdaten mit und erhalte sofort Zugang zu unserem umfangreichen Informationsmaterial.",
    },
    cta: {
      en: "Your journey to digital learning STARTS HERE!",
      de: "Deine Reise in die Welt des digitalen Lernens beginnt hier!",
    },
    button: {
      en: "DOWNLOAD",
      de: "DOWNLOAD",
    },
    hint: {
      en: "By clicking download I agree that StartSteps can send me an educational email — but I can unsubscribe anytime.",
      de: "Mit einem Klick auf Herunterladen stimme ich zu, dass StartSteps mir eine Bildungs-E-Mail senden darf — ich kann mich jedoch jederzeit abmelden.",
    },
  };

  const submit: SubmitHandler<FormSchema> = async (data) => {
    const language = locale === "de" ? "Deutsch" : "English";
    (window as any).ttq.track("SubmitForm");
    const customFields = {
      "19ddc486147c0bed2f2d0ca5a540854ef33bdf69":
        optionalPipeDriveLeadSource ?? leadSource,
      dc0a286b9fe00ab025597776b38364624d981bb9: language,
      ...(data.phone && { phone: `+49 ${data.phone}` }),
    };
    const customData = {
      content_name: "File Download",
      file_url: fileUrl,
      language: language,
    };

    const fb2 = api.trackFbEvent({
      eventName: "course package event",
      externalId: cookies.session,
      firstName: data.firstName,
      email: data.email,
      ...(data.phone && { phone: `+49 ${data.phone}` }),
      customDataObj: customData,
      customEvent: true,
    });

    const deal = createPersonAndDeal({
      firstName: data.firstName,
      lastName: "",
      email: data.email,
      pipedriveStageId: pipelineId ? pipelineId : "8",
      customFields: customFields,
      courseName: leadSource,
    });

    try {
      await Promise.allSettled([fb2, deal]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        className="relative z-[1000]"
        onClose={() => close()}
        initialFocus={nameInputRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm"
            aria-hidden="true"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-32"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-32"
        >
          <div className="fixed inset-0 w-screen items-center overflow-y-auto justify-center py-8 px-4">
            <div className="flex min-h-full items-center justify-center">
              <Dialog.Panel className="mx-auto max-w-[845px] w-full relative">
                <img
                  src="/assets/phone-lg.png"
                  alt="phone"
                  className="absolute left-0 z-10 top-10 hidden lg:block"
                />
                <div className="max-w-[739px] w-full shadow-xl ml-auto rounded-2xl">
                  <div className="bg-white rounded-t-2xl relative">
                    <button
                      className="absolute w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center -top-5 right-5 ring-4 ring-white"
                      onClick={() => close()}
                    >
                      <p className="text-white font-[700] text-3xl">X</p>
                    </button>
                    <div className="max-w-[602px] ml-auto p-9">
                      <Dialog.Title
                        className={`text-indigo-700 font-[700] text-3xl sm:text-4xl`}
                      >
                        {i18n.title[locale]}
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="bg-indigo-700 rounded-b-2xl">
                    <div className="max-w-[602px] ml-auto px-4 py-9 sm:p-9">
                      {isSubmitSuccessful ? (
                        <div className="">
                          <a
                            className="text-white font-semibold text-2xl"
                            href={fileUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {linkText}
                          </a>
                        </div>
                      ) : (
                        <>
                          <p className="text-white font-medium text-xl sm:text-2xl">
                            {i18n.subtitle[locale]}
                          </p>
                          <form
                            className="mt-8"
                            onSubmit={handleSubmit(submit)}
                          >
                            <Input
                              disabled={isSubmitting || isSubmitSuccessful}
                              type={"text"}
                              label={`${i18n.nameLabel[locale]}`}
                              error={errors.firstName}
                              register={register("firstName")}
                              ref={nameInputRef}
                            />
                            <Input
                              disabled={isSubmitting || isSubmitSuccessful}
                              type={"text"}
                              label={`${i18n.emailLabel[locale]}`}
                              error={errors.email}
                              register={register("email")}
                            />
                            <PhoneInput
                              disabled={isSubmitting || isSubmitSuccessful}
                              type={"text"}
                              label={`${i18n.phoneLabel[locale]}`}
                              error={errors.phone}
                              register={register("phone")}
                              autocomplete={false}
                              light={false}
                            />
                            <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 items-center">
                              <p className="text-white font-[700] text-3xl">
                                {i18n.cta[locale]}
                              </p>
                              <button
                                disabled={isSubmitting || isSubmitSuccessful}
                                className={`bg-white text-indigo-700 rounded font-[700] text-center uppercase px-5 pt-[9px] pb-[7px] text-lg tracking-widest disabled:cursor-wait disabled:animate-pulse`}
                                type="submit"
                              >
                                {i18n.button[locale]}
                              </button>
                            </div>
                            <p className="text-white text-xs mt-4">
                              {i18n.hint[locale]}
                            </p>
                          </form>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
