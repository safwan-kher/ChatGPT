import React from 'react';

// Helper
import utils from 'utils';

// Components
import Button from 'components/Button';

// Styles


export default function PartnerDetails(props) {
  const history = {}
  // const history = useHistory();
  const {
    coursesHeading,
    courses,
    availabilityHeading,
    availability,
    buttonLabel,
  } = props;

  const courseBlocks = [];
  if (courses) {
    [1, 2, 3, 4].forEach((index) => {
      courseBlocks.push(
        <div
          className="partner-details__course"
          key={index}
        >
          <h3 className="partner-details__course__title">
            {courses[`title${index}`]}
          </h3>
          <p
            className="partner-details__course__text"
            dangerouslySetInnerHTML={
              { __html: utils.cleanText(courses[`text${index}`]) }
            }
          />
        </div>
      );
    });
  }

  return (
    <div className="partner-details slider-block">
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row">
            <div className="col-1 col-0-sm" />
            <div className="col-5 col-12-sm slider">
              <h2 className="partner-details__heading">
                {coursesHeading}
              </h2>
              {courseBlocks}
            </div>
            <div className="col-5 col-12-sm slider slider-delay-1">
              <div className="partner-details__heading">
                {availabilityHeading}
              </div>
              <div
                className="partner-details__availability"
                dangerouslySetInnerHTML={
                  { __html: utils.cleanText(availability) }
                }
              />
              <img
                className="partner-details__floater"
                src={'/assets/floaters/stairs-white2.png'}
                alt=""
              />
            </div>
            <div className="col-1 col-0-sm" />
          </div>
          <div className="row">
            <div className="col-1 col-0-sm" />
            <div className="col-10 col-12-sm">
              <div className="partner-details__button slider slider-delay-2">
                <Button
                  label={buttonLabel}
                  onClick={() => {
                    history.goBack();
                    setTimeout(() => {
                      window.scrollTo(0, 0);
                    }, 500);
                  }}
                  variant="transparent-blue"
                />
              </div>
            </div>
            <div className="col-1 col-0-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
