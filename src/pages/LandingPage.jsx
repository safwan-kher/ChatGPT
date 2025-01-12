import React from "react";
import { withCookies } from "react-cookie";

// Helper
import api from "api";
import utils from "utils";

// Page
import Page from "./Page";

// Components
import LearnMore from "components/LearnMore";
import Input from "components/Input";
import Dropdown from "components/Dropdown";
import Checkbox from "components/Checkbox";
import Button from "components/Button";
import BadgeTitle from "components/BadgeTitle";
import { getReferral } from "components/ReferralWrapper";

// Styles

class LandingPage extends Page {
  constructor(props) {
    super(props);
    this.state = {
      currentLanguage: props.language,
      eficadsPixel: null,
      showEficadsPixel: false,
      convId: null,
      wasFormSent: false,
      isBusy: false,
      hasInvalidFields: true,
      showAgeError: false,
      showRegisteredError: false,
      campus: false,
      language: true,
      first_name: false,
      last_name: false,
      registered: false,
      jobcoach: false,
      age: false,
      email: false,
      phone: false,
      city: false,
      referral: false,
      earliestDate: false,
      commitment: false,
      internet: false,
      consent: false,
      isExtendedForm: false,
      webinarDate: false,
    };
  }
  componentDidMount() {
    super.componentDidMount();

    // Eficads pixel
    const timestamp = +new Date();
    const utmSource = new URL(window.location).searchParams.get("utm_source");
    if (
      utmSource === "eficads" &&
      ["/de/landing-page", "/en/landing-page"].includes(
        window.location.pathname
      )
    ) {
      const rand = Math.round(Math.random() * 1000);
      const convId = `${timestamp}${rand}`;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "Eficads Pixel",
        convId,
      });
      const imageSrc = `https://perf.af.funneldrivers.com/ts/i5543965/tsa?typ=i&tst=${timestamp}&trc=default&ctg=Leads&sid=&cid=${convId}&orv=6&orc=EUR`;
      this.setState({
        convId,
        eficadsPixel: (
          <img
            src={imageSrc}
            alt="Tracking pixel"
            border="0"
            height="1"
            width="1"
            style={{ display: "none" }}
          />
        ),
      });
    }

    if (window.location.pathname === "/en/landing-page") {
      window.VIDEOASK_EMBED_CONFIG = {
        kind: "widget",
        url: "https://www.videoask.com/fln1gmhw7",
        options: {
          widgetType: "VideoThumbnailExtraLarge",
          text: "Hi there 👋🏽",
          backgroundColor: "#3206e2",
          position: "bottom-right",
          dismissable: false,
        },
      };
      const headTag = document.getElementsByTagName("head")[0];
      var s = document.createElement("script");
      s.src = "https://www.videoask.com/embed/embed.js";
      headTag.appendChild(s);
    }
  }
  componentDidUpdate() {
    if (this.state.content && !this.state.isExtendedForm) {
      if (
        this.state.content.landingpage_campus_items &&
        this.state.content.landingpage_language_items &&
        this.state.content.landingpage_age_input_label &&
        this.state.content.landingpage_city_input_label &&
        this.state.content.landingpage_referral_items &&
        this.state.content.landingpage_earliest_starting_date_items &&
        this.state.content.landingpage_commitment_items &&
        this.state.content.landingpage_internet_items
      ) {
        this.setState({ isExtendedForm: true });
      }
    }
  }
  checkFormValidity() {
    let hasInvalidFields = [
      "first_name",
      "last_name",
      "registered",
      "email",
      "phone",
    ];
    if (this.state.isExtendedForm) {
      hasInvalidFields = [
        ...hasInvalidFields,
        "campus",
        "language",
        "age",
        "city",
        "referral",
        "earliestDate",
        "commitment",
        "internet",
      ];
    }
    if (this.state.content.landingpage_jobcoach_input_label) {
      hasInvalidFields = [...hasInvalidFields, "jobcoach"];
    }
    if (this.state.content.date_dropdown_label) {
      hasInvalidFields = ["first_name", "last_name", "email", "webinarDate"];
    }
    this.setState({
      hasInvalidFields: hasInvalidFields.some(
        (key) => this.state[key] === false
      ),
    });
  }

  // Submit form to Pipedrive
  wasAnsweredPositively(str) {
    return ["yes", "ja"].includes(str.toLowerCase());
  }

  submitForm() {
    if (!this.state.hasInvalidFields) {
      const tiktokEvent = this.state.content.date_dropdown_label
        ? "Registration"
        : "SubmitForm";
      window.ttq.track(tiktokEvent);
      this.setState({ isBusy: true });
      const first_name = this.state.first_name;
      const last_name = this.state.last_name;
      const email = this.state.email;
      let customFields = {
        "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": `${
          this.props.leadSource
        }${getReferral(this.props.cookies.get("ref"))}`,
        "8a2d9fc96a0b7d037839d71aa4b3acc774c9b9c8": this.state.registered,
        phone: this.state.phone,
        ff8fcfd408c0714269993b513855617459da45d6: this.state.consent
          ? "Yes"
          : "No",
      };
      if (this.state.isExtendedForm) {
        customFields["b43066ae82c7a041d90c15d192bec212599a55c3"] =
          this.state.campus;
        customFields["dc0a286b9fe00ab025597776b38364624d981bb9"] =
          this.state.language;
        customFields["658c5427283dffb20a79af4c93abff499d8c6083"] =
          this.state.age;
        customFields["ff5cbb72cbacd4bd2a25faf31fd4cea46313b72a"] =
          this.state.city;
        customFields["3c026432b11dd8fda78895fd33ae90b8d46edad3"] =
          this.state.referral;
        customFields["9408128d84ee27ef18100c3cf19834b9f370a19f"] =
          this.state.earliestDate;
        customFields["7422b1af641c6d5fe50bbfe2a2a4a09b6f7f36ca"] =
          this.state.commitment;
        customFields["dcc1d23cec7811422298af1eb53258ccb0f97ef9"] =
          this.state.internet;
      } else {
        customFields["dc0a286b9fe00ab025597776b38364624d981bb9"] =
          this.state.currentLanguage === "de" ? "Deutsch" : "English";
      }
      if (this.state.content.landingpage_jobcoach_input_label) {
        customFields[
          "3c026432b11dd8fda78895fd33ae90b8d46edad3"
        ] = `JobCoach - ${this.state.jobcoach}`;
      }

      let showEficadsPixel = false;
      if (
        this.state.convId &&
        this.wasAnsweredPositively(this.state.registered) &&
        this.wasAnsweredPositively(this.state.commitment) &&
        this.wasAnsweredPositively(this.state.internet)
      ) {
        showEficadsPixel = true;
        customFields["54c549a35462af1013ec25ccdc64625aadffe99f"] =
          this.state.convId;
      }
      const userData = {
        fn: first_name,
        ln: last_name,
        em: email,
        ph: this.state.phone,
      };
      const customData = {
        registered: this.state.registered,
      };
      if (this.state.isExtendedForm) {
        userData.ct = this.state.city;
        customData.campus = this.state.campus;
        customData.language =
          this.state.language === "de" ? "Deutsch" : "English";
        customData.age = this.state.age;
        customData.earliestDate = this.state.earliestDate;
        customData.referral = this.state.referral;
        customData.commitment = this.state.commitment;
        customData.internet = this.state.internet;
      }

      if (this.state.content.date_dropdown_label) {
        delete userData.ph;
        delete customData.registered;
        customFields = {
          "8cbaebfb84deca2ab3f762c3544a6aa4647d36b7": this.state.webinarDate,
          "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": `Webinar Signup${getReferral(
            this.props.cookies.get("ref")
          )}`,
          phone: this.state.phone,
          ff8fcfd408c0714269993b513855617459da45d6: this.state.consent
            ? "Yes"
            : "No",
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          dc0a286b9fe00ab025597776b38364624d981bb9:
            this.props.language === "de" ? "Deutsch" : "English",
        };
      }

      const event = this.state.content.date_dropdown_label
        ? "Complete Registration"
        : "Lead";
      const stageId = this.state.content.date_dropdown_label ? 42 : false;

      api.trackFbEvent({
        eventName: event,
        externalId: this.props.cookies.get("session"),
        firstName: first_name,
        lastName: last_name,
        email: email,
        phone: this.state.content.date_dropdown_label ? null : this.state.phone,
        customDataObj: customData,
      });

      api.addPerson(
        first_name,
        last_name,
        email,
        customFields,
        "LandingPage",
        stageId
      );

      this.setState({
        isBusy: false,
        wasFormSent: true,
        showEficadsPixel,
      });
    }
  }
  render() {
    if (!this.state.content) {
      return super.render();
    }

    const {
      landingpage_title,
      landingpage_badge,
      landingpage_text,
      landingpage_form_text,
      landingpage_campus_input_label,
      landingpage_campus_items,
      landingpage_language_input_label,
      landingpage_language_items,
      landingpage_first_name_input_label,
      landingpage_last_name_input_label,
      landingpage_registered_input_label,
      landingpage_registered_items,
      landingpage_registered_error_message,
      landingpage_jobcoach_input_label,
      landingpage_age_input_label,
      landingpage_age_minimum,
      landingpage_email_input_label,
      landingpage_phone_input_label,
      landingpage_city_input_label,
      landingpage_referral_input_label,
      landingpage_referral_items,
      landingpage_commitment_input_label,
      landingpage_commitment_items,
      landingpage_internet_input_label,
      landingpage_internet_items,
      landingpage_consent_input_label,
      landingpage_button_label,
      landingpage_message,
      landingpage_partners_title,
      landingpage_partners_items,
      landingpage_earliest_starting_date_input_label,
      landingpage_earliest_starting_date_items,
      learn_title,
      learn_text,
      learn_items,
      learn_button_label,
      learn_button_link,
      date_dropdown_label,
      date_dropdown_options,
    } = this.state.content;
    const {
      eficadsPixel,
      showEficadsPixel,
      wasFormSent,
      isBusy,
      hasInvalidFields,
      showAgeError,
      showRegisteredError,
      currentLanguage,
    } = this.state;

    const partners = [];
    landingpage_partners_items.forEach((item, index) => {
      partners.push(
        <div className="col-3 col-6-sm" key={index}>
          <div className="landing-page__partners__images__item">
            <img src={item.image} alt={item.name} />
          </div>
        </div>
      );
    });

    return (
      <div className="landing-page">
        <div className="landing-page__hero slider-block slider-block-first-load">
          <div className="full-width-outer">
            <div className="full-width-inner">
              <div className="row">
                <div className="col-1 col-0-sm" />
                <div className="col-5 col-12-sm">
                  <div className="landing-page__hero__content slider">
                    <BadgeTitle
                      title={landingpage_title}
                      badge={landingpage_badge}
                    />
                    <p
                      className="landing-page__hero__content__text"
                      dangerouslySetInnerHTML={{
                        __html: utils.cleanText(landingpage_text, true),
                      }}
                    />
                  </div>
                </div>
                <div className="col-5 col-12-sm">
                  <div
                    className="landing-page__hero__form slider slider-delay-1"
                    role="form"
                  >
                    <img
                      className="landing-page__hero__form__floater"
                      src={"/assets/floaters/stairs.png"}
                      alt=""
                    />
                    <img
                      className="landing-page__hero__form__floater"
                      src={"/assets/floaters/cube.png"}
                      alt=""
                    />
                    <img
                      className="landing-page__hero__form__floater"
                      src={"/assets/floaters/stairs-white4.png"}
                      alt=""
                    />
                    <div className="landing-page__hero__form__text">
                      {landingpage_form_text}
                    </div>
                    {landingpage_campus_items && (
                      <Dropdown
                        label={landingpage_campus_input_label}
                        items={landingpage_campus_items.map(
                          (item) => item.item
                        )}
                        required={true}
                        disabled={wasFormSent}
                        onChange={(val, isValid) => {
                          this.setState(
                            {
                              campus: isValid ? val : false,
                            },
                            this.checkFormValidity
                          );
                        }}
                      />
                    )}
                    {landingpage_earliest_starting_date_items && (
                      <Dropdown
                        label={landingpage_earliest_starting_date_input_label}
                        items={landingpage_earliest_starting_date_items.map(
                          (item) => item.item
                        )}
                        required={true}
                        disabled={wasFormSent}
                        onChange={(val, isValid) => {
                          this.setState(
                            {
                              earliestDate: isValid ? val : false,
                            },
                            this.checkFormValidity
                          );
                        }}
                      />
                    )}
                    {landingpage_language_items && (
                      <Dropdown
                        label={landingpage_language_input_label}
                        items={landingpage_language_items.map(
                          (item) => item.item
                        )}
                        value={
                          landingpage_language_items[
                            currentLanguage === "en" ? 0 : 1
                          ].item
                        }
                        required={true}
                        disabled={wasFormSent}
                        onChange={(val, isValid) => {
                          this.setState(
                            {
                              language: isValid ? val : false,
                            },
                            this.checkFormValidity
                          );
                        }}
                      />
                    )}
                    <div className="row">
                      <div className="col-6 col-12-sm">
                        <Input
                          label={landingpage_first_name_input_label}
                          required={true}
                          disabled={wasFormSent}
                          onChange={(val, isValid) => {
                            this.setState(
                              {
                                first_name: isValid ? val : false,
                              },
                              this.checkFormValidity
                            );
                          }}
                        />
                      </div>
                      <div className="col-6 col-12-sm">
                        <Input
                          label={landingpage_last_name_input_label}
                          required={true}
                          disabled={wasFormSent}
                          onChange={(val, isValid) => {
                            this.setState(
                              {
                                last_name: isValid ? val : false,
                              },
                              this.checkFormValidity
                            );
                          }}
                        />
                      </div>
                    </div>
                    {!this.state.content.date_dropdown_label && (
                      <Dropdown
                        language={this.props.language}
                        label={landingpage_registered_input_label}
                        items={landingpage_registered_items.map(
                          (item) => item.item
                        )}
                        required={true}
                        disabled={wasFormSent}
                        onChange={(val, isValid) => {
                          const allGood =
                            isValid && this.wasAnsweredPositively(val);
                          this.setState(
                            {
                              registered: allGood ? val : false,
                              showRegisteredError: !allGood,
                            },
                            this.checkFormValidity
                          );
                        }}
                      />
                    )}
                    {showRegisteredError && (
                      <div
                        className="landing-page__hero__form__error"
                        dangerouslySetInnerHTML={{
                          __html: utils.cleanText(
                            landingpage_registered_error_message,
                            true
                          ),
                        }}
                      />
                    )}
                    {landingpage_jobcoach_input_label && (
                      <Input
                        label={landingpage_jobcoach_input_label}
                        required={true}
                        disabled={wasFormSent}
                        onChange={(val, isValid, validate) => {
                          this.setState(
                            {
                              jobcoach: isValid ? val : false,
                            },
                            this.checkFormValidity
                          );
                        }}
                      />
                    )}
                    {landingpage_age_input_label && (
                      <Input
                        label={landingpage_age_input_label}
                        type="number"
                        required={true}
                        disabled={wasFormSent}
                        minNum={landingpage_age_minimum}
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
                    )}
                    {showAgeError && (
                      <div className="landing-page__hero__form__error">
                        {this.props.language === "en"
                          ? `Applicants need to be ${landingpage_age_minimum} years or older`
                          : `Sie müssen ${landingpage_age_minimum} Jahre oder älter sein`}
                      </div>
                    )}
                    <Input
                      label={landingpage_email_input_label}
                      type="email"
                      required={true}
                      disabled={wasFormSent}
                      onChange={(val, isValid) => {
                        this.setState(
                          {
                            email: isValid ? val : false,
                          },
                          this.checkFormValidity
                        );
                      }}
                    />
                    {!this.state.content.date_dropdown_label && (
                      <Input
                        label={landingpage_phone_input_label}
                        required={true}
                        disabled={wasFormSent}
                        onChange={(val, isValid) => {
                          this.setState(
                            {
                              phone: isValid ? val : false,
                            },
                            this.checkFormValidity
                          );
                        }}
                      />
                    )}
                    {landingpage_city_input_label && (
                      <Input
                        label={landingpage_city_input_label}
                        required={true}
                        disabled={wasFormSent}
                        onChange={(val, isValid) => {
                          this.setState(
                            {
                              city: isValid ? val : false,
                            },
                            this.checkFormValidity
                          );
                        }}
                      />
                    )}
                    {landingpage_referral_items && (
                      <Dropdown
                        label={landingpage_referral_input_label}
                        items={landingpage_referral_items.map(
                          (item) => item.item
                        )}
                        required={true}
                        disabled={wasFormSent}
                        onChange={(val, isValid) => {
                          this.setState(
                            {
                              referral: isValid ? val : false,
                            },
                            this.checkFormValidity
                          );
                        }}
                      />
                    )}
                    {date_dropdown_label && (
                      <Dropdown
                        label={date_dropdown_label}
                        items={date_dropdown_options.map((item) => item.option)}
                        required={true}
                        disabled={wasFormSent}
                        onChange={(val, isValid) => {
                          this.setState(
                            {
                              webinarDate: isValid ? val : false,
                            },
                            this.checkFormValidity
                          );
                        }}
                      />
                    )}
                    {landingpage_commitment_items && (
                      <Dropdown
                        label={landingpage_commitment_input_label}
                        items={landingpage_commitment_items.map(
                          (item) => item.item
                        )}
                        required={true}
                        disabled={wasFormSent}
                        onChange={(val, isValid) => {
                          this.setState(
                            {
                              commitment: isValid ? val : false,
                            },
                            this.checkFormValidity
                          );
                        }}
                      />
                    )}
                    {landingpage_internet_items && (
                      <Dropdown
                        label={landingpage_internet_input_label}
                        items={landingpage_internet_items.map(
                          (item) => item.item
                        )}
                        required={true}
                        disabled={wasFormSent}
                        onChange={(val, isValid) => {
                          this.setState(
                            {
                              internet: isValid ? val : false,
                            },
                            this.checkFormValidity
                          );
                        }}
                      />
                    )}
                    <div className="landing-page__hero__form__checkboxes">
                      <Checkbox
                        label={landingpage_consent_input_label}
                        disabled={wasFormSent}
                        onChange={(val) => {
                          this.setState(
                            {
                              consent: val,
                            },
                            this.checkFormValidity
                          );
                        }}
                      />
                    </div>
                    <div className="landing-page__hero__form__button">
                      {wasFormSent ? (
                        <div className="landing-page__hero__form__message">
                          {landingpage_message}
                          {showEficadsPixel && eficadsPixel}
                        </div>
                      ) : (
                        <Button
                          busy={isBusy}
                          disabled={hasInvalidFields}
                          onClick={() => {
                            this.submitForm();
                          }}
                          label={landingpage_button_label}
                          variant="transparent-blue-alt"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-1 col-0-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="landing-page__partners slider-block">
          <div className="row">
            <div className="col-2 col-0-sm" />
            <div className="col-8 col-12-sm slider">
              <h2 className="landing-page__partners__title">
                {landingpage_partners_title}
              </h2>
              <div className="landing-page__partners__images">
                <div className="row">{partners}</div>
              </div>
            </div>
            <div className="col-2 col-0-sm" />
          </div>
        </div>

        <LearnMore
          title={learn_title}
          text={learn_text}
          items={learn_items}
          buttonLabel={learn_button_label}
          buttonLink={learn_button_link}
          isLandingPage={true}
        />
      </div>
    );
  }
}

export default withCookies(LandingPage);
