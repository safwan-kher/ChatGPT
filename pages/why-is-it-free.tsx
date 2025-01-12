import React, { FC } from "react";

// Components
import api from "../src/api";
import { IGetLayout } from "../src/components/DefaultLayout";
import { InferGetStaticPropsType, GetStaticProps } from "next";

import WhyIsItFreeHero from "../src/components/WhyIsItFreeHero";
import WhyIsItFreeBody from "../src/components/WhyIsItFreeBody";
import Apply from "../src/components/Apply";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

const WhyIsItFreePage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content }) => {
  const router = useRouter();
  const locale = router.locale === "en" ? "en" : "de";
  return (
    <div className="whyisitfree">
      <NextSeo
        canonical={
          locale === "en"
            ? `https://startsteps.org/en/why-is-it-free`
            : `https://startsteps.org/de/warum-ist-es-kostenlos`
        }
      />
      <WhyIsItFreeHero
        title={content.whyisitfreehero_title}
        text={content.whyisitfreehero_text}
        bottomText={content.whyisitfreehero_bottom_text}
        image={content.whyisitfreehero_image}
      />

      <WhyIsItFreeBody
        title={content.whyisitfreebody_title}
        text={content.whyisitfreebody_text}
      />

      <Apply
        title={content.apply_title}
        text={content.apply_text}
        items={content.apply_items}
        bottomTitle={content.apply_bottom_title}
        bottomButtonLabel={content.apply_bottom_button_label}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ content: any }> = async (
  context
) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  const slug = locale === "en" ? "why-is-it-free" : "warum-ist-es-kostenlos";
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

export default WhyIsItFreePage;
