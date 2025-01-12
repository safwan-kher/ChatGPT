// Updated code with fixes for the "Apply Now" button
import { GetStaticProps, InferGetStaticPropsType } from "next";
import React, { FC, useState, createContext } from "react";
import api from "../src/api";
import { IGetLayout } from "../src/components/DefaultLayout";
import { ServiceNowTalentAcceleratorHeader } from "../src/components/ServiceNowTalentAcceleratorHeader";
import { ServiceNowTalentAcceleratorWhy } from "../src/components/ServiceNowTalentAcceleratorWhy";
import { TalentAcceleratorSkills } from "../src/components/TalentAcceleratorSkills";
import { TalentAcceleratorFAQ } from "../src/components/TalentAcceleratorFAQ";
import { ServiceNowVision } from "../src/components/ServiceNowVision";
import { TalentAcceleratorWhat } from "../src/components/TalentAcceleratorWhat";
import { TalentAcceleratorCourseInfo } from "../src/components/TalentAcceleratorCourseInfo";
import { TalentAcceleratorIntroduction } from "../src/components/TalentAcceleratorIntroduction";
import { ServiceNowBanner } from "../src/components/ServiceNowBanner";
import { TalentAcceleratorFeatures } from "../src/components/TalentAcceleratorFeatures";
import { TalentAcceleratorFormDialog } from "../src/components/TalentAcceleratorFormDialog";
import { getOrientationCourseLayout } from "../src/components/OrientationCourseLayout";
import { ServiceNowStyle } from "../src/components/style";
import { NextSeo } from "next-seo";

const ZalandoPage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <NextSeo
        openGraph={{ url: "https://careeraccelerator.startsteps.org/" }}
      />
      <ServiceNowTalentAcceleratorHeader
        title={content.talent_accelerator_header.title}
        logo={content.talent_accelerator_header.logo}
        content={content.talent_accelerator_header.content}
        subtitle={content.talent_accelerator_header.subtitle}
        image={content.talent_accelerator_header.image}
        style={ServiceNowStyle}
        openForm={openForm}
      />
      <TalentAcceleratorFeatures
        talent_accelerator_features={content.talent_accelerator_features}
        style={ServiceNowStyle}
      />
      <TalentAcceleratorIntroduction
        talent_accelerator_introcution_title_1={
          content.talent_accelerator_introcution_title_1
        }
        talent_accelerator_introcution_title_2={
          content.talent_accelerator_introcution_title_2
        }
        talent_accelerator_introcution_content={
          content.talent_accelerator_introcution_content
        }
        talent_accelerator_introcution_features={
          content.talent_accelerator_introcution_features
        }
        talent_accelerator_introcution_image={
          content.talent_accelerator_introcution_image
        }
        style={ServiceNowStyle}
      />
      <ServiceNowTalentAcceleratorWhy
        talent_accelerator_why_title_1={content.talent_accelerator_why_title_1}
        talent_accelerator_why_title_2={content.talent_accelerator_why_title_2}
        talent_accelerator_why_content={content.talent_accelerator_why_content}
        talent_accelerator_why_image={content.talent_accelerator_why_image}
        talent_accelerator_why_button_text={
          content.talent_accelerator_why_button_text
        }
        style={ServiceNowStyle}
        logo={content.logo_alt}
        openForm={openForm}
      />
      <TalentAcceleratorSkills
        talent_accelerator_skills_title_1={
          content.talent_accelerator_skills_title_1
        }
        talent_accelerator_skills_title_2={
          content.talent_accelerator_skills_title_2
        }
        talent_accelerator_skills_content={
          content.talent_accelerator_skills_content
        }
        talent_accelerator_skills_image={
          content.talent_accelerator_skills_image
        }
        talent_accelerator_skills_skills={
          content.talent_accelerator_skills_skills
        }
        style={ServiceNowStyle}
      />
      <TalentAcceleratorCourseInfo
        talent_accelerator_course_info_title_1={
          content.talent_accelerator_course_info_title_1
        }
        talent_accelerator_course_info_title_2={
          content.talent_accelerator_course_info_title_2
        }
        talent_accelerator_course_info_content={
          content.talent_accelerator_course_info_content
        }
        talent_accelerator_course_info_course_info={
          content.talent_accelerator_course_info_course_info
        }
        style={ServiceNowStyle}
        openForm={openForm}
      />
      <TalentAcceleratorWhat
        talent_accelerator_what_title={content.talent_accelerator_what_title}
        talent_accelerator_what_requirements={
          content.talent_accelerator_what_requirements
        }
        talent_accelerator_what_steps={content.talent_accelerator_what_steps}
        talent_accelerator_what_disclaimer={
          content.talent_accelerator_what_disclaimer
        }
        talent_accelerator_what_image={content.talent_accelerator_what_image}
        style={ServiceNowStyle}
      />
      <ServiceNowVision
        talent_accelerator_vision_title_1={
          content.talent_accelerator_vision_title_1
        }
        talent_accelerator_vision_title_2={
          content.talent_accelerator_vision_title_2
        }
        talent_accelerator_vision_content={
          content.talent_accelerator_vision_content
        }
        talent_accelerator_vision_image={
          content.talent_accelerator_vision_image
        }
        youtube_video_id={content.youtube_video_id}
        style={ServiceNowStyle}
      />
      <TalentAcceleratorFAQ
        talent_accelerator_faq_title={content.talent_accelerator_faq_title}
        talent_accelerator_faq_faqs={content.talent_accelerator_faq_faqs}
        style={ServiceNowStyle}
      />
      <ServiceNowBanner
        logo={content.logo_alt}
        logo_2={content.servicenow_logo_1}
        logo_3={content.servicenow_logo_2}
        logo_4={content.servicenow_logo_3}
        text={content.servicenow_text}
        style={ServiceNowStyle}
      />
   
      <TalentAcceleratorFormDialog
        form={"Omega"}
        isOpen={isOpen}
        closeForm={() => setIsOpen(false)}
        extra_dropdowns={content.form_extra_dropdowns}
        form_title={content.form_title}
        form_submit_button_text={content.form_submit_button_text}
        form_success_message={content.form_success_message}
        pipedrive_stage_id={content.pipedrive_stage_id}
        pipedrive_lead_source={content.pipedrive_lead_source}
        style={{
          backgroundColor: ServiceNowStyle.secondaryBg,
          textColor: "text-white",
          buttonColor: ServiceNowStyle.mainColor,
          borderColor: ServiceNowStyle.mainBorder,
          inputBackgroundColor: "bg-white/5",
          buttonBackgroundColor: ServiceNowStyle.mainBg,
        }}
        form_disclaimer={content.form_disclaimer}
      />
    </div>
  );
};

ZalandoPage.defaultProps = { getLayout: getOrientationCourseLayout };

export const getStaticProps: GetStaticProps<{
  content: any;
}> = async (props) => {
  if (!["en", "de"].includes(props.locale)) {
    // if (locale !== "en") {
    return { notFound: true };
  }
  const content = (await api.getContent("servicenow", props.locale)) as any;
  return {
    props: {
      content: content.content,
      title: content.title,
      description: content.description,
      locale: props.locale,
    },
  };
};

export default ZalandoPage;
