import React, { FC } from "react";
import api from "../../src/api";
import { IGetLayout } from "../../src/components/DefaultLayout";
import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

import Community from "../../src/components/Community";
import Curriculum from "../../src/components/Curriculum";
import Providers from "../../src/components/Providers";
import FurtherDetails from "../../src/components/FurtherDetails";
import Signup from "../../src/components/Signup";
import BigHero from "../../src/components/BigHero";
import Apply from "../../src/components/Apply";
import { useCookies } from "react-cookie";

const Partner: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content }) => {
  const [cookies] = useCookies();
  const router = useRouter();
  return (
    <div className="course">
      <BigHero
        image={content.coursehero_image}
        imageText={content.coursehero_image_text}
        title={content.coursehero_title}
        text={content.coursehero_text}
      />

      <Curriculum
        title={content.curriculum_title}
        text={content.curriculum_text}
        items={content.curriculum_items}
      />

      <Community
        title={content.community_title}
        text={content.community_text}
        items={content.community_items}
        bottomTitle={content.community_bottom_title}
        bottomTitleSub={content.community_bottom_title_sub}
        bottomButtonLabel={content.community_bottom_button_label}
      />

      <Providers
        isCourse={true}
        tooltipButtonLabel={content.providers_tooltip_button_label}
        title={content.providers_title}
        text={content.providers_text}
        items={content.providers_items}
      />

      <Apply
        title={content.apply_title}
        text={content.apply_text}
        items={content.apply_items}
        buttonLabel={content.apply_button_label}
        buttonLink={content.apply_button_link}
      />

      <FurtherDetails
        title={content.furtherdetails_title}
        items={content.furtherdetails_blocks}
      />

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
        leadSource={`Download Compass Course Package ${router.locale.toUpperCase()}${
          cookies["ref"] ? ` - Referred by ${cookies["ref"]}` : ""
        }`}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ content: any }> = async (
  context
) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  const slug =
    context.locale === "en"
      ? "compass-course-digital-skills-jobs"
      : "compass-kurs-digital-skills-jobs";
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
