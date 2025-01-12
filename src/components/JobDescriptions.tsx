import { FC, useState } from "react";
import Button from "./Button";

interface JobDescriptionsProps {
  title: string;
  jobs: any[];
  description: any;
  image: any;
  link_path: string;
  link_text: string;
  form_title: string;
  name_label: string;
  surname_label: string;
  email_label: string;
  phone_label: string;
  submit_button: string;
  success_message: string;
  pipedrive_stage_id: number;
  lead_source: string;
  form_image: string[];
}

export const JobDescriptions: FC<JobDescriptionsProps> = ({
  title,
  jobs,
  image,
  description,
  link_text,
  link_path,
}) => {
  const [selectedJob, setSelectedJob] = useState(0);

  return (
    <section className="mt-16 mb-16 full-width-outer bg-gray-100 relative">
      <img
        src="/assets/floaters/stairs.png"
        className="absolute -top-8 right-8 lg:right-16"
        alt=""
      />
      <div
        style={{ clipPath: "polygon(0% 50%, 100% 0%, 100% 100%, 0 100%)" }}
        className="absolute bottom-0 bg-white w-full h-[60px] lg:h-[400px]"
      ></div>
      <div className="max-w-6xl mx-auto px-4 w-full py-16">
        <h2 className="text-4xl lg:text-6xl font-bold w-8/12">{title}</h2>
        <ul className="flex flex-col lg:flex-row flex-wrap items-center justify-center gap-7 mt-16">
          {jobs.map(({ job }, index) => (
            <li key={index} className="flex flex-col items-center">
              <button
                className={`${
                  selectedJob === index
                    ? "bg-indigo-700 text-white"
                    : "bg-white text-black"
                } px-6 py-2.5 rounded uppercase font-semibold text-lg`}
                onClick={() => setSelectedJob(index)}
              >
                {job.name}
              </button>
              {selectedJob === index && (
                <div className="bg-white p-8 mt-4 rounded lg:hidden block relative">
                  <button onClick={() => setSelectedJob(undefined)}>
                    <svg
                      className="absolute -top-4 right-2"
                      width="34"
                      height="34"
                      viewBox="0 0 34 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="17" cy="17" r="17" fill="#481BFF" />
                      <rect
                        x="6.41406"
                        y="26"
                        width="28"
                        height="2"
                        rx="1"
                        transform="rotate(-45 6.41406 26)"
                        fill="white"
                      />
                      <rect
                        x="7.41406"
                        y="6"
                        width="28"
                        height="2"
                        rx="1"
                        transform="rotate(45 7.41406 6)"
                        fill="white"
                      />
                    </svg>
                  </button>

                  <h3 className="uppercase text-indigo-700 text-2xl font-semibold">
                    {jobs[selectedJob].job.name}
                  </h3>
                  <div
                    className="text-lg mt-2"
                    dangerouslySetInnerHTML={{
                      __html: jobs[selectedJob].job.description,
                    }}
                  ></div>
                </div>
              )}
            </li>
          ))}
        </ul>
        {!Number.isNaN(Number(selectedJob)) && (
          <div className="mt-16 bg-white p-8 rounded hidden lg:block">
            <h3 className="uppercase text-indigo-700 text-2xl font-semibold">
              {jobs[selectedJob].job.name}
            </h3>
            <div
              className="text-lg mt-2"
              dangerouslySetInnerHTML={{
                __html: jobs[selectedJob].job.description,
              }}
            ></div>
          </div>
        )}

        <div className="mt-24 relative">
          <div className="relative">
            <img
              src="/assets/floaters/pin.png"
              className="absolute -top-10 left-10 w-20 lg:w-auto"
              alt=""
            />
            <img
              className="rounded-2xl aspect-video object-cover"
              src={image.sizes.large}
              alt=""
            />
          </div>
          <div className="lg:absolute flex items-center justify-center -translate-y-8 lg:justify-end lg:top-0 lg:bottom-0 lg:right-12">
            <div className="bg-white p-8 rounded-xl w-[400px]">
              <p className="text-4xl lg:text-5xl font-semibold mb-10">
                {description}
              </p>
              <div className="flex w-full justify-center">
                <Button
                  label={link_text}
                  link={link_path}
                  variant="transparent-blue"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
