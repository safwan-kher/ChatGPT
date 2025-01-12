import { GetStaticProps, InferGetStaticPropsType } from "next";
import { FC } from "react";
import api from "../src/api";
import { IGetLayout } from "../src/components/DefaultLayout";
import { OrientationHeader } from "../src/components/OrientationHeader";
import { Certification } from "../src/components/Certification";
import { BigQuestions } from "../src/components/BigQuestions";
import { StudentJourneys } from "../src/components/StudentJourneys";
import { LogoCarousel } from "../src/components/LogoCarousel";
import { VideoContent } from "../src/components/VideoContent";
import { StartStepsBenefits } from "../src/components/StartStepsBenefits";
import { StudentTestimonials } from "../src/components/StudentTestimonials";
import Community from "../src/components/Community";
import ThreeColumnImage from "../src/components/ThreeColumnImage";
import { getOrientationCourseLayout } from "../src/components/OrientationCourseLayout";

const CompassOrientatePage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content }) => {
  return (
    <div>
      <OrientationHeader
        heading={content.heading}
        sub_heading={content.sub_heading}
        content={content.content}
        image={content.image}
        features={content.features}
        pipedrive_lead_source={content.pipedrive_lead_source}
        pipedrive_stage_id={content.pipedrive_stage_id}
        form_submit_success_message={content.form_submit_success_message}
        extra_dropdowns={content.form_extra_dropdowns}
        trackPurchase={true}
        altFormLabels={true}
      />
      <Certification
        image={content.certification.certification_image}
        name={content.certification.certification_name}
        alt={true}
      />
      <BigQuestions
        heading={content.big_questions.heading}
        questions={content.big_questions.questions}
      />
      <StudentJourneys journeys={content.student_journeys.journeys} />
      <div className="max-w-6xl mx-auto">
        <ThreeColumnImage
          title={content.threecolumnimage_title}
          text={content.threecolumnimage_text}
          items={content.threecolumnimage_items}
        />
      </div>
      <LogoCarousel
        logos={content.logo_carousel.logos}
        title={content.logo_carousel.title}
        altStyle={false}
      />
      <LogoCarousel
        logos={content.logo_carousel_2.logos}
        title={content.logo_carousel_2.title}
        altStyle={true}
      />
      <VideoContent
        heading={content.video_content.heading}
        content={content.video_content.content}
        youtube_video_id={content.video_content.youtube_video_id}
        steps={content.video_content.steps}
        thumbnail={content.video_content.thumbnail}
      />
      <div className="max-w-[1400px] w-full mx-auto">
        <Community
          title={content.community_title}
          text={content.community_text}
          items={content.community_items}
          bottomTitle={content.community_bottom_title}
          bottomTitleSub={content.community_bottom_title_sub}
          bottomButtonLabel={content.community_bottom_button_label}
          onlyFileDownload={content.only_file_download}
        />
      </div>
      <StartStepsBenefits
        heading={content.startsteps_benefits.heading}
        benefits={content.startsteps_benefits.benefits}
      />
      <StudentTestimonials testimonials={content.testimonials} />
    </div>
  );
};

CompassOrientatePage.defaultProps = { getLayout: getOrientationCourseLayout };

export const getStaticProps: GetStaticProps<{ content: any }> = async (
  props
) => {
  const locale = props.locale === "default" ? "de" : props.locale;
  const content = (await api.getContent(
    "landing-page-compass-orientate-train-get-hired-tech",
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

export default CompassOrientatePage;
