import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useCookies } from "react-cookie";
import Button from "./Button";
import FileDownloadForm from "./FileDownloadForm";
import { CoursePackageDownloadForm } from "./CoursePackageDownloadForm";

type FileDownloadProps = {
  title: string;
  description: string;
  button: string;
  image: string;
  file: string;
  download_title: string;
  email_title: string;
  download_button: string;
  download_link_text: string;
  pipeline_id: number;
  pipedriveEventName: string;
};

export const FileDownload: FC<FileDownloadProps> = ({
  title,
  description,
  button,
  image,
  file,
  download_title,
  email_title,
  download_button,
  download_link_text,
  pipeline_id,
  pipedriveEventName,
}) => {
  const [downloadFormIsVisible, setDownloadFormIsVisible] = useState(false);
  const [cookies] = useCookies();
  const router = useRouter();
  return (
    <>
      <div className="row">
        <div className="col-1 col-0-sm" />
        <div className="col-10 col-12-sm">
          <div className="community__bottom slider slider-delay-3">
            <div className="row">
              <div className="col-3 col-12-sm">
                <img
                  className="community__bottom__floater"
                  src={image ? image : `/assets/floaters/book.png`}
                  alt=""
                />
              </div>
              <div className="col-4 col-12-sm">
                <div className="community__bottom__title">{title}</div>
                <div className="community__bottom__title-sub">
                  {description}
                </div>
              </div>
              <div className="col-5 col-12-sm">
                <div className="community__bottom__button">
                  <Button
                    label={button}
                    onClick={() => {
                      setDownloadFormIsVisible(true);
                    }}
                    variant="transparent-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 col-0-sm" />
      </div>

      <CoursePackageDownloadForm
        close={() => setDownloadFormIsVisible(false)}
        isOpen={downloadFormIsVisible}
        leadSource={`${pipedriveEventName} ${router.locale.toUpperCase()}${
          cookies["ref"] ? ` - Referred by ${cookies["ref"]}` : ""
        }`}
        fileUrl={file}
        pipelineId={String(pipeline_id)}
        linkText={download_link_text}
      />
    </>
  );
};
