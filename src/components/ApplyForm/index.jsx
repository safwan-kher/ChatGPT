import React from "react";

import Button from "components/Button";
import Input from "components/Input";
import Dropdown from "components/Dropdown";

import utils from "utils";
import api from "api";
import { withCookies } from "react-cookie";
import { TelInput } from "components/TelInput";

export class ApplyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsSubmitting: false,
      formIsSent: false,
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      registered: {
        value: "",
        isValid: false,
      },
    };
  }

  formIsValid() {
    return this.props.jobcenterRequired
      ? this.state.firstName.isValid &&
          this.state.lastName.isValid &&
          this.state.email.isValid &&
          this.state.registered.isValid &&
          (this.state.registered.value === "Yes" ||
            this.state.registered.value === "Ja") &&
          this.state.phone.isValid
      : this.state.firstName.isValid &&
          this.state.lastName.isValid &&
          this.state.email.isValid &&
          this.state.registered.isValid &&
          this.state.phone.isValid;
  }

  async submitForm() {
    if (!this.state.hasInvalidFields) {
      if (typeof window !== undefined) {
        window.ttq.track("SubmitForm");
      }
      const refCookie = this.props.cookies.get("ref");
      this.setState({ formIsSubmitting: true });
      const customFields = {
        "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": `${this.props.formType}${
          refCookie ? ` - Referred by ${refCookie}` : ""
        }`,
        "52234b4b01246fcb183fcf6fdbb082f747774cda": this.props.courseName,
        "8cbaebfb84deca2ab3f762c3544a6aa4647d36b7": this.props.partnerName,
        phone: this.state.phone.value,
        "8a2d9fc96a0b7d037839d71aa4b3acc774c9b9c8": this.state.registered.value,
        dc0a286b9fe00ab025597776b38364624d981bb9:
          this.props.language === "de" ? "German" : "English",
      };
      const customData = {
        selectedCourse: this.props.courseName,
        registered: this.state.registered.value,
        content_name: "Tech Mentor",
        language: this.props.language === "de" ? "Deutsch" : "English",
      };
      await Promise.all([
        api.trackFbEvent({
          eventName: "Lead",
          externalId: this.props.cookies.get("session"),
          firstName: this.state.firstName.value,
          lastName: this.state.lastName.value,
          email: this.state.email.value,
          phone: this.state.phone.value,
          customDataObj: customData,
        }),
        api.addPerson(
          this.state.firstName.value,
          this.state.lastName.value,
          this.state.email.value,
          customFields,
          this.props.formType.split(" ").join(""),
          this.props.stageId
        ),
        this.props.trackPurchase &&
          api.trackFbEvent({
            eventName: "Purchase",
            externalId: this.props.cookies.get("session"),
            firstName: this.state.firstName.value,
            lastName: this.state.lastName.value,
            email: this.state.email.value,
            phone: this.state.phone.value,
            customDataObj: customData,
          }),
      ]);

      this.setState({ formIsSubmitting: false, formIsSent: true });
    }
  }

  render() {
    return (
      <div
        className={`compass-tool-results__form__blocker compass-tool-results__form__blocker--show`}
      >
        <div className="compass-tool-results__form">
          <img
            className="compass-tool-results__form__close"
            src={"/assets/icons/close.svg"}
            alt=""
            onClick={() => this.props.closeForm()}
          />
          {this.state.formIsSent ? (
            <div
              className="compass-tool-results__form__text"
              dangerouslySetInnerHTML={{
                __html: utils.cleanText(this.props.formSuccessMessage),
              }}
            />
          ) : (
            <>
              <div className="compass-tool-results__form__text">
                {this.props.formText}
              </div>
              <div className="row">
                <div className="col-6 col-12-sm">
                  <Input
                    label={this.props.formFirstNameLabel}
                    required
                    disabled={this.state.formIsSubmitting}
                    id="compass-tool-results-form-input"
                    onChange={(val, isValid) => {
                      this.setState({
                        firstName: {
                          value: val,
                          isValid: isValid,
                        },
                      });
                    }}
                  />
                </div>
                <div className="col-6 col-12-sm">
                  <Input
                    label={this.props.formLastNameLabel}
                    required
                    disabled={this.state.formIsSubmitting}
                    onChange={(val, isValid) => {
                      this.setState({
                        lastName: {
                          value: val,
                          isValid: isValid,
                        },
                      });
                    }}
                  />
                </div>
              </div>
              <Input
                label={this.props.formEmailLabel}
                type="email"
                required
                disabled={this.state.formIsSubmitting}
                onChange={(val, isValid) => {
                  this.setState({
                    email: {
                      value: val,
                      isValid: isValid,
                    },
                  });
                }}
              />
              <TelInput
                label={this.props.formPhoneLabel}
                disabled={this.state.formIsSubmitting}
                required
                onChange={(val, isValid) => {
                  this.setState({
                    phone: {
                      value: `+49 ${val}`,
                      isValid: isValid,
                    },
                  });
                }}
              />
              {this.props.jobcenterDropdown && (
                <Dropdown
                  language={this.props.language}
                  label={this.props.formRegisteredLabel}
                  items={
                    this.props.language === "en"
                      ? ["Yes", "No"]
                      : ["Ja", "Nein"]
                  }
                  required={true}
                  onChange={(val, isValid) => {
                    this.setState({
                      registered: {
                        value: val,
                        isValid: isValid,
                      },
                    });
                  }}
                />
              )}
              {this.props.jobcenterDropdown &&
                this.props.jobcenterRequired &&
                this.state.registered.value &&
                this.state.registered.isValid &&
                this.props.jobcenterInvalidOptionErrorMessage &&
                (this.state.registered.value === "No" ||
                  this.state.registered.value === "Nein") && (
                  <div
                    className="header-reskill__form__error"
                    dangerouslySetInnerHTML={{
                      __html: utils.cleanText(
                        this.props.jobcenterInvalidOptionErrorMessage,
                        true
                      ),
                    }}
                  />
                )}
              <div className="compass-tool-results__form__button">
                <Button
                  label={this.props.formButtonLabel}
                  busy={this.state.formIsSubmitting}
                  onClick={() => {
                    this.submitForm();
                  }}
                  disabled={!this.formIsValid()}
                  variant="small transparent-blue-alt"
                />
              </div>
              <div className="compass-tool-results__form__info">
                {this.props.formDisclaimer && this.props.partnerName
                  ? this.props.formDisclaimer.replace(
                      "[BOOTCAMP]",
                      this.props.partnerName
                    )
                  : ""}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default withCookies(ApplyForm);
