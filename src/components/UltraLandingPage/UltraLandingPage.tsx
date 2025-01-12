import Bootcamps from "components/Bootcamps";
import Community from "components/Community";
import { Form } from "components/Form";
import ImageText from "components/ImageText";
import Students from "components/Students";
import ThreeColumnImage from "components/ThreeColumnImage";
import Timeline from "components/Timeline";
import { UltraHeader } from "components/UltraHeader";
import { VideoBlock } from "components/VideoBlock";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { FC } from "react";

export const UltraLandingPage: FC<{
  content: any;
  alternativeLanguagePageSlug?: string;
}> = ({ content, alternativeLanguagePageSlug }) => {
  const router = useRouter();
  const locale = router.locale === "en" ? "en" : "de";
  return (
    <div className="first-steps">
      <NextSeo canonical={`https://startsteps.org/${locale}${router.asPath}`} />
      <UltraHeader
        backgroundImageUrl={content.background_image}
        language={router.locale as any}
        title={content.landingpage_title}
        badge={content.landingpage_badge}
        hideBadge={content.hide_badge}
        subtitle={content.landingpage_text}
        hideLanguageSwitchButton={content.hide_language_switch_button}
        threeExtraLogos={content.three_extra_logos}
        form={
          <Form
            text={content.landingpage_form_text}
            firstNameLabel={content.landingpage_first_name_input_label}
            lastNameLabel={content.landingpage_last_name_input_label}
            emailLabel={content.landingpage_email_input_label}
            showPhone={content.show_phone}
            phoneLabel={content.landingpage_phone_input_label}
            buttonLabel={content.landingpage_button_label}
            showJobcenter={content.show_registered}
            jobcenterLabel={content.landingpage_registered_input_label}
            jobcenterErrorMessage={content.landingpage_registered_error_message}
            jobcenterOptions={content.landingpage_registered_items}
            jobcenterTooltip={content.registered_tooltip}
            successMessage={content.landingpage_message}
            language={router.locale as any}
            // 1 = New Lead in Pipeline
            stageId={Number(content.pipedrive_stage_id) || 1}
            leadSource={content.lead_source || "Landing Page 2.0"}
            showMeetingDate={content.show_meeting_date}
            meetingDateLabel={content.meeting_date_label}
            meetingDateOptions={content.meeting_date_options}
            meetingDateSubmit={content.meeting_date_submit}
            meetingDateSuccessMessage={content.meeting_date_success_message}
            showDropdown={content.show_dropdown}
            dropdownLabel={content.dropdown_label}
            dropdownOptions={content.dropdown_options}
            redirectURL={
              content.redirect_on_submit ? content.redirect_url : undefined
            }
            showEmailConsentCheckbox={content.show_email_consent_checkbox}
            emailConsentCheckboxLabel={content.email_consent_checkbox_label}
            showTicketTypeDropdown={content.show_ticket_type_dropdown}
            ticketTypeOptions={content.ticket_type_options}
            makePhoneInputOptional={content.make_phone_input_optional}
          />
        }
        alternativeLanguagePageSlug={alternativeLanguagePageSlug}
      />
      <section className="image-text-section">
        <ImageText
          title={content.imagetext_title}
          text={content.imagetext_text}
          image={content.imagetext_image}
        />
      </section>
      <ThreeColumnImage
        title={content.threecolumnimage_title}
        text={content.threecolumnimage_text}
        items={content.threecolumnimage_items}
      />
      {content.show_bootcamps_2_component === true && (
        <Bootcamps
          title={content.bootcamps_2_title}
          items={content.bootcamps_2_items}
        />
      )}
      {content.show_bootcamps_component !== false && (
        <Bootcamps
          title={content.bootcamps_title}
          items={content.bootcamps_items}
        />
      )}
      <Timeline
        title={content.timeline_title}
        text={content.timeline_text}
        items={content.timeline_items}
      />
      {content.show_component && (
        <section className="community-container">
          <Community
            title={content.community_title}
            text={content.community_text}
            items={content.community_items}
            bottomTitle={content.community_bottom_title}
            bottomTitleSub={content.community_bottom_title_sub}
            bottomButtonLabel={content.community_bottom_button_label}
            onlyFileDownload={content.only_file_download}
          />
        </section>
      )}
      {content.youtube_video_id && (
        <section className="video-block-container">
          <VideoBlock
            title={content.title}
            subtitle={content.subtitle}
            youtubeVideoId={content.youtube_video_id}
            image={content.image}
          />
        </section>
      )}
      {content.show_students_component !== false && (
        <section className="students-container">
          <Students
            title={content.students_title}
            text={content.students_text}
            buttonLabel={content.students_tooltip_button_label}
            buttonLink={content.students_tooltip_button_link}
            items={content.students_items}
            showOnlyStudents={content.show_only_students}
          />
        </section>
      )}
    </div>
  );
};
