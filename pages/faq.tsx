import React, { FC, useState } from "react";

// Components
import api from "../src/api";
import { IGetLayout } from "../src/components/DefaultLayout";
import { InferGetStaticPropsType, GetStaticProps } from "next";

import utils from "../src/utils";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

const FaqPage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content }) => {
  const [state, setState] = useState({
    openBlockIndex: 0,
    openIndex: 0,
  });
  const router = useRouter();
  const locale = router.locale !== "en" ? "de" : "en";

  const blocks = [];
  if (content.faq_blocks) {
    content.faq_blocks.forEach((block, blockIndex) => {
      const questions = [];

      block.questions.forEach((item, index) => {
        const isOpen =
          blockIndex === state.openBlockIndex && index === state.openIndex;
        questions.push(
          <div
            className={`faq__item${isOpen ? " faq__item--open" : ""}`}
            key={index}
            onClick={() => {
              setState({
                openBlockIndex: isOpen ? null : blockIndex,
                openIndex: isOpen ? null : index,
              });
            }}
          >
            <h1 className="faq__item__question">{item.question}</h1>
            <div
              className="faq__item__answer"
              dangerouslySetInnerHTML={{
                __html: utils.cleanText(item.answer, true),
              }}
            />
          </div>
        );
      });

      blocks.push(
        <div className="faq__group" key={blockIndex}>
          <h2 className="faq__title">{block.title}</h2>
          <div className="faq__items">{questions}</div>
        </div>
      );
    });
  }

  return (
    <div className="faq">
      <NextSeo
        canonical={
          locale === "en"
            ? "https://startsteps.org/en/faq"
            : "https://startsteps.org/de/faq"
        }
      />
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row">
            <div className="col-3 col-0-sm" />
            <div className="col-6 col-12-sm">{blocks}</div>
            <div className="col-3 col-0-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ content: any }> = async (
  context
) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  const slug = locale === "en" ? "faq" : "faq";
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

export default FaqPage;
