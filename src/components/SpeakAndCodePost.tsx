import { FC, useRef } from "react";
import { SpeakAndCodeHeader } from "./SpeakAndCodeHeader";
import { ThreeSteps } from "./ThreeSteps";
import { WhatIsStartSteps } from "./WhatIsStartSteps";
import { LogoCarouselNew } from "./LogoCarouselNew";
import { AltForm } from "./AltForm";

export const SpeakAndCodePost: FC<{
  content: any;
  studentTestimonials: any;
}> = ({ content, studentTestimonials }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <div>
      <SpeakAndCodeHeader
        heading={content.title_1}
        sub_heading={content.title_2}
        content={content.description}
        image={content.background_image}
        logo={content.logo}
        value_1={content.value_1}
        value_2={content.value_2}
        value_3={content.value_3}
        label_4={content.label_4}
        value_4={content.value_4}
        label_5={content.label_5}
        value_5={content.value_5}
        label_6={content.label_6}
        value_6={content.value_6}
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
        alt={true}
      />
      <WhatIsStartSteps
        what_is_startsteps_heading={content.what_is_startsteps_heading}
        what_is_startsteps_content={content.what_is_startsteps_content}
        free_consultation_button_text={content.free_consultation_button_text}
        students={content.students}
        questions={content.questions}
        formRef={formRef}
        alt={true}
      />
      <LogoCarouselNew
        logos={studentTestimonials.logo_carousel.logos}
        title={content.logo_cloud_header}
      />
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
        alt={true}
      />
    </div>
  );
};
