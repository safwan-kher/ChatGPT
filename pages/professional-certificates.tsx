import React, { FC } from "react";

import BootcampsHero from "../src/components/BootcampsHero";
import BootcampCard from "../src/components/BootcampCard";

import api from "../src/api";
import utils from "../src/utils";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { IGetLayout } from "../src/components/DefaultLayout";
import { useRouter } from "next/router";

const ProfessionalCertificatesPage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ bootcamps }) => {
  const router = useRouter();
  const language = router.locale as "en" | "de";

  const i18n = {
    online: {
      value: "ONLINE",
      label: { en: "Online", de: "Online" },
      checked: false,
    },
    professionalCertificate: {
      value: "PROFESSIONAL_CERTIFICATE",
      label: {
        en: "Professional Certificates",
        de: "Professionelle Zertifikate",
      },
      checked: false,
      color: "bg-green",
    },
  };

  const filterBootcamps = (bootcamps) => {
    return bootcamps.filter((bootcamp) =>
      bootcamp?.bootcamp?.career.includes("PROFESSIONAL_CERTIFICATE")
    );
  };

  return (
    <div className="bootcamps__page">
      <BootcampsHero
        title={bootcamps.title}
        content={bootcamps.content}
        image={bootcamps.image}
        buttonText={bootcamps.buttonText}
      />
      <h1>{bootcamps.bootcampsListTitle}</h1>
      <div
        className="bootcamp-list-description"
        dangerouslySetInnerHTML={{ __html: bootcamps.bootcampsListDescription }}
      ></div>
      <ul className="bootcamp__list">
        {utils
          .shuffle(filterBootcamps(bootcamps.bootcamps))
          .map(({ bootcamp, slug }) => {
            return (
              <li key={bootcamp.partner_name} className="bootcamp__item">
                <BootcampCard
                  bootcamp={bootcamp}
                  careers={[i18n.professionalCertificate]}
                  language={language}
                  location={i18n.online}
                  slug={slug}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ bootcamps: any }> = async (
  props
) => {
  const locale = props.locale === "default" ? "de" : props.locale;
  const bootcamps = await api.getProfessionalCertificates(locale);
  // TODO: Add title and description
  return { props: { bootcamps: bootcamps } };
};

export default ProfessionalCertificatesPage;
