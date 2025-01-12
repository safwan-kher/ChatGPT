import React, { FC } from "react";
import { InferGetStaticPropsType, GetStaticProps } from "next";

import api from "../../src/api";
import { IGetLayout } from "../../src/components/DefaultLayout";
import utils from "../../src/utils";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

const ImprintPage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content }) => {
  const router = useRouter();
  const locale = router.locale === "en" ? "en" : "de";
  return (
    <div className="legal">
      <NextSeo canonical={`https://startsteps.org/${locale}/legal/imprint`} />
      <div className="row">
        <div className="col-3 col-0-sm" />
        <div className="col-6 col-12-sm">
          <h1 className="legal__title">{content.generic_title}</h1>
          <div
            className="legal__text"
            dangerouslySetInnerHTML={{
              __html: utils.cleanText(content.generic_text, true),
            }}
          />
        </div>
        <div className="col-3 col-0-sm" />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ content: any }> = async (
  context
) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  const slug = locale === "en" ? "imprint" : "imprint";
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

export default ImprintPage;
