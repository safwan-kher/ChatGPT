import { FC, ReactElement, useContext } from "react";
import { IGetLayout } from "./OrientationCourseLayout";
import { AppContext } from "../../pages/_app";
import { CoursePackageDownloadForm } from "./CoursePackageDownloadForm";
import { useCookies } from "react-cookie";
import { getReferral } from "./ReferralWrapper";
import coursePackage from "../../course-package.json";
import { useRouter } from "next/router";

const CompassCourseLayout: FC<{ pageProps: any }> = ({
  pageProps,
  children,
}) => {
  const context = useContext(AppContext);
  const [cookies] = useCookies();
  const router = useRouter();
  const locale = router.locale === "en" ? "en" : "de";

  return (
    <div>
      <CoursePackageDownloadForm
        close={() => context.setIsDownloadOverlayVisible(false)}
        isOpen={context.isDownloadOverlayVisible}
        leadSource={`Compass Course Package`}
        optionalPipeDriveLeadSource={`Download Course Package${getReferral(
          cookies.ref
        )}`}
        fileUrl={
          pageProps.useTechMentorFile
            ? coursePackage.techMentorFileUrl[locale]
            : coursePackage.url[locale]
        }
        pipelineId={"61"}
        linkText={coursePackage.label[locale]}
      />
      {children}
    </div>
  );
};

export const getCompassCourseLayout: IGetLayout = (page: ReactElement) => {
  return (
    <CompassCourseLayout pageProps={page.props}>{page}</CompassCourseLayout>
  );
};
