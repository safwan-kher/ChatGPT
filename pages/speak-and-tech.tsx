import { GetStaticProps, InferGetStaticPropsType } from "next";
import React, { useRef } from "react";
import { FC } from "react";
import api from "../src/api";
import { IGetLayout } from "../src/components/DefaultLayout";
import { getOrientationCourseLayout } from "../src/components/OrientationCourseLayout";
import { SpeakAndTechHeader } from "../src/components/SpeakAndTechHeader";
import { ThreeSteps } from "../src/components/ThreeSteps";
import { WhatIsStartSteps } from "../src/components/WhatIsStartSteps";
import { LogoCarouselNew } from "../src/components/LogoCarouselNew";
import { AltForm } from "../src/components/AltForm";

const LearnGermanStudyTechPage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content, logos }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <div>
      <SpeakAndTechHeader
        alt={false}
        heading={content.title_1}
        sub_heading={content.title_2}
        content={content.description}
        image={content.background_image}
        logo={content.logo}
        features={content.course_features}
        pipedrive_lead_source={content.pipedrive_lead_source}
        pipedrive_stage_id={content.pipedrive_stage_id}
        course_title={content.course_title}
        course_description={content.course_description}
        form_submit_success_message={content.form_success_message}
        form_submit_button_text={content.form_submit_button_text}
        form_title={content.form_title}
        course_image={content.course_image}
        extra_dropdowns={content.form_extra_dropdowns}
        form_consent_message={content.form_consent_message}
        formRef={formRef}
      />
      <ThreeSteps
        heading={content.three_steps_title}
        content={content.three_steps_description}
        logo={content.three_steps_logo}
        three_steps={content.three_steps}
      />
      <WhatIsStartSteps
        what_is_startsteps_heading={content.what_is_startsteps_heading}
        what_is_startsteps_content={content.what_is_startsteps_content}
        free_consultation_button_text={content.free_consultation_button_text}
        students={content.students}
        questions={content.questions}
        formRef={formRef}
      />
      <LogoCarouselNew logos={logos} title={content.logo_cloud_header} />
      <AltForm
        form_heading_head={content.form_heading_head}
        form_heading_tail={content.form_heading_tail}
        picture={content.picture}
        form_submit_success_message={content.form_success_message}
        form_submit_button_text={content.form_submit_button_text}
        form_title={content.form_title}
        pipedrive_lead_source={content.pipedrive_lead_source}
        pipedrive_stage_id={content.pipedrive_stage_id}
        form_consent_message={content.form_consent_message}
      />
    </div>
  );
};

LearnGermanStudyTechPage.defaultProps = {
  getLayout: getOrientationCourseLayout,
};

export const fetchAcf = async (
  slug: string,
  language: string
): Promise<any> => {
  const res = await fetch(
    `https://wordpress.startsteps.org/wp-json/wp/v2/pages?slug=${slug}&lang=${language}`
  );
  const json = await res.json();
  return json[0].acf;
};

export const getStaticProps: GetStaticProps<{
  content: any;
  logos: any[];
}> = async (props) => {
  const locale = props.locale === "default" ? "de" : props.locale;
  if (locale !== "en") {
    return { notFound: true };
  }
  const content = (await api.getContent("speak-and-tech", locale)) as any;

  const studentTestimonials = await fetchAcf(
    "landing-page-compass-orientate-train-get-hired-tech",
    locale
  );

  return {
    props: {
      content: content.content,
      logos: studentTestimonials.logo_carousel.logos,
      title: content.title,
      description: content.description,
      locale: locale,
    },
  };
};

export default LearnGermanStudyTechPage;
