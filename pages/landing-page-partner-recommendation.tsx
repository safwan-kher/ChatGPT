import React, { FC } from "react";

import Community from "../src/components/Community";
import Students from "../src/components/Students";
import ImageText from "../src/components/ImageText";
import ThreeColumnImage from "../src/components/ThreeColumnImage";
import Bootcamps from "../src/components/Bootcamps";
import Timeline from "../src/components/Timeline";
import { useCookies } from "react-cookie";
import { VideoBlock } from "../src/components/VideoBlock";
import { UltraHeader } from "../src/components/UltraHeader";
import { Form } from "../src/components/Form";

import api from "../src/api";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { IGetLayout } from "../src/components/DefaultLayout";
import { useRouter } from "next/router";

const PartnerRecommendationPage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content }) => {
  const router = useRouter();
  const [cookies] = useCookies();
  return (
    <div className="first-steps">
      <UltraHeader
        backgroundImageUrl={content.background_image}
        language={router.locale as any}
        title={content.landingpage_title}
        badge={content.landingpage_badge}
        subtitle={content.landingpage_text}
        form={
          <Form
            text={content.landingpage_form_text}
            firstNameLabel={content.landingpage_first_name_input_label}
            lastNameLabel={content.landingpage_last_name_input_label}
            emailLabel={content.landingpage_email_input_label}
            phoneLabel={content.landingpage_phone_input_label}
            buttonLabel={content.landingpage_button_label}
            jobcenterLabel={content.landingpage_registered_input_label}
            jobcenterErrorMessage={content.landingpage_registered_error_message}
            jobcenterOptions={content.landingpage_registered_items}
            jobcenterTooltip={content.registered_tooltip}
            successMessage={content.landingpage_message}
            language={router.locale as any}
            // 1 = New Lead in Pipeline
            stageId={1}
            leadSource={"Partner Referral"}
            meetingDateLabel={content.meeting_date_label}
            meetingDateOptions={content.meeting_date_options}
            meetingDateSubmit={content.meeting_date_submit}
            meetingDateSuccessMessage={content.meeting_date_success_message}
          />
        }
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
      <Bootcamps
        title={content.bootcamps_title}
        items={content.bootcamps_items}
      />
      <Timeline
        title={content.timeline_title}
        text={content.timeline_text}
        items={content.timeline_items}
      />
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
      <section className="video-block-container">
        <VideoBlock
          title={content.title}
          subtitle={content.subtitle}
          youtubeVideoId={content.youtube_video_id}
          image={content.image}
        />
      </section>
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
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ content: any }> = async (
  props
) => {
  const locale = props.locale === "default" ? "de" : props.locale;
  const content = (await api.getContent(
    "landing-page-partner-recommendation",
    locale
  )) as any;
  return {
    props: {
      content: content.content,
      title: content.title,
      description: content.description,
      locale: locale,
    },
  };
};

export default PartnerRecommendationPage;
