import React from 'react';

// Page
import Page from './Page';

// Components
import AboutHero from 'components/AboutHero';
import CoreValues from 'components/CoreValues';
import Team from 'components/Team';
import Signup from 'components/Signup';

export default class About extends Page {
  componentDidMount() {
    super.componentDidMount();
  }
  render() {
    const { content } = this.state;

    if (!content) {
      return super.render();
    }
    return (
      <div className="about">

        <AboutHero
          title={ content.abouthero_title }
          heading={ content.abouthero_heading }
          text={ content.abouthero_text }
          image={ content.abouthero_image }
        />

        <CoreValues
          title={ content.corevalues_title }
          topLeftHeading={ content.corevalues_top_left_heading }
          topLeftText={ content.corevalues_top_left_text }
          topRightHeading={ content.corevalues_top_right_heading }
          topRightText={ content.corevalues_top_right_text }
          bottomLeftHeading={ content.corevalues_bottom_left_heading }
          bottomLeftText={ content.corevalues_bottom_left_text }
          bottomRightHeading={ content.corevalues_bottom_right_heading }
          bottomRightText={ content.corevalues_bottom_right_text }
        />

        <Team
          title={ content.team_title }
          items={ content.team_items }
          buttonLabel={ content.team_button_label }
          buttonLink={ content.team_button_link }
        />

        <Signup
          title={ content.signup_title }
          firstNameInputLabel={ content.signup_first_name_input_label }
          lastNameInputLabel={ content.signup_last_name_input_label }
          emailInputLabel={ content.signup_email_input_label }
          phoneInputLabel={ content.signup_phone_input_label }
          checkboxLabelJobCenter={ content.signup_checkbox_label_job_center }
          checkboxLabelTermsPre={ content.signup_checkbox_label_terms_pre }
          checkboxLabelTermsLink={ content.signup_checkbox_label_terms_link }
          checkboxLabelTermsLinkLabel={ content.signup_checkbox_label_terms_link_label }
          checkboxLabelTermsPost={ content.signup_checkbox_label_terms_post }
          checkboxLabelConsent={ content.signup_checkbox_label_consent }
          buttonLabel={ content.signup_button_label }
          block1Title={ content.signup_block1_title }
          block1ButtonLabel={ content.signup_block1_button_label }
          block2Title={ content.signup_block2_title }
          block2ButtonLabel={ content.signup_block2_button_label }
          message={ content.signup_message }
        />

      </div>
    );
  }
}
