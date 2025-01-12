import React, { useState, useEffect } from "react";

import Loading from '../components/Loading';
import BootcampsHero from "../components/BootcampsHero"
import BootcampCard from "components/BootcampCard";



import api from "../api"
import utils from 'utils';

const ProfessionalCertificates = ({ language }) => {
  const [bootcamps, setBootcamps] = useState({
    bootcamps: [],
    title: "",
    content: "",
    image: "",
    bootcampsListTitle: "",
    bootcampsListDescription: "",
  })

  const [loading, setLoading] = useState(true)

  const i18n = {
    online: {
      value: "ONLINE",
      label: { en: "Online", de: "Online" },
      checked: false
    },
    professionalCertificate: {
      value: "PROFESSIONAL_CERTIFICATE",
      label: { en: "Professional Certificates", de: "Professionelle Zertifikate" },
      checked: false,
      color: "bg-green",
    }
  }

  useEffect(() => {
    const fetchBootcamps = async () => {
      const bootcamps = await api.getProfessionalCertificates(language);
      setBootcamps(bootcamps)
      setLoading(false)
    }
    fetchBootcamps();
  }, [language])

  if (loading) {
    return (<Loading errorMessage={undefined} />);
  }

  const filterBootcamps = (bootcamps) => {
    return bootcamps.filter(bootcamp => bootcamp?.bootcamp?.career.includes("PROFESSIONAL_CERTIFICATE"))
  }

  return (
    <div className="bootcamps__page">
      <BootcampsHero title={bootcamps.title} content={bootcamps.content} image={bootcamps.image} buttonText={bootcamps.buttonText} />
      <h1>{bootcamps.bootcampsListTitle}</h1>
      <div className="bootcamp-list-description" dangerouslySetInnerHTML={{ __html: bootcamps.bootcampsListDescription }}>
      </div>
      <ul className="bootcamp__list">{utils.shuffle(filterBootcamps(bootcamps.bootcamps)).map(({ bootcamp, slug }) => {
        return (
          <li key={bootcamp.partner_name} className="bootcamp__item">
            <BootcampCard
              bootcamp={bootcamp}
              careers={[i18n.professionalCertificate]}
              language={language}
              location={i18n.online}
              slug={slug}
            />
          </li>)
      })}
      </ul>
    </div>
  )
}

export default ProfessionalCertificates