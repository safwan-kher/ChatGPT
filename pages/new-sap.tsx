import { GetStaticProps, InferGetStaticPropsType } from "next";
import React, { FC, useState } from "react";
import api from "../src/api";
import { IGetLayout } from "../src/components/DefaultLayout";
import { EducateTalentAcceleratorHeader } from "../src/components/EducateTalentAcceleratorHeader";
import { EmployTalentAcceleratorWhy } from "../src/components/EmployTalentAcceleratorWhy";
import { EducateTalentAcceleratorSkills } from "../src/components/EducateTalentAcceleratorSkills";
import { EducateTalentAcceleratorFAQ } from "../src/components/EducateTalentAcceleratorFAQ";
import { EducateTalentAcceleratorVision } from "../src/components/EducateTalentAcceleratorVision";
import { EducateTalentAcceleratorWhat } from "../src/components/EducateTalentAcceleratorWhat";
import { EducateTalentAcceleratorCourseInfo } from "../src/components/EducateTalentAcceleratorCourseInfo";
import { TalentAcceleratorIntroduction } from "../src/components/TalentAcceleratorIntroduction";
import { TalentAcceleratorFeatures } from "../src/components/TalentAcceleratorFeatures";
import { TalentAcceleratorFormDialog } from "../src/components/TalentAcceleratorFormDialog";
import { getEducateLayout } from "../src/components/EducateLayout";
import { EducateStyle } from "../src/components/style";
import { NextSeo } from "next-seo";

const EducateToEmployPage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <NextSeo openGraph={{ url: "https://educate2employ.startsteps.org/" }} />
      <EducateTalentAcceleratorHeader
        title={content.talent_accelerator_header.title}
        logo={content.talent_accelerator_header.logo}
        content={content.talent_accelerator_header.content}
        subtitle={content.talent_accelerator_header.subtitle}
        image={content.talent_accelerator_header.image}
        style={EducateStyle}
        openForm={openForm}
      />
      <TalentAcceleratorFeatures
        talent_accelerator_features={content.talent_accelerator_features}
        style={EducateStyle}
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
        style={EducateStyle}
      />
      <EmployTalentAcceleratorWhy
        talent_accelerator_why_title_1={content.talent_accelerator_why_title_1}
        talent_accelerator_why_title_2={content.talent_accelerator_why_title_2}
        talent_accelerator_why_content={content.talent_accelerator_why_content}
        talent_accelerator_why_image={content.talent_accelerator_why_image}
        style={EducateStyle}
        openForm={openForm}
      />
      <EducateTalentAcceleratorSkills
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
        style={EducateStyle}
      />
      <EducateTalentAcceleratorCourseInfo
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
        style={EducateStyle}
        openForm={openForm}
      />
      <EducateTalentAcceleratorWhat
        talent_accelerator_what_title={content.talent_accelerator_what_title}
        talent_accelerator_what_requirements={
          content.talent_accelerator_what_requirements
        }
        talent_accelerator_what_steps={content.talent_accelerator_what_steps}
        talent_accelerator_what_disclaimer={
          content.talent_accelerator_what_disclaimer
        }
        talent_accelerator_what_image={content.talent_accelerator_what_image}
        style={EducateStyle}
      />
      <EducateTalentAcceleratorVision
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
        style={EducateStyle}
      />
      <EducateTalentAcceleratorFAQ
        talent_accelerator_faq_title={content.talent_accelerator_faq_title}
        talent_accelerator_faq_faqs={content.talent_accelerator_faq_faqs}
        style={EducateStyle}
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
          backgroundColor: EducateStyle.secondaryBg,
          textColor: "text-black",
          buttonColor: EducateStyle.mainColor,
          borderColor: EducateStyle.mainBorder,
          inputBackgroundColor: "bg-educateSecondary/5",
          buttonBackgroundColor: "bg-educateAccent",
        }}
        form_disclaimer={content.form_disclaimer}
        useEducateForm={true}
      />
    </div>
  );
};

EducateToEmployPage.defaultProps = { getLayout: getEducateLayout };

export const getStaticProps: GetStaticProps<{
  content: any;
}> = async (props) => {
  const locale = props.locale === "en" ? "en" : "de";
  if (locale !== "en") {
    return { notFound: true };
  }
  const content = (await api.getContent("new-sap-source", locale)) as any;

  return {
    props: {
      content: content.content,
      title: content.title,
      description: content.description,
      locale: locale,
    },
  };
};

export default EducateToEmployPage;
