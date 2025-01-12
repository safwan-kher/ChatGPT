import React, { useState, FC, useEffect } from "react";

import Typewriter from "typewriter-effect";
import { useCookies } from "react-cookie";
import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import { CoursePackageDownloadForm } from "../../src/components/CoursePackageDownloadForm";

// Components
import Button from "../../src/components/Button";

import utils from "../../src/utils";
import api from "../../src/api";
import { IGetLayout } from "../../src/components/DefaultLayout";

import Community from "../../src/components/Community";
import Curriculum from "../../src/components/Curriculum";
import Providers from "../../src/components/Providers";
import Timeline from "../../src/components/Timeline";
import FurtherDetails from "../../src/components/FurtherDetails";
import Signup from "../../src/components/Signup";
import ApplyForm from "../../src/components/ApplyForm";
import FileDownloadForm from "../../src/components/FileDownloadForm";
import { NextSeo } from "next-seo";

const Partner: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content }) => {
  const [cookies] = useCookies();
  const router = useRouter();
  const locale = router.locale === "en" ? "en" : "de";
  const [state, setState] = useState({
    formIsOpen: false,
    selectedCourse: undefined,
    fileDownloadFormIsOpen: false,
  });

  const closeForm = () => {
    setState((cur) => ({ ...cur, formIsOpen: false }));
  };

  const selectCourse = (courseName) => {
    setState((cur) => ({ ...cur, selectedCourse: courseName }));
  };

  const setFileDownloadFormIsOpen = (isOpen) => {
    setState((cur) => ({ ...cur, fileDownloadFormIsOpen: isOpen }));
  };

  const closeFileDownloadForm = () => {
    setState((cur) => ({ ...cur, fileDownloadFormIsOpen: false }));
  };
  return (
    <div>
      <NextSeo
        canonical={
          locale === "en"
            ? "https://startsteps.org/en/courses/tech-mentor"
            : "https://startsteps.org/de/kurse/tech-mentor"
        }
      />
      <header className="bootcamps-hero tech-mentor-hero">
        <div className="full-width-outer bootcamps-image">
          <Image
            src={content.hero_image.url}
            // width={items[`image${index}`].width}
            // height={items[`image${index}`].height}
            layout="fill"
            objectFit="cover"
            className="tech-mentor-bump-down"
            loading="eager"
          />
          <div className="header-reskill__gradient tech-mentor-bump">
            <div className="techmentor-hero-container">
              <div>
                <h1 className="hero-title">
                  {content.hero_title_head}
                  <Typewriter
                    options={{
                      strings: content.hero_title_tail_options.map?.(
                        ({ hero_title_tail_option, color }) =>
                          `<span style="color: ${color}">${hero_title_tail_option}</span>`
                      ),
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 120,
                      delay: 80,
                    }}
                  />
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={`${state.formIsOpen ? "visible" : "hidden"}`}>
        <ApplyForm
          jobcenterDropdown={true}
          closeForm={closeForm}
          formType={`Tech Mentor - ${state.selectedCourse}`}
          courseName={state.selectedCourse}
          partnerName={`Tech Mentor - ${state.selectedCourse}`}
          stageId={20}
          formText={content.mentorship_course_apply_form_fields.form_title}
          formFirstNameLabel={
            content.mentorship_course_apply_form_fields.first_name_label
          }
          formLastNameLabel={
            content.mentorship_course_apply_form_fields.last_name_label
          }
          formEmailLabel={
            content.mentorship_course_apply_form_fields.email_label
          }
          formPhoneLabel={
            content.mentorship_course_apply_form_fields.phone_label
          }
          formButtonLabel={
            content.mentorship_course_apply_form_fields.submit_button_text
          }
          formRegisteredLabel={
            content.mentorship_course_apply_form_fields.jobcenter_label
          }
          formDisclaimer={undefined}
          formSuccessMessage={
            content.mentorship_course_apply_form_fields.success_message
          }
          jobcenterInvalidOptionErrorMessage={
            content.mentorship_course_apply_form_fields
              .jobcenter_invalid_option_error_message
          }
          jobcenterRequired={true}
          language={router.locale}
          trackPurchase={true}
        />
      </div>
      <section className="mentor-section full-width-outer">
        <div className="mentor-section-container">
          <h2 className="mentor-section-h2">{content.title}</h2>
          <div
            className="mentor-section-content"
            dangerouslySetInnerHTML={{
              __html: utils.cleanText(content.subtitle, true),
            }}
          ></div>
        </div>
      </section>
      <section className="mentor-container">
        {content.mentorship_courses.map?.(({ mentorship_course }, index) => (
          <div
            key={index}
            style={{ backgroundColor: `${mentorship_course.card_color}` }}
            className={`mentorship-course-card`}
          >
            <div>
              <div className="mentorship-course-card-icon">
                <img src={mentorship_course.icon.sizes.medium} alt="" />
              </div>
              <div className="mentorship-course-card-button">
                <Button
                  label={mentorship_course.apply_button_text}
                  onClick={() => {
                    selectCourse(mentorship_course.name);
                    setState((cur) => ({ ...cur, formIsOpen: true }));
                  }}
                  variant="transparent-blue"
                />
              </div>
              <p className="mentorship-course-card-name">
                {mentorship_course.name}
              </p>
              <div
                className="mentorship-course-card-description"
                dangerouslySetInnerHTML={{
                  __html: utils.cleanText(mentorship_course.description, true),
                }}
              ></div>
            </div>
            {mentorship_course.optional_certificate_description && (
              <div className="mentorship-course-card-optional-certificate-container">
                <img
                  className="mentorship-course-card-optional-certificate-image"
                  src={mentorship_course.optional_certificate_image}
                  alt=""
                />
                <div>
                  <p className="mentorship-course-card-optional-certificate-title">
                    {mentorship_course.optional_certificate_title}
                  </p>
                  <p className="mentorship-course-card-optional-certificate-subtitle">
                    {mentorship_course.optional_certificate_description}
                  </p>
                </div>
              </div>
            )}
            <div className="mentorship-course-card-small-button">
              <Button
                label={mentorship_course.apply_button_text}
                onClick={() => {
                  selectCourse(mentorship_course.name);
                  setState((cur) => ({ ...cur, formIsOpen: true }));
                }}
                variant="transparent-blue"
              />
            </div>
          </div>
        ))}
      </section>
      <CoursePackageDownloadForm
        close={closeFileDownloadForm}
        isOpen={state.fileDownloadFormIsOpen}
        leadSource={`Download Tech Mentor Course Package ${(
          router.locale ?? ""
        ).toUpperCase()}${
          cookies["ref"] ? ` - Referred by ${cookies["ref"]}` : ""
        }`}
        fileUrl={content.course_package_file}
        pipelineId={"62"}
        linkText={content.file_download.download_link_text}
      />
      <section className="community-container">
        <Community
          title={content.title_2}
          text={content.subtitle_2}
          items={content.perks.reduce((acc, { perk }, index) => {
            return {
              ...acc,
              [`image${index + 1}`]: perk.perk_image,
              [`text${index + 1}`]: perk.perk_description,
              [`title${index + 1}`]: perk.perk_name,
            };
          }, {})}
          bottomTitle={content.course_package_title}
          bottomTitleSub={content.course_package_description}
          bottomButtonLabel={content.course_package_button_text}
          image={content.course_package_image}
          fileDownloadOnClick={() => setFileDownloadFormIsOpen(true)}
        />
      </section>
      <section className="curriculum-section">
        <Curriculum
          title={content.title_3}
          text={content.subtitle_3}
          items={content.instructions.reduce((acc, { instruction }, index) => {
            return {
              ...acc,
              [`image${index + 1}`]: instruction.image,
              [`text${index + 1}`]: instruction.content,
              [`label${index + 1}`]: instruction.title,
              [`heading${index + 1}`]: instruction.subtitle,
            };
          }, {})}
        />
      </section>
      <section className="providers-section">
        <Providers
          title={content.title_4}
          text={content.subtitle_4}
          isCourse={true}
          tooltipButtonLabel={"Learn more"}
          isStatic={true}
          items={content.logo_cloud.reduce((acc, { logo }, index) => {
            return {
              ...acc,
              [`image${index + 1}`]: logo.image,
              [`title${index + 1}`]: logo.image,
              [`link${index + 1}`]: logo.image,
              [`description${index + 1}`]: logo.image,
            };
          }, {})}
        />
      </section>
      <section>
        <Timeline
          title={content.timeline_title}
          text={content.timeline_subtitle}
          items={content.timeline.map?.(({ step }) => {
            return {
              title: step.name,
              text: step.description,
            };
          })}
        />
      </section>
      <section>
        <FurtherDetails
          title={content.details_title}
          items={
            content.details
              ? content.details.map(({ details_section }) => {
                  return {
                    heading: details_section.section_title,
                    items: details_section.requirements
                      ? details_section.requirements.map(({ requirement }) => ({
                          value: requirement.requirement,
                          label: requirement.requirement_name,
                        }))
                      : [],
                  };
                })
              : []
          }
        />
      </section>
      <section>
        <Signup
          title={content.signup_title}
          firstNameInputLabel={content.signup_first_name_input_label}
          lastNameInputLabel={content.signup_last_name_input_label}
          emailInputLabel={content.signup_email_input_label}
          phoneInputLabel={content.signup_phone_input_label}
          checkboxLabelJobCenter={content.signup_checkbox_label_job_center}
          checkboxLabelTermsPre={content.signup_checkbox_label_terms_pre}
          checkboxLabelTermsLink={content.signup_checkbox_label_terms_link}
          checkboxLabelTermsLinkLabel={
            content.signup_checkbox_label_terms_link_label
          }
          checkboxLabelTermsPost={content.signup_checkbox_label_terms_post}
          checkboxLabelConsent={content.signup_checkbox_label_consent}
          buttonLabel={content.signup_button_label}
          block1Title={content.signup_block1_title}
          block1ButtonLabel={content.signup_block1_button_label}
          block2Title={content.signup_block2_title}
          block2ButtonLabel={content.signup_block2_button_label}
          message={content.signup_message}
          fileUrl={content.file}
          language={router.locale}
          step1Title={content.file_download.step_1_title}
          step1InputLabel={content.file_download.email_field_label}
          step1ButtonText={content.file_download.step_1_button_text}
          step2LinkText={content.file_download.download_link_text}
          leadSource={`Download Tech Mentor Course Package ${router.locale.toUpperCase()}${
            cookies["ref"] ? ` - Referred by ${cookies["ref"]}` : ""
          }`}
          pipelineId={62}
        />
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ content: any }> = async (
  context
) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  const slug = "tech-mentor";
  const content = (await api.getContent(slug, locale)) as any;
  return {
    props: {
      content: content.content,
      title: content.title,
      description: content.description,
      locale: context.locale,
    },
  };
};

export default Partner;
