import React from "react";

// Page
import Page from "./Page";
import utils from "../utils";

import Button from "components/Button";
import Community from "components/Community";
import Curriculum from "components/Curriculum";
import Providers from "components/Providers";
import Timeline from "components/Timeline";
import FurtherDetails from "components/FurtherDetails";
import Signup from "components/Signup";
import ApplyForm from "components/ApplyForm";
import FileDownloadForm from "components/FileDownloadForm";

import Typewriter from "typewriter-effect";
import { withCookies } from "react-cookie";

const MentorshipCourseData = [
  {
    class: "bg-yellow-light",
    image: "brackets alt.png",
  },
  {
    class: "bg-blue-light",
    image: "loudspeaker alt.png",
  },
  {
    class: "bg-orange-light",
    image: "hand alt.png",
  },
  {
    class: "bg-navy-light",
    image: "pie alt.png",
  },
  {
    class: "bg-pink-light",
    image: "server.png",
  },
  {
    class: "bg-green-light",
    image: "cog alt.png",
  },
];

export class TechMentor extends Page {
  componentDidMount() {
    super.componentDidMount();
    this.setState({
      formIsOpen: false,
      selectedCourse: undefined,
      fileDownloadFormIsOpen: false,
    });
    this.closeForm = this.closeForm.bind(this);
    this.selectCourse = this.selectCourse.bind(this);
    this.setFileDownloadFormIsOpen = this.setFileDownloadFormIsOpen.bind(this);
  }

  closeForm() {
    this.setState({ formIsOpen: false });
  }

  selectCourse(courseName) {
    this.setState({ selectedCourse: courseName });
  }

  setFileDownloadFormIsOpen(isOpen) {
    this.setState({ fileDownloadFormIsOpen: isOpen });
  }

  render() {
    const { content } = this.state;

    if (!content) {
      return super.render();
    }

    return (
      <div>
        <header className="bootcamps-hero tech-mentor-hero">
          <div
            className="full-width-outer bootcamps-image"
            style={{
              backgroundImage: `url(${content.hero_image})`,
            }}
          >
            <div className="header-reskill__gradient">
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
        <div className={`${this.state.formIsOpen ? "visible" : "tmhidden"}`}>
          <ApplyForm
            jobcenterDropdown={true}
            closeForm={this.closeForm}
            formType={`Tech Mentor - ${this.state.selectedCourse}`}
            courseName={this.state.selectedCourse}
            partnerName={`Tech Mentor - ${this.state.selectedCourse}`}
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
            language={this.props.language}
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
              className={`mentorship-course-card ${MentorshipCourseData[index].class}`}
            >
              <div>
                <img
                  className="mentorship-course-card-icon"
                  src={require(`assets/${MentorshipCourseData[index].image}`)}
                  alt=""
                />
                <div className="mentorship-course-card-button">
                  <Button
                    label={mentorship_course.apply_button_text}
                    onClick={() => {
                      this.selectCourse(mentorship_course.name);
                      this.setState({ formIsOpen: true });
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
                    __html: utils.cleanText(
                      mentorship_course.description,
                      true
                    ),
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
                    this.selectCourse(mentorship_course.name);
                    this.setState({ formIsOpen: true });
                  }}
                  variant="transparent-blue"
                />
              </div>
            </div>
          ))}
        </section>
        <section>
          <CoursePackageDownloadForm
            close={closeFileDownloadForm}
            isOpen={state.fileDownloadFormIsOpen}
            leadSource={`Download Tech Mentor Course Package ${(
              router.locale ?? ""
            ).toUpperCase()}${
              cookies["ref"] ? ` - Referred by ${cookies["ref"]}` : ""
            }`}
            fileUrl={content.course_package_file}
            pipelineId={"37"}
            linkText={content.file_download.download_link_text}
          />
          <FileDownloadForm
            isVisible={this.state.fileDownloadFormIsOpen}
            setIsVisible={this.setFileDownloadFormIsOpen}
            step1Title={content.file_download.step_1_title}
            step1InputLabel={content.file_download.email_field_label}
            step1ButtonText={content.file_download.step_1_button_text}
            step2LinkText={content.file_download.download_link_text}
            fileUrl={content.course_package_file}
            language={this.props.language}
            leadSource={`Download Tech Mentor Course Package ${this.props.language.toUpperCase()}${
              this.props.cookies.get("ref")
                ? ` - Referred by ${this.props.cookies.get("ref")}`
                : ""
            }`}
            pipelineId={37}
          />
        </section>
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
            fileDownloadOnClick={() => this.setFileDownloadFormIsOpen(true)}
          />
        </section>
        <section className="curriculum-section">
          <Curriculum
            title={content.title_3}
            text={content.subtitle_3}
            items={content.instructions.reduce(
              (acc, { instruction }, index) => {
                return {
                  ...acc,
                  [`image${index + 1}`]: instruction.image,
                  [`text${index + 1}`]: instruction.content,
                  [`label${index + 1}`]: instruction.title,
                  [`heading${index + 1}`]: instruction.subtitle,
                };
              },
              {}
            )}
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
                [`link${index + 1}`]: logo.image,
                [`description${index + 1}`]: logo.image,
                [`title${index + 1}`]: logo.image,
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
                        ? details_section.requirements.map(
                            ({ requirement }) => ({
                              value: requirement.requirement,
                              label: requirement.requirement_name,
                            })
                          )
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
            language={this.props.language}
            step1Title={content.file_download.step_1_title}
            step1InputLabel={content.file_download.email_field_label}
            step1ButtonText={content.file_download.step_1_button_text}
            step2LinkText={content.file_download.download_link_text}
            leadSource={`Download Tech Mentor Course Package ${this.props.language.toUpperCase()}${
              this.props.cookies.get("ref")
                ? ` - Referred by ${this.props.cookies.get("ref")}`
                : ""
            }`}
            pipelineId={37}
          />
        </section>
      </div>
    );
  }
}

export default withCookies(TechMentor);
