import React from 'react';
import { withCookies } from "react-cookie"

// Page
import Page from './Page';

// Components
import BigHero from 'components/BigHero';
import Curriculum from 'components/Curriculum';
import Community from 'components/Community';
import Providers from 'components/Providers';
import Apply from 'components/Apply';
import FurtherDetails from 'components/FurtherDetails';
import Signup from 'components/Signup';

class Course extends Page {
  componentDidMount() {
    super.componentDidMount('slug');

    const headTag = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');
    s.src = 'https://trk.eficads.net/event/tag.js?adid=149&tid=147';
    s.async = true;
    headTag.appendChild(s);
  }
  render() {
    const { content } = this.state;

    if (!content) {
      return super.render();
    }
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
          checkboxLabelTermsLinkLabel={content.signup_checkbox_label_terms_link_label}
          checkboxLabelTermsPost={content.signup_checkbox_label_terms_post}
          checkboxLabelConsent={content.signup_checkbox_label_consent}
          buttonLabel={content.signup_button_label}
          block1Title={content.signup_block1_title}
          block1ButtonLabel={content.signup_block1_button_label}
          block2Title={content.signup_block2_title}
          block2ButtonLabel={content.signup_block2_button_label}
          message={content.signup_message}
          leadSource={`Download Tech Mentor Course Package ${this.props.language.toUpperCase()}${this.props.cookies.get("ref") ? ` - Referred by ${this.props.cookies.get("ref")}` : ""}`}
        />

      </div>
    );
  }
}
export default withCookies(Course);
