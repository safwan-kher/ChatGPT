import React from 'react';
import { withCookies } from "react-cookie"

// Helper
import api from 'api';

// Page
import Page from './Page';

// Components
import Input from 'components/Input';
import Dropdown from 'components/Dropdown';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';
import { getReferral } from 'components/ReferralWrapper';

// Styles


class ApplyNow extends Page {
  constructor(props) {
    super(props);
    this.state = {
      wasFormSent: false,
      isBusy: false,
      hasInvalidFields: true,
      showAgeError: false,
      campus: false,
      language: false,
      first_name: false,
      last_name: false,
      registered: false,
      age: false,
      email: false,
      phone: false,
      city: false,
      referral: false,
      earliestDate: false,
      consent: false,
    };
  }
  componentDidMount() {
    super.componentDidMount();
  }
  checkFormValidity() {
    const hasInvalidFields = [
      'campus',
      'language',
      'first_name',
      'last_name',
      'registered',
      'age',
      'email',
      'phone',
      'city',
      'referral',
      'earliestDate',
    ].some((key) => this.state[key] === false);
    this.setState({
      hasInvalidFields,
    });
  }

  // Submit form to Pipedrive
  submitForm() {
    if (!this.state.hasInvalidFields) {
      this.setState({ isBusy: true });
      const first_name = this.state.first_name;
      const last_name = this.state.last_name;
      const email = this.state.email;
      const customFields = {
        '19ddc486147c0bed2f2d0ca5a540854ef33bdf69': `Apply Now${getReferral(this.props.cookies.get("ref"))}`,
        'b43066ae82c7a041d90c15d192bec212599a55c3': this.state.campus,
        'dc0a286b9fe00ab025597776b38364624d981bb9': this.state.language === 'de' ? 'Deutsch' : 'English',
        '8a2d9fc96a0b7d037839d71aa4b3acc774c9b9c8': this.state.registered,
        '658c5427283dffb20a79af4c93abff499d8c6083': this.state.age,
        phone: this.state.phone,
        'ff5cbb72cbacd4bd2a25faf31fd4cea46313b72a': this.state.city,
        '3c026432b11dd8fda78895fd33ae90b8d46edad3': this.state.referral,
        '9408128d84ee27ef18100c3cf19834b9f370a19f': this.state.earliestDate,
        'ff8fcfd408c0714269993b513855617459da45d6': this.state.consent ? 'Yes' : 'No',
      };

      const customData = {
        campus: this.state.campus,
        language: this.state.language === 'de' ? 'Deutsch' : 'English',
        registered: this.state.registered,
        age: this.state.age,
        referral: this.state.referral,
        earliestDate: this.state.earliestDate,
      };

      api.trackFbEvent({
        eventName: "Lead",
        externalId: this.props.cookies.get("session"),
        firstName: first_name,
        lastName: last_name,
        email: email,
        phone: this.state.phone,
        city: this.state.city,
        customDataObj: customData
      })


      api.addPerson(first_name, last_name, email, customFields, 'ApplyNow')

      this.setState({
        isBusy: false,
        wasFormSent: true,
      });
    }
  };
  render() {
    if (!this.state.content) {
      return super.render();
    }
    const {
      applynow_title,
      applynow_text,
      applynow_campus_input_label,
      applynow_campus_items,
      applynow_language_input_label,
      applynow_language_items,
      applynow_first_name_input_label,
      applynow_last_name_input_label,
      applynow_registered_input_label,
      applynow_registered_items,
      applynow_age_input_label,
      applynow_email_input_label,
      applynow_phone_input_label,
      applynow_city_input_label,
      applynow_referral_input_label,
      applynow_referral_items,
      applynow_consent_input_label,
      applynow_button_label,
      applynow_message,
      applynow_earliest_starting_date_input_label,
      applynow_earliest_starting_date_items,
    } = this.state.content;
    const {
      wasFormSent,
      isBusy,
      hasInvalidFields,
      showAgeError,
    } = this.state;

    return (
      <div className="apply-now-form slider-block slider-block-first-load">
        <div className="full-width-outer">
          <div className="full-width-inner">
            <div className="row">
              <div className="col-3 col-0-sm" />
              <div className="col-6 col-12-sm">
                <h2 className="apply-now-form__title slider">
                  {applynow_title}
                </h2>
              </div>
              <div className="col-3 col-0-sm" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-2 col-0-sm" />
          <div className="col-8 col-12-sm">
            <div
              className="apply-now-form__form slider slider-delay-1"
              role="form"
            >
              <img
                className="apply-now-form__form__floater"
                src={'/assets/floaters/stairs4.png'}
                alt=""
              />
              <img
                className="apply-now-form__form__floater"
                src={'/assets/floaters/stairs-white4.png'}
                alt=""
              />
              <div className="apply-now-form__form__text">
                {applynow_text}
              </div>
              <Dropdown
                label={applynow_campus_input_label}
                items={applynow_campus_items.map((item) => item.item)}
                required={true}
                disabled={wasFormSent}
                onChange={(val, isValid) => {
                  this.setState({
                    campus: isValid ? val : false,
                  }, this.checkFormValidity);
                }}
              />
              <Dropdown
                label={applynow_earliest_starting_date_input_label}
                items={applynow_earliest_starting_date_items.map((item) => item.item)}
                required={true}
                disabled={wasFormSent}
                onChange={(val, isValid) => {
                  this.setState({
                    earliestDate: isValid ? val : false,
                  }, this.checkFormValidity);
                }}
              />
              <Dropdown
                label={applynow_language_input_label}
                items={applynow_language_items.map((item) => item.item)}
                required={true}
                disabled={wasFormSent}
                onChange={(val, isValid) => {
                  this.setState({
                    language: isValid ? val : false,
                  }, this.checkFormValidity);
                }}
              />
              <div className="row">
                <div className="col-6 col-12-sm">
                  <Input
                    label={applynow_first_name_input_label}
                    required={true}
                    disabled={wasFormSent}
                    onChange={(val, isValid) => {
                      this.setState({
                        first_name: isValid ? val : false,
                      }, this.checkFormValidity);
                    }}
                  />
                </div>
                <div className="col-6 col-12-sm">
                  <Input
                    label={applynow_last_name_input_label}
                    required={true}
                    disabled={wasFormSent}
                    onChange={(val, isValid) => {
                      this.setState({
                        last_name: isValid ? val : false,
                      }, this.checkFormValidity);
                    }}
                  />
                </div>
              </div>
              <Dropdown
                language={this.props.language}
                label={applynow_registered_input_label}
                items={applynow_registered_items.map((item) => item.item)}
                required={true}
                disabled={wasFormSent}
                onChange={(val, isValid) => {
                  this.setState({
                    registered: isValid ? val : false,
                  }, this.checkFormValidity);
                }}
              />
              <Input
                label={applynow_age_input_label}
                type="number"
                required={true}
                disabled={wasFormSent}
                minNum={18}
                onChange={(val, isValid, validate) => {
                  const newState = {
                    age: isValid ? val : false,
                  };
                  if (validate || isValid) {
                    newState.showAgeError = !isValid;
                  }
                  this.setState(newState, this.checkFormValidity);
                }}
              />
              {showAgeError && (
                <div className="apply-now-form__form__error">{this.props.language === 'en' ? 'Applicants need to be 18 years or older' : 'Sie müssen 18 Jahre oder älter sein'}</div>
              )}
              <Input
                label={applynow_email_input_label}
                type="email"
                required={true}
                disabled={wasFormSent}
                onChange={(val, isValid) => {
                  this.setState({
                    email: isValid ? val : false,
                  }, this.checkFormValidity);
                }}
              />
              <Input
                label={applynow_phone_input_label}
                required={true}
                disabled={wasFormSent}
                onChange={(val, isValid) => {
                  this.setState({
                    phone: isValid ? val : false,
                  }, this.checkFormValidity);
                }}
              />
              <Input
                label={applynow_city_input_label}
                required={true}
                disabled={wasFormSent}
                onChange={(val, isValid) => {
                  this.setState({
                    city: isValid ? val : false,
                  }, this.checkFormValidity);
                }}
              />
              <Dropdown
                label={applynow_referral_input_label}
                items={applynow_referral_items.map((item) => item.item)}
                required={true}
                disabled={wasFormSent}
                onChange={(val, isValid) => {
                  this.setState({
                    referral: isValid ? val : false,
                  }, this.checkFormValidity);
                }}
              />
              <div className="apply-now-form__form__checkboxes">
                <Checkbox
                  label={applynow_consent_input_label}
                  disabled={wasFormSent}
                  onChange={(val) => {
                    this.setState({
                      consent: val,
                    }, this.checkFormValidity);
                  }}
                />
              </div>
              <div className="apply-now-form__form__button">
                {wasFormSent ? (
                  <div className="apply-now-form__form__message">
                    {applynow_message}
                  </div>
                ) : (
                    <Button
                      busy={isBusy}
                      disabled={hasInvalidFields}
                      onClick={() => {
                        this.submitForm();
                      }}
                      label={applynow_button_label}
                      variant="transparent-blue-alt"
                    />
                  )}
              </div>
            </div>
          </div>
          <div className="col-2 col-0-sm" />
        </div>
      </div>
    );
  }
}

export default withCookies(ApplyNow)