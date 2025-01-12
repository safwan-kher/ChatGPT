import React, { useState, useEffect } from "react";

import MultiSelectDropdown from "../components/MultiSelectDropdown"
import SingleSelectDropdown from "../components/SingleSelectDropdown"
import BootcampsHero from "../components/BootcampsHero"
import Loading from '../components/Loading';
import BootcampCard from "components/BootcampCard";



import api from "../api"
import utils from 'utils';
import { CompassWidget } from "components/CompassWidget";


const defaultCareerOptions = [
  {
    value: "ALL",
    label: { en: "All careers", de: "Alle Karriereoptionen" },
    checked: true,
    color: "bg-pink",
  },
  {
    value: "CODING",
    label: { en: "Coding", de: "Programmieren" },
    checked: false,
    color: "bg-orange",
  },
  {
    value: "DATA",
    label: { en: "Data", de: "Daten Analyse" },
    checked: false,
    color: "bg-blue",
  },
  {
    value: "DESIGN",
    label: { en: "Design", de: "Design" },
    checked: false,
    color: "bg-yellow",
  },
  {
    value: "MARKETING",
    label: { en: "Marketing", de: "Marketing" },
    checked: false,
    color: "bg-pink",
  },
  {
    value: "PROFESSIONAL_CERTIFICATE",
    label: { en: "Professional Certificates", de: "Professionelle Zertifikate" },
    checked: false,
    color: "bg-green",
  },
  {
    value: "OTHER",
    label: { en: "Other Tech Careers", de: "Andere Tech-Karrieren" },
    checked: false,
    color: "bg-gray",
  },
]

const defaultLocationOptions = [
  {
    value: "ALL",
    label: { en: "All locations", de: "Alle Orte" },
    checked: true,
  },
  { value: "ONLINE", label: { en: "Online", de: "Online" }, checked: false },
  { value: "BERLIN", label: { en: "Berlin", de: "Berlin" }, checked: false },
  { value: "COLOGNE", label: { en: "Cologne", de: "Köln" }, checked: false },
  { value: "DORTMUND", label: { en: "Dortmund", de: "Dortmund" }, checked: false },
  { value: "DRESDEN", label: { en: "Dresden", de: "Dresden" }, checked: false },
  { value: "DUSSELDORF", label: { en: "Dusseldorf", de: "Düsseldorf" }, checked: false },
  { value: "FRANKFURT", label: { en: "Frankfurt", de: "Frankfurt" }, checked: false },
  { value: "HAMBURG", label: { en: "Hamburg", de: "Hamburg" }, checked: false },
  { value: "LEIPZIG", label: { en: "Leipzig", de: "Leipzig" }, checked: false },
  { value: "MUNICH", label: { en: "Munich", de: "München" }, checked: false },
  { value: "RUHRGEBIET", label: { en: "Ruhrgebiet", de: "Ruhrgebiet" }, checked: false },
  { value: "SUTTGART", label: { en: "Stuttgart", de: "Stuttgart" }, checked: false },
  { value: "WOLFSBURG", label: { en: "Wolfsburg", de: "Wolfsburg" }, checked: false },
]

const defaultLanguageOptions = [
  { value: "ENGLISH", label: { en: "English Courses", de: "Englischkurse" }, checked: false },
  { value: "GERMAN", label: { en: "German Courses", de: "Deutschkurse" }, checked: false },
]

const defaultFundingOptions = [
  {
    value: "JOBCENTER",
    label: { en: "Funded by Agentur fur Arbeit or Jobcenter", de: "Finanziert von der Agentur für Arbeit/Jobcenter" },
    checked: false
  },
  {
    value: "UPFRONT_PAYMENT",
    label: { en: "Upfront Payment", de: "Vorauszahlung" },
    checked: false
  },
  {
    value: "MONTHLY_PAYMENT",
    label: { en: "Monthly Payment", de: "Monatliche Zahlung" },
    checked: false
  },
  {
    value: "STUDENT_LOAN",
    label: { en: "Student Loan", de: "Studiendarlehen" },
    checked: false
  },
  {
    value: "INCOME_SHARING_AGREEMENT",
    label: { en: "Income Sharing Agreement", de: "Einkommensteilungsvereinbarung" },
    checked: false
  },
  {
    value: "FREE",
    label: { en: "Completely Free", de: "Kostenlos" },
    checked: false
  },
  {
    value: "WITH_SCHOLARSHIP",
    label: { en: "With Scholarship", de: "Mit Stipendium" },
    checked: false
  }
]

const Bootcamps = ({ language }) => {
  const [bootcamps, setBootcamps] = useState({
    bootcamps: [],
    title: "",
    content: "",
    image: "",
    bootcampsListTitle: "",
    buttonText: ""
  })
  const [fundingOptions, setFundingOptions] = useState(defaultFundingOptions)
  const [careerOptions, setCareerOptions] = useState(defaultCareerOptions)
  const [locationOptions, setLocationOptions] = useState(defaultLocationOptions)
  const [languageOptions, setLanguageOptions] = useState(defaultLanguageOptions)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBootcamps = async () => {
      const bootcamps = await api.getBootcamps(language);
      setBootcamps(bootcamps)
      setLoading(false)
    }
    fetchBootcamps();
  }, [language])

  const selectedValuesFromOptions = (options) => {
    return options.filter(option => option.checked).map(option => option.value)
  }

  const filterBootcamps = (bootcamps) => {
    return bootcamps
      .filter(filterBootcampsByCareer)
      .filter(filterBootcampsByLocation)
      .filter(filterBootcampsByFunding)
      .filter(filterBootcampsByLanguage)
  }

  const isIntersectingItems = (list1, list2) => {
    return list1.some(item => list2.includes(item))
  }

  const filterBootcampsByCareer = (bootcamp) => {
    const selectedCareerOptions = selectedValuesFromOptions(careerOptions)
    if (selectedCareerOptions.some(careerOption => careerOption === "ALL")) {
      return true
    }
    return isIntersectingItems(selectedCareerOptions, bootcamp.bootcamp.career || [])
  }

  const filterBootcampsByLocation = (bootcamp) => {
    const selectedLocationOptions = selectedValuesFromOptions(locationOptions)
    if (selectedLocationOptions.some(locationOption => locationOption === "ALL")) {
      return true
    }
    return isIntersectingItems(selectedLocationOptions, bootcamp.bootcamp.location || [])
  }

  const filterBootcampsByFunding = (bootcamp) => {
    const selectedFundingOptions = selectedValuesFromOptions(fundingOptions)
    if (selectedFundingOptions.length === 0) {
      return true
    }
    return isIntersectingItems(selectedFundingOptions, bootcamp.bootcamp.funding_options || [])
  }

  const filterBootcampsByLanguage = (bootcamp) => {
    const selectedLanguageOptions = selectedValuesFromOptions(languageOptions)
    if (selectedLanguageOptions.length === 0) {
      return true
    }
    return isIntersectingItems(selectedLanguageOptions, bootcamp.bootcamp.language || [])
  }

  const getSelectedLocation = () => {
    const selectedLocation = locationOptions.find(location => location.checked)
    if (selectedLocation === undefined) {
      return {
        value: "GERMANY",
        label: { en: "All locations", de: "Alle Orte" },
        checked: false
      }
    }
    return selectedLocation
  }

  const getCareerByValue = (value) => {
    return defaultCareerOptions.find(careerOption => careerOption.value === value)
  }

  if (loading) {
    return (<Loading errorMessage={undefined} />);
  }


  const i18n = {
    description: {
      en: "Description",
      de: "Beschreibung"
    },
    courses: {
      en: "Course(s):",
      de: "Kurs(e):"
    },
    learnMore: {
      en: "Learn more",
      de: "MEHR ERFAHREN"
    },
    career: {
      en: "Career",
      de: "Karriere"
    },
    location: {
      en: "Location",
      de: "Ort"
    },
    fundingOptions: {
      en: "Funding Options",
      de: "Finanzierung"
    },
    defaultFundingOption: {
      en: "All options",
      de: "Alle Optionen"
    },
    languageOptions: {
      en: "Languages",
      de: "Sprachen"
    },
    defaultLanguageOption: {
      en: "All languages",
      de: "Alle Sprachen"
    },
  };

  return (
    <div className="bootcamps__page">
      <CompassWidget language={language} />
      <BootcampsHero title={bootcamps.title} content={bootcamps.content} image={bootcamps.image} buttonText={bootcamps.buttonText} />
      <h1>{bootcamps.bootcampsListTitle}</h1>
      <div className="filters">
        <div className="w-1/3">
          <MultiSelectDropdown
            label={i18n.languageOptions[language]}
            options={languageOptions.map((languageOption) => ({ ...languageOption, label: languageOption.label[language] }))}
            setOptions={setLanguageOptions}
            defaultOption={i18n.defaultLanguageOption[language]}
            allOptions={i18n.defaultLanguageOption[language]}
          />
        </div>
        <div className="w-1/3">
          <MultiSelectDropdown label={i18n.fundingOptions[language]} options={fundingOptions.map((fundingOption) => ({ ...fundingOption, label: fundingOption.label[language] }))} setOptions={setFundingOptions} defaultOption={i18n.defaultFundingOption[language]} allOptions={i18n.defaultFundingOption[language]} />
        </div>
        <div className="w-1/3">
          <SingleSelectDropdown label={i18n.location[language]} options={locationOptions.map((locationOption) => ({ ...locationOption, label: locationOption.label[language] }))} setOptions={setLocationOptions} />
        </div>
        <div className="w-1/3">
          <SingleSelectDropdown label={i18n.career[language]} options={careerOptions.map((careerOption) => ({ ...careerOption, label: careerOption.label[language] }))} setOptions={setCareerOptions} />
        </div>
      </div>
      <ul className="bootcamp__list">{utils.shuffle(filterBootcamps(bootcamps.bootcamps)).map(({ bootcamp, slug }) => {
        return (
          <li key={bootcamp.partner_name} className="bootcamp__item">
            <BootcampCard
              bootcamp={bootcamp}
              careers={(bootcamp.career || [])
                .map(careerValue => getCareerByValue(careerValue))
                .filter(career => career !== undefined)}
              language={language}
              location={getSelectedLocation()}
              slug={slug}
            />
          </li>
        )
      })}
      </ul>
    </div >
  )
}

export default Bootcamps;
