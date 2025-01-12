import { Dialog, Transition } from "@headlessui/react";
import { Course } from "CourseService";
import { FC, Fragment } from "react";
import { CourseApplicationForm } from "./CourseApplicationForm";

export const CourseApplicationFormDialog: FC<{
  course: Course;
  isOpen: boolean;
  bootcampName: string;
  closeForm: () => void;
}> = ({ course, isOpen, bootcampName, closeForm }) => {
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
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full relative max-w-2xl transform rounded-lg bg-indigo-700 shadow-lg transition-all">
                <CourseApplicationForm
                  closeForm={closeForm}
                  bootcampName={bootcampName}
                  course={course}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
