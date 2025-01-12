import React, { FC } from "react";
import { InferGetStaticPropsType, GetStaticProps } from "next";

// Components
import api from "../src/api";
import { IGetLayout } from "../src/components/DefaultLayout";
import CareersHero from "../src/components/CareersHero";
import CareersList from "../src/components/CareersList";

const CareersPage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content, title, description, locale }) => {
  return (
    <div className="careers">
      <CareersHero
        title={content.careershero_title}
        text={content.careershero_text}
      />

      <CareersList items={content.careersjobs_blocks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  content: any;
  title: any;
  description: any;
  locale: any;
}> = async (context) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  const slug = locale === "en" ? "careers" : "karriere";
  const content = (await api.getContent(slug, locale)) as any;
  return {
    props: {
      content: content.content,
      title: content.title,
      description: content.description,
      locale: context.locale,
    },
  };
};

export default CareersPage;
