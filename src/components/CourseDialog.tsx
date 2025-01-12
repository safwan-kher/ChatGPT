import { Dialog, Transition } from "@headlessui/react";
import { Course } from "CourseService";
import { FC, Fragment } from "react";
import { UrlObject } from "url";
import { useRouter } from "next/router";
import { NewCourseDetailCard } from "./NewCourseDetailCard";

export const CourseDialog: FC<{
  course: Course;
  isOpen: boolean;
  bootcampName: string;
  bootcampLogo: string;
  bootcampSlug: string;
  openForm: () => void;
}> = ({
  course,
  isOpen,
  bootcampName,
  bootcampLogo,
  bootcampSlug,
  openForm,
}) => {
  const router = useRouter();

  const closeDialog = (): void => {
    const { selected_course, ...query } = router.query;
    router.push({ query }, undefined, { shallow: true });
  };

  const open = (): void => {
    closeDialog();
    openForm();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={closeDialog}>
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
              <Dialog.Panel className="w-full relative max-w-5xl transform rounded-lg bg-white shadow-lg transition-all">
                <button
                  type="button"
                  onClick={closeDialog}
                  className="sm:absolute ml-auto mr-2 -mt-4 sm:m-0 w-10 h-10 rounded-full flex items-center justify-center bg-indigo-700 text-white -top-5 -right-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <NewCourseDetailCard
                  course={course}
                  bootcampName={bootcampName}
                  bootcampLogo={bootcampLogo}
                  bootcampSlug={bootcampSlug}
                  openForm={open}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
