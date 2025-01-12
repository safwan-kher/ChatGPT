import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useCookies } from "react-cookie";
import Button from "./Button";
import FileDownloadForm from "./FileDownloadForm";
import { CoursePackageDownloadForm } from "./CoursePackageDownloadForm";

interface CareerCompassDownloadProps {
  title: string;
  subtitle: string;
  image: any;
  course_image: any;
  link: any;
  file: any;
  formTitle: string;
  emailInputTitle: string;
  buttonText: string;
  downloadButtonText: string;
  pipelineStageId: number;
}

export const CareerCompassDownload: FC<CareerCompassDownloadProps> = ({
  title,
  subtitle,
  image,
  course_image,
  link,
  file,
  formTitle,
  emailInputTitle,
  buttonText,
  downloadButtonText,
  pipelineStageId,
}) => {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const router = useRouter();
  const cookies = useCookies();
  return (
    <section className="full-width-outer mt-32 mb-16 bg-gray-100 py-8">
      <CoursePackageDownloadForm
        close={() => setFormIsOpen(false)}
        isOpen={formIsOpen}
        leadSource={`Download Tech Mentor Course Package ${router.locale.toUpperCase()}${
          cookies["ref"] ? ` - Referred by ${cookies["ref"]}` : ""
        }`}
        fileUrl={file.url}
        pipelineId={String(pipelineStageId)}
        linkText={downloadButtonText}
      />
      <div className="max-w-6xl mx-auto px-6 w-full flex flex-col lg:flex-row justify-between">
        <div className="lg:w-5/12 lg:-my-20 relative order-3 lg:order-none -mb-16">
          <svg
            width="462"
            height="345"
            viewBox="0 0 462 345"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inset-0 absolute w-full h-auto"
          >
            <path
              d="M1.49303 26.5065C1.35909 24.8172 2.65 23.3523 4.34278 23.2727L456.965 1.9957C458.726 1.91292 460.179 3.35917 460.103 5.1205L445.756 340.797C445.682 342.526 444.165 343.834 442.444 343.652L25.6109 299.68C24.174 299.529 23.0492 298.374 22.935 296.934L1.49303 26.5065Z"
              stroke="#EDE7FF"
              stroke-width="2"
            />
          </svg>
          <img
            style={{ clipPath: "url(#image-mask-small)" }}
            src={image.sizes.medium}
            className="relative inset-0 object-cover h-full w-full -ml-4 -mt-2 order-1 lg:order-none"
            alt=""
          />
        </div>

        <img
          src={course_image.sizes.medium}
          className="object-contain"
          alt={course_image.alt}
        />

        <div className="lg:w-4/12 order-2 lg:order-none mb-16 lg:mb-0 mt-6 lg:mt-0">
          <h2 className="text-5xl font-bold">{title}</h2>
          <p className="font-semibold text-3xl mt-2 mb-2">{subtitle}</p>
          <Button
            label={link}
            onClick={() => setFormIsOpen(true)}
            variant={"transparent-blue"}
          />
        </div>
      </div>
    </section>
  );
};
