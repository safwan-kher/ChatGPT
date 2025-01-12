import React, { FC } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import HeroWithText from "../src/components/HeroWithText";
import CompassBlock from "../src/components/CompassBlock";
import LearnMore from "../src/components/LearnMore";
import Students from "../src/components/Students";
import Providers from "../src/components/Providers";
import Supporters from "../src/components/Supporters";
import EasySteps from "../src/components/EasySteps";
import Signup from "../src/components/Signup";
import api from "../src/api";
import { IGetLayout, getDefaultLayout } from "../src/components/DefaultLayout";
import { useRouter } from "next/router";

const HomePage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content }) => {
  const router = useRouter();
  return (
    <div className={`home`}>
      <HeroWithText
        title={content.hero_title}
        text={content.hero_text}
        buttonLabel={content.hero_button_label}
        buttonLink={content.hero_button_link}
        image={content.hero_image}
        videoThumbnail={content.video_thumbnail}
        language={router.locale}
      />
      <CompassBlock
        title={content.compass_title}
        listHeading={content.compass_list_heading}
        listItems={content.compass_list_items}
        bottomTitle={content.compass_bottom_title}
        bottomItems={content.compass_bottom_items}
        directionLabels={content.compass_direction_labels}
        bottomLeftTitle={content.compass_bottom_left_title}
        bottomLeftBody={content.compass_bottom_left_body}
        bottomLeftInfo={content.compass_bottom_left_info}
        bottomLeftButtonLabel={content.compass_bottom_left_button_label}
        bottomLeftButtonLink={content.compass_bottom_left_button_link}
        bottomRightTitle={content.compass_bottom_right_title}
        bottomRightBody={content.compass_bottom_right_body}
        bottomRightInfo={content.compass_bottom_right_info}
        bottomRightButtonLabel={content.compass_bottom_right_button_label}
        bottomRightButtonLink={content.compass_bottom_right_button_link}
      />

      <LearnMore
        title={content.learn_title}
        text={content.learn_text}
        items={content.learn_items}
        buttonLabel={content.learn_button_label}
        buttonLink={content.learn_button_link}
      />

      <Students
        title={content.students_title}
        text={content.students_text}
        buttonLabel={content.students_tooltip_button_label}
        buttonLink={content.students_tooltip_button_link}
        items={content.students_items}
      />

      <Providers
        title={content.providers_title}
        text={content.providers_text}
        tooltipButtonLabel={content.providers_tooltip_button_label}
        items={content.providers_items}
      />

      <Supporters
        title={content.supporters_title}
        items={content.supporters_items}
      />

      <EasySteps
        title={content.easysteps_title}
        text={content.easysteps_text}
        items={content.easysteps_items}
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
      />
    </div>
  );
};

HomePage.defaultProps = { getLayout: getDefaultLayout };

export const getStaticProps: GetStaticProps<{
  content: any;
  title: string;
  description: string;
}> = async (props) => {
  const slug = props.locale === "en" ? "home" : "Startseite";
  const locale = props.locale === "default" ? "de" : props.locale;
  const res: any = await api.getContent(slug, locale);

  return {
    props: {
      content: res.content,
      title: res.title,
      description: res.description,
      locale: locale,
    },
  };
};

export default HomePage;
