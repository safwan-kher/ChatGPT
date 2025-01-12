import React from 'react';

// Helper
import utils from 'utils';

// Page
import Page from './Page';

// Styles


export default class JobCenter extends Page {
  componentDidMount() {
    super.componentDidMount();
  }
  render() {
    const { content } = this.state;

    if (!content) {
      return super.render();
    }
    const {
      jobcenter_title,
      jobcenter_text,
      jobcenter_bottom1_title,
      jobcenter_bottom1_label1,
      jobcenter_bottom1_value1,
      jobcenter_bottom1_label2,
      jobcenter_bottom1_value2,
      jobcenter_bottom2_title,
      jobcenter_bottom2_label1,
      jobcenter_bottom2_value1,
      jobcenter_bottom2_label2,
      jobcenter_bottom2_value2,
      jobcenter_contact_info,
      jobcenter_company_name,
      jobcenter_company_info,
    } = this.state.content;
    return (
      <div className="jobcenter">
        <div className="full-width-outer slider-block slider-block-first-load">
          <div className="full-width-inner">
            <div className="row">
              <div className="col-2 col-0-sm" />
              <div className="col-8 col-12-sm">
                <h2 className="jobcenter__title slider">
                  {jobcenter_title}
                </h2>
                <p
                  className="jobcenter__text slider slider-delay-1"
                  dangerouslySetInnerHTML={
                    { __html: utils.cleanText(jobcenter_text) }
                  }
                />
              </div>
              <div className="col-2 col-0-sm" />
            </div>
            <div className="row">
              <div className="col-1 col-0-sm" />
              <div className="col-10 col-12-sm">
                <div className="jobcenter__bottom-wrapper">
                  <div className="jobcenter__bottom-group">
                    <div className="jobcenter__bottom slider slider-delay-2">
                      <div className="row">
                        <div className="col-4 col-12-sm">
                          <img
                            className="jobcenter__bottom__floater"
                            src={'/assets/floaters/book.png'}
                            alt=""
                          />
                        </div>
                        <div className="col-5 col-12-sm">
                          <div className="jobcenter__bottom__title">{jobcenter_bottom1_title}</div>
                          <div className="jobcenter__bottom__item">
                            <strong>{jobcenter_bottom1_label1}:</strong> {jobcenter_bottom1_value1}
                          </div>
                          <div className="jobcenter__bottom__item">
                            <strong>{jobcenter_bottom1_label2}:</strong> {jobcenter_bottom1_value2}
                          </div>
                        </div>
                        <div className="col-3 col-12-sm">
                          <img
                            className="jobcenter__bottom__logo"
                            src={'/assets/certificate.png'}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="jobcenter__bottom slider slider-delay-3">
                      <div className="row">
                        <div className="col-4 col-12-sm">
                          <img
                            className="jobcenter__bottom__floater jobcenter__bottom__floater-alt"
                            src={'/assets/floaters/book.png'}
                            alt=""
                          />
                        </div>
                        <div className="col-5 col-12-sm">
                          <div className="jobcenter__bottom__title">{jobcenter_bottom2_title}</div>
                          <div className="jobcenter__bottom__item">
                            <strong>{jobcenter_bottom2_label1}:</strong> {jobcenter_bottom2_value1}
                          </div>
                          <div className="jobcenter__bottom__item">
                            <strong>{jobcenter_bottom2_label2}:</strong> {jobcenter_bottom2_value2}
                          </div>
                        </div>
                        <div className="col-3 col-12-sm">
                          <img
                            className="jobcenter__bottom__logo"
                            src={'/assets/certificate.png'}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 col-0-sm" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-1 col-0-sm" />
          <div className="col-10 col-12-sm slider-block">
            <div
              className="jobcenter__contact-info slider"
              dangerouslySetInnerHTML={
                { __html: utils.cleanText(jobcenter_contact_info, true) }
              }
            />
          </div>
          <div className="col-1 col-0-sm" />
        </div>
        <div className="full-width-outer slider-block">
          <div className="full-width-inner">
            <div className="row">
              <div className="col-1 col-0-sm" />
              <div className="col-10 col-12-sm">
                <h2 className="jobcenter__company-name slider">
                  {jobcenter_company_name}
                </h2>
                <div
                  className="jobcenter__company-info slider slider-delay-1"
                  dangerouslySetInnerHTML={
                    { __html: utils.cleanText(jobcenter_company_info, true) }
                  }
                />
              </div>
              <div className="col-1 col-0-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
