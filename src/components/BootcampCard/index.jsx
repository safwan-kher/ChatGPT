import React from "react";

import Button from "components/Button";

const BootcampCard = ({ bootcamp, careers, language, slug, location }) => {
  const i18n = {
    description: {
      en: "Description",
      de: "Beschreibung",
    },
    courses: {
      en: "Course(s):",
      de: "Kurs(e):",
    },
    learnMore: {
      en: "Learn more",
      de: "MEHR ERFAHREN",
    },
    career: {
      en: "Career",
      de: "Karriere",
    },
    location: {
      en: "Location",
      de: "Ort",
    },
    fundingOptions: {
      en: "Funding Options",
      de: "Finanzierung",
    },

    defaultFundingOption: {
      en: "All funding options",
      de: "Alle Finanzierungsmöglichkeiten",
    },
  };

  const renderDescription = (description) => {
    if (description.length > 190) {
      const cutDescription = description.substring(0, 190);
      return cutDescription.concat("...");
    } else {
      return description;
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div>
          <div className="bootcamp__header flex flex-wrap gap-x-4 gap-y-4">
            <p className="bootcamp__big_header flex-1">
              {bootcamp.partner_name}
            </p>
            <img className="partner-logo" src={bootcamp.partner_logo} alt="" />
          </div>
        </div>
        <div className="pill-container">
          {careers.map((career) => (
            <p
              key={career.value}
              className={`pill font-semibold ${career.color}`}
            >
              {career.label[language]}
            </p>
          ))}
        </div>
        <p className="bootcamp__small_header">{i18n.description[language]}</p>
        <p className="base-text">{renderDescription(bootcamp.partner_text)}</p>
        <p className="bootcamp__small_header">{i18n.courses[language]}</p>
        <ul className="base-text space-y-1">
          {bootcamp.courses_detail.map?.(({ course }, index) => (
            <li className="list-disc list-inside" key={index}>
              {course.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-baseline flex-col gap-y-4 sm:gap-y-0 sm:flex-row mt-8">
        <div className="location-container">
          <p className="font-bold text-lg text-indigo-700">
            {location.label[language]}
          </p>
        </div>
        <Button
          link={`partner/${slug}`}
          variant="small"
          label={i18n.learnMore[language]}
        />
      </div>
    </div>
  );
};

export default BootcampCard;
