import { getCompassCourseLayout } from "../src/components/CompassCourseLayout";
import { FirstSteps } from "components/FirstSteps";
import { OrientationCourseNav } from "components/OrientationCourseNav";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import api from "../src/api";
import { OrientationCourseFAQ } from "components/OrientationCourseFAQ";
import Head from "next/head";
import Script from "next/script";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { FooterAlt2 } from "components/FooterAlt2";
import { TechMentorHeader } from "components/TechMentorHeader";
import { TechMentorFeatures } from "components/TechMentorFeatures";
import { TechMentorTopics } from "components/TechMentorTopics";
import { TechMentorForm } from "components/TechMentorForm";
import { TechMentorBenefits } from "components/TechMentorBenefits";
import { TechMentorStudents } from "components/TechMentorStudents";
import { TechMentorCoursePackage } from "components/TechMentorCoursePackage";
import { TechMentorCourseHow } from "components/TechMentorCourseHow";
import { TechMentorDoubleCarousel } from "components/TechMentorDoubleCarousel";

const LandingPageTechMentor: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ content, title, description }) => {
  const router = useRouter();
  const locale = router.locale === "en" ? "en" : "de";
  return (
    <div>
      <Head>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </Head>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url: `https://startsteps.org/${locale}${router.asPath}`,
          title: `${title}`,
          description: description,
          locale: locale === "en" ? "en_US" : "de_DE",
        }}
      />
      <Script src="https://assets.calendly.com/assets/external/widget.js" />
      <OrientationCourseNav
        enSlug="start-tech-mentor"
        deSlug="start-tech-mentor"
      />
      <section>
        <TechMentorHeader tech_mentor_header={content.tech_mentor_header} />
      </section>
      <section>
        <TechMentorFeatures
          tech_mentor_features={content.tech_mentor_features}
        />
      </section>
      <section>
        <TechMentorTopics tech_mentor_topics={content.tech_mentor_topics} />
      </section>
      <section>
        <TechMentorForm
          tech_mentor_form={content.tech_mentor_form}
          extra_dropdowns={content.form_extra_dropdowns}
        />
      </section>
      <section>
        <TechMentorBenefits
          tech_mentor_benefits={content.tech_mentor_benefits}
        />
      </section>
      <section>
        <TechMentorStudents
          tech_mentor_students={content.tech_mentor_students}
        />
      </section>
      {/* <section>
        <TechMentorCoursePackage
          tech_mentor_course_package={content.tech_mentor_course_package}
        />
      </section> */}
      <section>
        <TechMentorCourseHow tech_mentor_how={content.tech_mentor_how} />
      </section>
      <section>
        <TechMentorDoubleCarousel
          title={content.tech_mentor_bootcamps.title}
          content={content.tech_mentor_bootcamps.content}
          bootcamps1={content.tech_mentor_bootcamps.bootcamps_1}
          title_2={content.tech_mentor_bootcamps.title_2}
          bootcamps2={content.tech_mentor_bootcamps.bootcamps_2}
        />
      </section>
      <section>
        <div className="max-w-7xl mx-auto bg-gray-50 px-4 rounded-lg">
          <FirstSteps
            title={content.orientation_course_first_steps.title}
            subtitle={content.orientation_course_first_steps.subtitle}
            steps={content.orientation_course_first_steps.steps}
            consultingButton={
              content.orientation_course_first_steps.consulting_button
            }
          />
        </div>
      </section>
      <section>
        <OrientationCourseFAQ
          talent_accelerator_faq_title={content.talent_accelerator_faq_title}
          talent_accelerator_faq_faqs={content.talent_accelerator_faq_faqs}
        />
      </section>
      <FooterAlt2 />
    </div>
  );
};

LandingPageTechMentor.defaultProps = {
  getLayout: getCompassCourseLayout,
  useTechMentorFile: true,
} as any;

export const getStaticProps: GetStaticProps<{
  content: any;
  title: any;
  description: any;
}> = async (context) => {
  const locale = context.locale === "en" ? "en" : "de";

  const content = (await api.getContent(
    "landing-page-tech-mentor",
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

export default LandingPageTechMentor;
