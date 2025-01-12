import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { FormStyles, TalentAcceleratorForm } from "./TalentAcceleratorForm";
import { EducateToEmployForm } from "./EducateToEmployForm";

export const TalentAcceleratorFormDialog: FC<{
  form: string;
  isOpen: boolean;
  closeForm: () => void;
  extra_dropdowns: {
    label: string;
    pipedrive_custom_field_id: string;
    options: { option_name: string; option_value: string }[];
  }[];
  form_title: string;
  form_submit_button_text: string;
  form_success_message: string;
  pipedrive_stage_id: number;
  pipedrive_lead_source?: string;
  form_disclaimer: string;
  style: FormStyles;
  useEducateForm?: boolean | undefined;
}> = ({
  isOpen,
  closeForm,
  form,
  extra_dropdowns,
  form_title,
  form_submit_button_text,
  form_success_message,
  pipedrive_stage_id,
  pipedrive_lead_source,
  form_disclaimer,
  style,
  useEducateForm,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={closeForm}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-2 py-6 sm:p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-32"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-32"
            >
              <Dialog.Panel
                className={`w-full relative max-w-2xl transform rounded-lg ${style.backgroundColor} shadow-lg transition-all`}
              >
                {useEducateForm ? (
                  <EducateToEmployForm
                    closeForm={closeForm}
                    form={form}
                    extra_dropdowns={extra_dropdowns}
                    form_title={form_title}
                    form_submit_button_text={form_submit_button_text}
                    form_success_message={form_success_message}
                    pipedrive_lead_source={pipedrive_lead_source}
                    pipedrive_stage_id={pipedrive_stage_id}
                    form_disclaimer={form_disclaimer}
                    style={style}
                  />
                ) : (
                  <TalentAcceleratorForm
                    closeForm={closeForm}
                    form={form}
                    extra_dropdowns={extra_dropdowns}
                    form_title={form_title}
                    form_submit_button_text={form_submit_button_text}
                    form_success_message={form_success_message}
                    pipedrive_lead_source={pipedrive_lead_source}
                    pipedrive_stage_id={pipedrive_stage_id}
                    form_disclaimer={form_disclaimer}
                    style={style}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
