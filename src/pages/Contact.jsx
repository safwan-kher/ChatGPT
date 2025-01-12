import React from "react";
import Head from "next/head";
import Script from "next/script";

// Helper
import api from "api";
import utils from "utils";

// Page
import Page from "./Page";

// Components
import Input from "components/Input";
import Checkbox from "components/Checkbox";
import Button from "components/Button";

// Styles

export default class Contact extends Page {
  constructor(props) {
    super(props);
    this.state = {
      wasFormSent: false,
      isBusy: false,
      hasInvalidFields: true,
      first_name: false,
      last_name: false,
      email: false,
      subject: false,
      message: false,
      terms: false,
      consent: false,
    };
  }
  componentDidMount() {
    super.componentDidMount();
  }
  checkFormValidity() {
    const hasInvalidFields = [
      "first_name",
      "last_name",
      "email",
      "subject",
      "message",
      "terms",
    ].some((key) => this.state[key] === false);
    this.setState({
      hasInvalidFields,
    });
  }

  // Submit form to Pipedrive
  submitForm() {
    if (!this.state.hasInvalidFields) {
      this.setState({ isBusy: true });
      const customFields = {
        "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": "Contact",
        dc0a286b9fe00ab025597776b38364624d981bb9:
          this.props.language === "de" ? "Deutsch" : "English",
        "71ca4b983574f88b475c4ec915836606676ddd5e": this.state.subject,
        "4c7f032479a698cac32406114330602b5802567f": this.state.message,
        ff8fcfd408c0714269993b513855617459da45d6: this.state.consent
          ? "Yes"
          : "No",
      };
      api
        .addPerson(
          this.state.first_name,
          this.state.last_name,
          this.state.email,
          customFields,
          "Contact"
        )
        .then(() => {
          this.setState({
            isBusy: false,
            wasFormSent: true,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    if (!this.state.content) {
      return super.render();
    }
    const {
      contact_title,
      contact_text,
      contact_first_name_input_label,
      contact_last_name_input_label,
      contact_email_input_label,
      contact_subject_input_label,
      contact_message_input_label,
      contact_checkbox_label_terms_pre,
      contact_checkbox_label_terms_link,
      contact_checkbox_label_terms_link_label,
      contact_checkbox_label_terms_post,
      contact_checkbox_label_consent,
      contact_button_label,
      contact_block_title,
      contact_block_button_label,
      contact_message,
    } = this.state.content;
    const { wasFormSent, isBusy, hasInvalidFields } = this.state;

    const checkboxLabelTerms = `${contact_checkbox_label_terms_pre} <a href="${contact_checkbox_label_terms_link}" target="_blank">${contact_checkbox_label_terms_link_label}</a> ${contact_checkbox_label_terms_post}`;
    return (
      <div className="contact slider-block slider-block-first-load">
        <Head>
          <link
            href="https://assets.calendly.com/assets/external/widget.css"
            rel="stylesheet"
          />
        </Head>
        <Script src="https://assets.calendly.com/assets/external/widget.js" />
        <div className="full-width-outer">
          <div className="full-width-inner">
            <div className="row">
              <div className="col-1 col-0-sm" />
              <div className="col-5 col-12-sm slider">
                <div className="contact__left">
                  <h2 className="contact__title">{contact_title}</h2>
                </div>
              </div>
              <div className="col-6 col-0-sm" />
            </div>
            <div className="row">
              <div className="col-1 col-0-sm" />
              <div className="col-5 col-12-sm slider">
                <div className="contact__left" role="form">
                  <div
                    className="contact__text"
                    dangerouslySetInnerHTML={{
                      __html: utils.cleanText(contact_text, true),
                    }}
                  />
                  <div className="row">
                    <div className="col-6 col-12-sm">
                      <Input
                        label={contact_first_name_input_label}
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
                        label={contact_last_name_input_label}
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
                  <Input
                    label={contact_email_input_label}
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
                  <Input
                    label={contact_subject_input_label}
                    required={true}
                    disabled={wasFormSent}
                    onChange={(val, isValid) => {
                      this.setState(
                        {
                          subject: isValid ? val : false,
                        },
                        this.checkFormValidity
                      );
                    }}
                  />
                  <Input
                    label={contact_message_input_label}
                    required={true}
                    multiline={true}
                    disabled={wasFormSent}
                    onChange={(val, isValid) => {
                      this.setState(
                        {
                          message: isValid ? val : false,
                        },
                        this.checkFormValidity
                      );
                    }}
                  />
                  <div className="contact__checkboxes">
                    <Checkbox
                      label={checkboxLabelTerms}
                      disabled={wasFormSent}
                      onChange={(val) => {
                        this.setState(
                          {
                            terms: val,
                          },
                          this.checkFormValidity
                        );
                      }}
                    />
                    <Checkbox
                      label={contact_checkbox_label_consent}
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
                  <div className="contact__button">
                    {wasFormSent ? (
                      <div className="contact__message">{contact_message}</div>
                    ) : (
                      <Button
                        busy={isBusy}
                        disabled={hasInvalidFields}
                        onClick={() => {
                          this.submitForm();
                        }}
                        label={contact_button_label}
                        variant="transparent-blue-alt"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-5 col-12-sm">
                <div className="contact__button-block slider slider-delay-1">
                  <img
                    className="contact__button-block__image"
                    src={"/assets/chat.png"}
                    alt=""
                  />
                  <div className="contact__button-block__inner">
                    <div className="contact__button-block__title">
                      {contact_block_title}
                    </div>
                    <div className="contact__button-block__button">
                      <Button
                        label={contact_block_button_label}
                        onClick={() => {
                          window.Calendly.initPopupWidget({
                            url: "https://calendly.com/d/crr-xxj-qhs/let-s-chat-startsteps",
                          });
                        }}
                        variant="transparent-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 col-0-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
