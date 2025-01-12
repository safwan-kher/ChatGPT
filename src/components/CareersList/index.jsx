import React from 'react';

// Styles


export default function CareersList(props) {
  const {
    items,
  } = props;

  const categories = [];
  if (items) {
    items.forEach((item, index) => {
      const jobs = [];
      item.jobs.forEach((job, index) => {
        jobs.push(
          <a
            key={index}
            className="careers-list__item__job"
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="careers-list__item__job__title">
              {job.title}
            </div>
            <div className="careers-list__item__job__location">
              {job.location}
            </div>
          </a>
        );
      });
      categories.push(
        <div
          className={`careers-list__item slider slider-delay-${index + 1}`}
          key={index}
        >
          <div className="careers-list__item__heading">
            {item.heading}
          </div>
          <div className="careers-list__item__jobs">
            {jobs}
          </div>
        </div>
      );
    });
  }

  return (
    <div className="careers-list slider-block">
      <div className="row">
        <div className="col-2 col-0-sm" />
        <div className="col-8 col-12-sm">
          {categories}
        </div>
        <div className="col-2 col-0-sm" />
      </div>
    </div>
  );
}
