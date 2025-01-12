import React, { FC } from "react";

// Components
import api from "../src/api";
import { IGetLayout } from "../src/components/DefaultLayout";
import { HeroWithComments } from "../src/components/HeroWithComments";
import { Certification } from "../src/components/Certification";
import { Courses } from "../src/components/Courses";
import { JobDescriptions } from "../src/components/JobDescriptions";
import { LogoCarousel } from "../src/components/LogoCarousel";
import { WhyStartSteps } from "../src/components/WhyStartSteps";
import { EventsForm } from "../src/components/EventsForm";
import { CareerCompassDownload } from "../src/components/CareerCompassDownload";
import { Questions } from "../src/components/Questions";
import { CompanyInformation } from "../src/components/CompanyInformation";
import { InferGetStaticPropsType, GetStaticProps } from "next";

const NewJobcenterPage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content }) => {
  return (
    <div>
      <HeroWithComments
        title={content.title}
        description={content.description}
        comments={content.comments}
      />
      <Certification
        name={content.certification.certification_name}
        image={content.certification.certification_image}
      />
      <Courses courses={content.courses} />
      <JobDescriptions
        title={content.job_descriptions.title}
        jobs={content.job_descriptions.jobs}
        description={content.job_descriptions.description}
        image={content.job_descriptions.image}
        link_path={content.job_descriptions.link_path}
        link_text={content.job_descriptions.link_text}
        form_title={content.job_descriptions.form_title}
        name_label={content.job_descriptions.name_label}
        surname_label={content.job_descriptions.surname_label}
        email_label={content.job_descriptions.email_label}
        phone_label={content.job_descriptions.phone_label}
        submit_button={content.job_descriptions.submit_button}
        success_message={content.job_descriptions.success_message}
        pipedrive_stage_id={Number(content.job_descriptions.pipedrive_stage_id)}
        lead_source={content.job_descriptions.lead_source}
        form_image={content.job_descriptions.form_image}
      />
      <LogoCarousel
        title={content.logo_carousel.title}
        logos={content.logo_carousel.logos}
        altStyle={false}
      />
      <LogoCarousel
        title={content.logo_carousel_2.title}
        logos={content.logo_carousel_2.logos}
        altStyle={true}
      />
      <WhyStartSteps
        title={content.why_startsteps.title}
        reasons={content.why_startsteps.reasons}
      />
      <EventsForm
        title={content.events_form.title}
        description={content.events_form.description}
        image={content.events_form.image}
        button_text={content.events_form.button_text}
        form_title={content.events_form.form_title}
        name_label={content.events_form.name_label}
        surname_label={content.events_form.surname_label}
        birthdate_label={content.events_form.birthdate_label}
        email_label={content.events_form.email_label}
        form_submit_button={content.events_form.form_submit_button}
        success_message={content.events_form.success_message}
        form_image={content.events_form.form_image}
        pipedrive_stage_id={Number(content.events_form.pipedrive_stage_id)}
        lead_source={content.events_form.lead_source}
      />
      <CareerCompassDownload
        title={content.career_compass_download.title}
        subtitle={content.career_compass_download.subtitle}
        image={content.career_compass_download.image}
        course_image={content.career_compass_download.course_image}
        link={content.career_compass_download.link}
        file={content.career_compass_download.file}
        formTitle={content.career_compass_download.form_title}
        emailInputTitle={content.career_compass_download.email_input_title}
        buttonText={content.career_compass_download.button_text}
        downloadButtonText={
          content.career_compass_download.download_button_text
        }
        pipelineStageId={content.career_compass_download.pipeline_stage_id}
      />
      <Questions
        title={content.questions.title}
        image={content.questions.image}
        phone_number_label={content.questions.phone_number_label}
        phone_number={content.questions.phone_number}
        email_label={content.questions.email_label}
        email={content.questions.email}
        fax_number_1_label={content.questions.fax_number_1_label}
        fax_number_1={content.questions.fax_number_1}
        fax_number_2_label={content.questions.fax_number_2_label}
        fax_number_2={content.questions.fax_number_2}
      />
      <CompanyInformation
        title={content.company_information.title}
        contactInformation={content.company_information.contact_information}
        companyInformation={content.company_information.company_information}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ content: any }> = async (
  context
) => {
  const content = (await api.getContent("new-jobcenter", "en")) as any;
  return {
    props: {
      content: content.content,
      title: content.title,
      description: content.description,
      locale: context.locale,
    },
  };
};

export default NewJobcenterPage;
