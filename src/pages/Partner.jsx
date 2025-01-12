import React from 'react';

// Page
import Page from './Page';



// Components
import PartnerHero from 'components/PartnerHero';
import CourseDetailCard from 'components/CourseDetailCard';
import Button from 'components/Button';
import Input from 'components/Input';
import Dropdown from 'components/Dropdown';

import utils from 'utils';
import api from 'api';
import { withCookies } from 'react-cookie';
import { CompassWidget } from 'components/CompassWidget';

class Partner extends Page {
  i18n = {
    formText: {
      en: "Complete this application form and we will contact you regarding the next steps.",
      de: "Fülle dieses Anmeldeformular aus und wir werden dich bezüglich nächster Schritte kontaktieren."
    },
    formFirstNameLabel: {
      en: "First name",
      de: "Vorname"
    },
    formLastNameLabel: {
      en: "Last name",
      de: "Nachname"
    },
    formEmailLabel: {
      en: "Email",
      de: "Email"
    },
    formPhoneLabel: {
      en: "Phone",
      de: "Telefonnummer"
    },
    formButtonLabel: {
      en: "Request more info",
      de: "Weitere Infos anfordern"
    },
    formRegisteredLabel: {
      en: "Are you registered at the JobCenter/Agentur für Arbeit?",
      de: "Bist du beim Jobcenter/der Agentur für Arbeit registriert?"
    },
    formDisclaimer: {
      en: "Your contact information will be shared with [BOOTCAMP] so they can reach out to you with the next steps. You may get an email, a text message or a phone call so they can provide more course information.",
      de: "Deine Kontaktinformationen werden mit [BOOTCAMP] geteilt, damit sie sich mit den nächsten Schritten an dich wenden können. Du kannst eine E-Mail, eine Textnachricht oder einen Anruf bekommen, um weitere Kursinformationen zu erhalten."
    },
    formSuccessMessage: {
      en: `💎 Your request has been successfully received.👍\n
📞We'll get back to you ASAP!`,
      de: `💎 Deine Anfrage ist erfolgreich bei uns eingegangen.👍\n
📞Wir melden uns so schnell wie möglich bei dir zurück!`
    },
    previousPageButton: {
      en: `Back to previous page`,
      de: "Zurück zur vorherigen Seite"
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedCourse: {
        name: undefined,
        voucher: false
      },
      formIsOpen: false,
      formIsSubmitting: false,
      formIsSent: false,
      firstName: {
        value: "",
        isValid: false
      },
      lastName: {
        value: "",
        isValid: false
      },
      email: {
        value: "",
        isValid: false
      },
      phone: {
        value: "",
        isValid: false
      },
      registered: {
        value: "",
        isValid: false
      },
    };
    this.selectCourse = this.selectCourse.bind(this);

  }

  formIsValid() {
    return this.state.firstName.isValid && this.state.lastName.isValid && this.state.email.isValid && this.state.phone.isValid
  }

  selectCourse(course) {
    this.setState({
      formIsOpen: true,
      selectedCourse:
      {
        name: course.name,
        voucher: course.voucher,
        professionalCertificate: this.state.content.career.includes("PROFESSIONAL_CERTIFICATE")
      }
    })
  }

  async submitForm() {
    if (!this.state.hasInvalidFields) {
      this.setState({ formIsSubmitting: true });
      const customFields = {
        '19ddc486147c0bed2f2d0ca5a540854ef33bdf69': 'Partner Page',
        'dc0a286b9fe00ab025597776b38364624d981bb9': this.props.language === 'de' ? 'Deutsch' : 'English',
        '52234b4b01246fcb183fcf6fdbb082f747774cda': this.state.selectedCourse.name,
        '8cbaebfb84deca2ab3f762c3544a6aa4647d36b7': this.state.content.partner_name,
        phone: this.state.phone.value,
        '8a2d9fc96a0b7d037839d71aa4b3acc774c9b9c8': this.state.registered.value,
        first_name: this.state.firstName.value,
        last_name: this.state.lastName.value,
      };
      const customData = {
        selectedCourse: this.state.selectedCourse.name,
        registered: this.state.registered.value,
        language: this.props.language === "de" ? 'Deutsch' : 'English',
      };
      api.trackFbEvent({
        eventName: "SubmitApplication",
        externalId: this.props.cookies.get("session"),
        firstName: this.state.firstName.value,
        lastName: this.state.lastName.value,
        email: this.state.email.value,
        phone: this.state.phone.value,
        customDataObj: customData
      })
      api.addPerson(
        this.state.firstName.value,
        this.state.lastName.value,
        this.state.email.value,
        customFields,
        'PartnerPage',
        this.state.selectedCourse.professionalCertificate ? 38 : 15
      );
      this.setState({
        formIsSubmitting: false,
        formIsSent: true,
      });
    }
  };

  async componentDidMount() {
    super.componentDidMount('partner');
  }

  render() {
    const { content } = this.state;

    if (!content) {
      return super.render();
    }

    return (
      <div className="partner">
        <CompassWidget language={this.props.language} />
        <div className={`compass-tool-results__form__blocker${this.state.formIsOpen ? ' compass-tool-results__form__blocker--show' : ''}`}>
          <div className="compass-tool-results__form">
            <img
              className="compass-tool-results__form__close"
              src={'/assets/icons/close.svg'}
              alt=""
              onClick={() => this.setState({
                formIsOpen: false,
              })}
            />
            {this.state.formIsSent ? (
              <div
                className="compass-tool-results__form__text"
                dangerouslySetInnerHTML={
                  { __html: utils.cleanText(this.i18n.formSuccessMessage[this.props.language]) }
                }
              />
            ) : (
                <>
                  <div className="compass-tool-results__form__text">{this.i18n.formText[this.props.language]}</div>
                  <div className="row">
                    <div className="col-6 col-12-sm">
                      <Input
                        label={this.i18n.formFirstNameLabel[this.props.language]}
                        required
                        disabled={this.state.formIsSubmitting}
                        id="compass-tool-results-form-input"
                        onChange={(val, isValid) => {
                          this.setState({
                            firstName: {
                              value: val,
                              isValid: isValid,
                            }
                          });
                        }}
                      />
                    </div>
                    <div className="col-6 col-12-sm">
                      <Input
                        label={this.i18n.formLastNameLabel[this.props.language]}
                        required
                        disabled={this.state.formIsSubmitting}
                        onChange={(val, isValid) => {
                          this.setState({
                            lastName: {
                              value: val,
                              isValid: isValid,
                            }
                          });
                        }}
                      />
                    </div>
                  </div>
                  <Input
                    label={this.i18n.formEmailLabel[this.props.language]}
                    type="email"
                    required
                    disabled={this.state.formIsSubmitting}
                    onChange={(val, isValid) => {
                      this.setState({
                        email: {
                          value: val,
                          isValid: isValid,
                        }
                      });
                    }}
                  />
                  <Input
                    label={this.i18n.formPhoneLabel[this.props.language]}
                    required
                    disabled={this.state.formIsSubmitting}
                    onChange={(val, isValid) => {
                      this.setState({
                        phone: {
                          value: val,
                          isValid: isValid,
                        }
                      });
                    }}
                  />
                  {this.state.selectedCourse.voucher && (
                    <Dropdown
                      language={this.props.language}
                      label={this.i18n.formRegisteredLabel[this.props.language]}
                      items={["Yes", "No"]}
                      required={true}
                      onChange={(val, isValid) => {
                        this.setState({
                          registered: {
                            value: val,
                            isValid: isValid,
                          }
                        });
                      }}
                    />
                  )}
                  <div className="compass-tool-results__form__button">
                    <Button
                      label={this.i18n.formButtonLabel[this.props.language]}
                      isBusy={this.state.formIsSubmitting}
                      onClick={() => {
                        this.submitForm();
                      }}
                      disabled={!this.formIsValid()}
                      variant="small transparent-blue-alt"
                    />
                  </div>
                  <div className="compass-tool-results__form__info">
                    {content.partner_name ? this.i18n.formDisclaimer[this.props.language].replace('[BOOTCAMP]', content.partner_name) : ''}
                  </div>
                </>
              )}
          </div>
        </div>

        <PartnerHero
          name={content.partner_name}
          text={content.partner_text}
          logo={content.partner_logo}
          link={content.partner_link}
          linkLabel={content.partner_link_label}
          image={content.partner_image}
        />

        <ul className="course-list full-width-outer">
          <div className="gray-box"></div>
          {content.courses_detail.map?.(course_detail => (<CourseDetailCard key={course_detail.course.title} selectCourse={this.selectCourse} course={course_detail.course} logo={content.partner_logo} bootcamp_name={content.partner_name} language={this.props.language} />))}
        </ul>

        <div className="gray-container full-width-outer">
          <div className="button-container">
            <Button onClick={() => this.props.history.goBack()} variant="transparent-blue" label={this.i18n.previousPageButton[this.props.language]} />
          </div>
        </div>

      </div >
    );
  }
}

export default withCookies(Partner)