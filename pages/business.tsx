import { GetStaticProps, InferGetStaticPropsType } from "next";
import React, { FC, useRef, useState } from "react";
import api from "../src/api";
import { IGetLayout } from "../src/components/DefaultLayout";
import { B2BHeader } from "../src/components/B2BHeader";
import { getBlogIndexLayout } from "../src/components/BlogIndexLayout";
import { fetchAcf } from "./speak-and-tech";
import { LogoCarouselNew } from "../src/components/LogoCarouselNew";
import { B2BThreeFeatures } from "../src/components/B2BThreeFeatures";
import { B2BThreeOptions } from "../src/components/B2BThreeOptions";
import { B2BBenefits } from "../src/components/B2BBenefits";
import { StudentTestimonials } from "../src/components/StudentTestimonials";
import { B2BCaseStudy } from "../src/components/B2BCaseStudy";
import { B2BApplicationFormDialog } from "../src/components/B2BApplicationFormDialog";

const BusinessPage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content, logos }) => {
  const threeOptionsRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [leadSource, setLeadSource] = useState<undefined | string>(undefined);

  const buildFormOpener = (leadSource: string) => () => {
    setLeadSource(leadSource);
    setIsOpen(true);
  };

  return (
    <div>
      <B2BHeader
        headingStart={content.heading_start}
        headingEnd={content.heading_end}
        button_1={content.button_1}
        button_2={content.button_2}
        content={content.description}
        image={content.image}
        refx={threeOptionsRef}
        openForm={buildFormOpener(content.pipedrive_lead_source)}
      />
      <LogoCarouselNew
        logos={logos}
        title={content.logo_cloud_header}
        alt={true}
      />
      <B2BThreeFeatures features={content.b2b_features} />
      <B2BThreeOptions
        options_heading={content.options_heading}
        options_description={content.options_description}
        three_options={content.three_options}
        refx={threeOptionsRef}
        buildFormOpener={buildFormOpener}
      />
      <B2BBenefits
        benefits_heading_start={content.benefits_heading_start}
        benefits_heading_end={content.benefits_heading_end}
        benefits_picture={content.benefits_picture}
        benefits={content.benefits}
      />
      <StudentTestimonials
        testimonials={content.testimonials}
        heading={content.student_testimonials_heading}
      />
      <B2BCaseStudy
        case_study_heading_start={content.case_study_heading_start}
        case_study_heading_end={content.case_study_heading_end}
        case_study_content={content.case_study_content}
        case_study_youtube_video_id={content.case_study_youtube_video_id}
        case_study_video_thumbnail={content.case_study_video_thumbnail}
      />
      <B2BApplicationFormDialog
        form={"Omega"}
        isOpen={isOpen}
        closeForm={() => setIsOpen(false)}
        extra_dropdowns={content.form_extra_dropdowns}
        form_title={content.form_title}
        form_submit_button_text={content.form_submit_button_text}
        form_success_message={content.form_success_message}
        pipedrive_stage_id={content.pipedrive_stage_id}
        pipedrive_lead_source={leadSource}
      />
    </div>
  );
};

BusinessPage.defaultProps = { getLayout: getBlogIndexLayout };

export const getStaticProps: GetStaticProps<{
  content: any;
  logos: any[];
}> = async (props) => {
  const locale = props.locale === "en" ? "en" : "de";
  const content = (await api.getContent("business", locale)) as any;
  const studentTestimonials = await fetchAcf("new-jobcenter", "en");
  return {
    props: {
      content: content.content,
      title: content.title,
      description: content.description,
      logos: studentTestimonials.logo_carousel_2.logos,
      locale: locale,
    },
  };
};

export default BusinessPage;
