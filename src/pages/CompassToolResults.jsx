import React from 'react';

// Helper
import api from 'api';
import utils from 'utils';

// Page
import Page from './Page';

// Components
import SimpleDropdown from '../components/SimpleDropdown';
import Button from '../components/Button';
import Dropdown from 'components/Dropdown';
import Input from 'components/Input';

// Styles

import { withCookies } from 'react-cookie';

class CompassToolResults extends Page {
  constructor(props) {
    super(props);
    const filterVoucherOptions = [
      {
        label: '100% Government Funded',
        value: 'yes',
      },
      {
        label: 'All Other Options',
        value: 'no',
      },
    ];
    const filterSkillsOptions = [
      {
        label: 'All Digital Skills',
        value: 'All-skills',
      },
      {
        label: 'Data',
        value: 'Data',
      },
      {
        label: 'Design',
        value: 'Design',
      },
      {
        label: 'Coding',
        value: 'Coding',
      },
      {
        label: 'Marketing',
        value: 'Marketing',
      },
    ];
    const filterLanguageOptions = [
      {
        label: 'English',
        value: 'english',
      },
      {
        label: 'German',
        value: 'german',
      },
      {
        label: 'Spanish',
        value: 'spanish',
      },
    ];
    const filterCourseLocationOptions = [
      {
        label: 'Online/Remote',
        value: 'Online',
      },
      {
        label: 'Berlin',
        value: 'Berlin',
      },
      {
        label: 'Cologne',
        value: 'Cologne',
      },
      {
        label: 'Hamburg',
        value: 'Hamburg',
      },
      {
        label: 'Frankfurt',
        value: 'Frankfurt',
      },
      {
        label: 'Munich',
        value: 'Munich',
      },
      {
        label: 'Ruhrgebiet',
        value: 'Ruhrgebiet',
      },
      {
        label: 'Stuttgart',
        value: 'Stuttgart',
      },
    ];
    const filterCourseTypeOptions = [
      {
        label: 'Part-Time',
        value: 'part-time',
      },
      {
        label: 'Full-Time',
        value: 'full-time',
      },
      {
        label: 'Self-Paced',
        value: 'self-paced',
      },
    ];
    this.state = {
      currentCourse: null,
      filterVoucherPlaceholder: 'Funding Options',
      filterVoucherOptions,
      filterVoucherValue: this.getFiltersFromUrlParams('voucher', filterVoucherOptions),
      filterSkillsPlaceholder: 'Career Path',
      filterSkillsOptions,
      filterSkillsValue: this.getFiltersFromUrlParams('skill', filterSkillsOptions),
      filterLanguagePlaceholder: 'Language',
      filterLanguageOptions,
      filterLanguageValue: this.getFiltersFromUrlParams('language', filterLanguageOptions),
      filterCourseLocationPlaceholder: 'Location',
      filterCourseLocationOptions,
      filterCourseLocationValue: this.getFiltersFromUrlParams('courseLocation', filterCourseLocationOptions),
      filterCourseTypePlaceholder: 'Program',
      filterCourseTypeOptions,
      filterCourseTypeValue: this.getFiltersFromUrlParams('courseType', filterCourseTypeOptions),
      first_name: false,
      last_name: false,
      email: false,
      phone: false,
      registered: false,
      isIntroVisible: true,
      isFormVisible: false,
      hasInvalidFields: true,
      isBusy: false,
      wasFormSent: false,
    };
  }
  componentDidMount() {
    super.componentDidMount(null, (content) => {
      const firstCourse = content.courses.shift();
      utils.shuffle(content.courses);
      content.courses = [firstCourse, ...content.courses];
    });
  }
  getFiltersFromUrlParams(which, options) {
    const params = new URLSearchParams(window.location.search);
    const optionValue = params.get(which);
    if (optionValue) {
      const foundOption = options.find((option) => option.value.toLowerCase() === optionValue.toLowerCase());
      return foundOption || { value: '' };
    }
    return { value: '' };
  }
  showForm() {
    this.setState({
      isFormVisible: true,
    }, () => {
      const input = document.getElementById('compass-tool-results-form-input');
      if (input) {
        input.focus();
      }
    });
  }
  checkFormValidity() {
    const fields = [
      'first_name',
      'last_name',
      'email',
    ];
    if (this.state.currentCourse.voucher === 'yes') {
      fields.push('registered');
    }
    const hasInvalidFields = fields.some((key) => this.state[key] === false);
    this.setState({
      hasInvalidFields,
    });
  }

  // Submit form to Pipedrive
  submitForm() {
    if (!this.state.hasInvalidFields) {
      this.setState({ isBusy: true });
      const {
        first_name,
        last_name,
        email,
        phone,
        registered,
        currentCourse,
      } = this.state;
      const customFields = {
        '19ddc486147c0bed2f2d0ca5a540854ef33bdf69': 'Compass Tool Results',
        '52234b4b01246fcb183fcf6fdbb082f747774cda': currentCourse.course_name,
        '8cbaebfb84deca2ab3f762c3544a6aa4647d36b7': currentCourse.bootcamp,
        phone,
        '8a2d9fc96a0b7d037839d71aa4b3acc774c9b9c8': registered,
      };
      api.addPerson(first_name, last_name, email, customFields, 'CompassToolResults', 15)
        .then(() => {
          const customData = {
            selectedCourse: currentCourse.course_name,
            registered,
          };

          api.trackFbEvent({
            eventName: "Decision Results",
            externalId: this.props.cookies.get("session"),
            firstName: first_name,
            lastName: last_name,
            email: email,
            phone: phone,
            customDataObj: customData
          })

          this.setState({
            isBusy: false,
            wasFormSent: true,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  render() {
    if (!this.state.content) {
      return super.render();
    }
    const {
      content,
      filterVoucherPlaceholder,
      filterVoucherOptions,
      filterVoucherValue,
      filterSkillsPlaceholder,
      filterSkillsOptions,
      filterSkillsValue,
      filterLanguagePlaceholder,
      filterLanguageOptions,
      filterLanguageValue,
      filterCourseLocationPlaceholder,
      filterCourseLocationOptions,
      filterCourseLocationValue,
      filterCourseTypePlaceholder,
      filterCourseTypeOptions,
      filterCourseTypeValue,
      currentCourse,
      isIntroVisible,
      isFormVisible,
      isBusy,
      wasFormSent,
      hasInvalidFields,
    } = this.state;
    const {
      title,
      course_button_label,
      highlight_course_button_label,
      form_text,
      form_first_name_label,
      form_last_name_label,
      form_email_label,
      form_phone_label,
      form_registered_input_label,
      form_registered_items,
      form_button_label,
      form_disclaimer,
      form_success_message,
      courses,
      intro_heading_with_skill,
      intro_columns_with_skills,
      intro_heading_without_skill,
      intro_columns_without_skills,
      intro_voucher_text_with_support,
      intro_voucher_text_no_support,
      intro_button_label,
    } = content;

    // Filter
    let filteredCourses = courses.filter((course) => {
      const withVoucher = filterVoucherValue.value === 'yes';
      if (course.always_show) {
        return withVoucher || !filterVoucherValue.value;
      } else {
        return (!filterVoucherValue.value || (withVoucher && filterVoucherValue.value === course.voucher) || !withVoucher) &&
          (!filterSkillsValue.value || filterSkillsValue.value === 'All-skills' || course.skill.includes(filterSkillsValue.value) || course.skill.includes('All-skills')) &&
          (!filterLanguageValue.value || course.language.includes(filterLanguageValue.value)) &&
          (!filterCourseLocationValue.value || course.course_location.includes(filterCourseLocationValue.value)) &&
          (!filterCourseTypeValue.value || course.course_type.includes(filterCourseTypeValue.value))
      }
    });

    const hasIntroSkillSet = filterSkillsValue.value;
    let introColumns = [];
    let introHeading = intro_heading_without_skill;
    if (hasIntroSkillSet) {
      introHeading = intro_heading_with_skill.replace('[placeholder]', filterSkillsValue.label);
      introColumns = intro_columns_with_skills;
    } else {
      introColumns = intro_columns_without_skills;
    }
    let voucherText = hasIntroSkillSet ? intro_voucher_text_no_support : '';
    if (filterVoucherValue.value) {
      if (filterVoucherValue.value === 'yes') {
        voucherText = intro_voucher_text_with_support;
      }
    }

    return (
      <div className={`compass-tool-results ${(isIntroVisible || isFormVisible) ? ' compass-tool-results--overlay-open' : ''}`}>

        <div className={`compass-tool-results__intro__blocker${isIntroVisible ? ' compass-tool-results__intro__blocker--show' : ''}`}>
          <div className="compass-tool-results__intro">
            <div className="compass-tool-results__intro__heading">{introHeading}</div>
            {voucherText && (
              <div
                className="compass-tool-results__intro__text"
                dangerouslySetInnerHTML={
                  { __html: utils.cleanText(voucherText, true, false, ['span']) }
                }
              />
            )}
            <div className="row">
              {introColumns.map((col, index) =>
                <div
                  className="col-4 col-12-sm"
                  key={index}
                >
                  <div className="compass-tool-results__intro__col-heading">{col.heading}</div>
                  <div className="compass-tool-results__intro__col-text">{col.text}</div>
                </div>
              )}
            </div>
            <Button
              label={intro_button_label}
              onClick={() => {
                this.setState({
                  isIntroVisible: false,
                });
              }}
              variant="small transparent-blue"
            />
          </div>
        </div>

        <div className={`compass-tool-results__form__blocker${isFormVisible ? ' compass-tool-results__form__blocker--show' : ''}`}>
          <div className="compass-tool-results__form">
            <img
              className="compass-tool-results__form__close"
              src={'/assets/icons/close.svg'}
              alt=""
              onClick={() => this.setState({
                isFormVisible: false,
              })}
            />
            {wasFormSent ? (
              <div
                className="compass-tool-results__form__text"
                dangerouslySetInnerHTML={
                  { __html: utils.cleanText(form_success_message, true) }
                }
              />
            ) : (
                <>
                  <div className="compass-tool-results__form__text">{form_text}</div>
                  <div className="row">
                    <div className="col-6 col-12-sm">
                      <Input
                        label={form_first_name_label}
                        required
                        disabled={isBusy}
                        id="compass-tool-results-form-input"
                        onChange={(val, isValid) => {
                          this.setState({
                            first_name: isValid ? val : false,
                          }, this.checkFormValidity);
                        }}
                      />
                    </div>
                    <div className="col-6 col-12-sm">
                      <Input
                        label={form_last_name_label}
                        required
                        disabled={isBusy}
                        onChange={(val, isValid) => {
                          this.setState({
                            last_name: isValid ? val : false,
                          }, this.checkFormValidity);
                        }}
                      />
                    </div>
                  </div>
                  <Input
                    label={form_email_label}
                    type="email"
                    required
                    disabled={isBusy}
                    onChange={(val, isValid) => {
                      this.setState({
                        email: isValid ? val : false,
                      }, this.checkFormValidity);
                    }}
                  />
                  <Input
                    label={form_phone_label}
                    disabled={isBusy}
                    onChange={(val, isValid) => {
                      this.setState({
                        phone: isValid ? val : false,
                      }, this.checkFormValidity);
                    }}
                  />
                  {(currentCourse && currentCourse.voucher === 'yes') && (
                    <Dropdown
                      language={this.props.language}
                      label={form_registered_input_label}
                      items={form_registered_items.map((item) => item.item)}
                      required={true}
                      disabled={isBusy}
                      onChange={(val, isValid) => {
                        this.setState({
                          registered: isValid ? val : false,
                        }, this.checkFormValidity);
                      }}
                    />
                  )}
                  <div className="compass-tool-results__form__button">
                    <Button
                      label={form_button_label}
                      onClick={() => {
                        this.submitForm();
                      }}
                      busy={isBusy}
                      disabled={hasInvalidFields}
                      variant="small transparent-blue-alt"
                    />
                  </div>
                  <div className="compass-tool-results__form__info">
                    {currentCourse ? form_disclaimer.replace('[BOOTCAMP]', currentCourse.bootcamp) : ''}
                  </div>
                </>
              )}
          </div>
        </div>

        <div className="compass-tool-results__header">
          <div className="full-width-outer">
            <div className="full-width-inner">
              <div className="row">
                <div className="col-1 col-0-sm" />
                <div className="col-10 col-12-sm">
                  <div className="compass-tool-results__title">{title}</div>
                  <div className="compass-tool-results__filters">
                    <div className="compass-tool-results__filter-group">
                      <div className={filterVoucherValue.value === 'yes' ? 'compass-tool-results__afa-voucher-filter' : ''}>
                        <SimpleDropdown
                          placeholder={filterVoucherPlaceholder}
                          items={filterVoucherOptions}
                          current={filterVoucherValue}
                          onChange={(item) => {
                            this.setState({
                              filterVoucherValue: item,
                            });
                          }}
                        />
                      </div>
                      <SimpleDropdown
                        placeholder={filterSkillsPlaceholder}
                        items={filterSkillsOptions}
                        current={filterSkillsValue}
                        onChange={(item) => {
                          this.setState({
                            filterSkillsValue: item,
                          });
                        }}
                      />
                    </div>
                    <div className="compass-tool-results__filter-group">
                      <SimpleDropdown
                        placeholder={filterLanguagePlaceholder}
                        items={filterLanguageOptions}
                        current={filterLanguageValue}
                        onChange={(item) => {
                          this.setState({
                            filterLanguageValue: item,
                          });
                        }}
                      />
                      <SimpleDropdown
                        placeholder={filterCourseLocationPlaceholder}
                        items={filterCourseLocationOptions}
                        current={filterCourseLocationValue}
                        onChange={(item) => {
                          this.setState({
                            filterCourseLocationValue: item,
                          });
                        }}
                      />
                      <SimpleDropdown
                        placeholder={filterCourseTypePlaceholder}
                        items={filterCourseTypeOptions}
                        current={filterCourseTypeValue}
                        onChange={(item) => {
                          this.setState({
                            filterCourseTypeValue: item,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-1 col-0-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="compass-tool-results__courses">
          <div className="full-width-outer">
            <div className="full-width-inner">
              <div className="row">
                <div className="col-2 col-0-sm" />
                <div className="col-8 col-12-sm">
                  <div className="compass-tool-results__floater-wrapper">
                    <img
                      className="compass-tool-results__floater"
                      src={'/assets/floaters/cube.png'}
                      alt=""
                    />
                    <img
                      className="compass-tool-results__floater"
                      src={'/assets/floaters/stairs4.png'}
                      alt=""
                    />
                    {filteredCourses.map((course, index) => (
                      <div
                        key={index}
                        className={`compass-tool-results__course${(currentCourse ? currentCourse === course : index === 0) ? ' compass-tool-results__course--active' : ''}${course.always_show ? ' compass-tool-results__course--always' : ''}`}
                        onClick={() => {
                          this.setState({
                            currentCourse: course,
                          });
                        }}
                      >
                        <div className="compass-tool-results__course__title">{course.course_name}</div>
                        <div className="compass-tool-results__course__bootcamp">{course.bootcamp}</div>
                        <div className="compass-tool-results__course__short-description">{course.short_description}</div>
                        <div
                          className="compass-tool-results__course__description"
                          dangerouslySetInnerHTML={
                            { __html: utils.cleanText(course.description, true) }
                          }
                        />
                        {course.extra ? (
                          <div className="compass-tool-results__course__extra">{course.extra}</div>
                        ) : (
                            <div className="compass-tool-results__course__extra-spacer hide-on-desktop" />
                          )}
                        <div className="compass-tool-results__course__logo">
                          <img
                            src={course.logo}
                            alt={course.bootcamp}
                          />
                        </div>
                        <div className="compass-tool-results__course__button">
                          <Button
                            label={course.always_show ? highlight_course_button_label : course_button_label}
                            onClick={() => {
                              this.showForm();
                            }}
                            variant={`small ${course.always_show ? 'transparent-blue-alt' : ''}`}
                          />
                        </div>
                        {course.voucher === 'yes' && (<div className="compass-tool-results__course__afa-logo" />)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-2 col-0-sm" />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default withCookies(CompassToolResults)