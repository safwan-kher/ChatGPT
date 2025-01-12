import React from 'react';

// Page
import Page from './Page';

// Components
import HeroWithText from 'components/HeroWithText';
import CompassBlock from 'components/CompassBlock';
import LearnMore from 'components/LearnMore';
import Students from 'components/Students';
import Providers from 'components/Providers';
import Supporters from 'components/Supporters';
import EasySteps from 'components/EasySteps';
import Signup from 'components/Signup';

export default class Home extends Page {
  componentDidMount() {
    super.componentDidMount();

    const headTag = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');
    s.src = 'https://trk.eficads.net/event/tag.js?adid=149&tid=146';
    s.async = true;
    headTag.appendChild(s);
  }
  render() {
    const { content } = this.state;

    if (!content) {
      return super.render();
    }
    return (
      <div className="home">

        <HeroWithText
          title={content.hero_title}
          text={content.hero_text}
          buttonLabel={content.hero_button_label}
          buttonLink={content.hero_button_link}
          image={content.hero_image}
          videoThumbnail={content.video_thumbnail}
          language={this.props.language}
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
          checkboxLabelTermsLinkLabel={content.signup_checkbox_label_terms_link_label}
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
  }
}
