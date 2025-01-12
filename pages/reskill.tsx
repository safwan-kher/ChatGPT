import React, { useState, FC, useContext } from "react";

// Components
import api from "../src/api";
import { IGetLayout } from "../src/components/DefaultLayout";
import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

import Bootcamps from "../src/components/Bootcamps";
import ImageText from "../src/components/ImageText";
import PartnerList from "../src/components/PartnerList";
import ThreeColumnImage from "../src/components/ThreeColumnImage";
import Timeline from "../src/components/Timeline";
import PreFooterBlocks from "../src/components/PreFooterBlocks";
import { AppContext } from "./_app";
import { getReskillLayout } from "../src/components/ReskillLayout";

const Partner: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content }) => {
  const context = useContext(AppContext);

  return (
    <div className="reskill">
      <PartnerList
        title={content.partnerlist_title}
        items={content.partnerlist_items}
      />

      <ImageText
        title={content.imagetext_title}
        text={content.imagetext_text}
        image={content.imagetext_image}
      />

      <ThreeColumnImage
        title={content.threecolumnimage_title}
        text={content.threecolumnimage_text}
        items={content.threecolumnimage_items}
      />

      <Bootcamps
        title={content.bootcamps_title}
        items={content.bootcamps_items}
      />

      <Timeline
        title={content.timeline_title}
        text={content.timeline_text}
        items={content.timeline_items}
      />

      <PreFooterBlocks
        titleLeft={content.prefooterblocks_title_left}
        textLeft={content.prefooterblocks_text_left}
        textButtonLinkLeft={() => {
          context.setIsApplyFormVisible(true);
          const input = document.getElementById("reskill-form-input");
          if (input) {
            input.focus();
          }
        }}
        textButtonLabelLeft={content.prefooterblocks_button_label_left}
        titleRight={content.prefooterblocks_title_right}
        textRight={content.prefooterblocks_text_right}
        textButtonLinkRight={() => {
          context.setIsSupportFormVisible(true);
          const input = document.getElementById("reskill-form-input2");
          if (input) {
            input.focus();
          }
        }}
        textButtonLabelRight={content.prefooterblocks_button_label_right}
      />
    </div>
  );
};

Partner.defaultProps = { getLayout: getReskillLayout };

export const getStaticProps: GetStaticProps<{ content: any }> = async (
  context
) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  if (locale !== "en") {
    return {
      notFound: true,
    };
  }
  const slug = "reskill";
  const content = (await api.getContent(slug, locale)) as any;
  const header = (await api.getContent("reskill-header", "en", true)) as any;

  return {
    props: {
      content: content.content,
      title: content.title,
      description: content.description,
      locale: context.locale,
      header: header.content,
      pipelineId: 17,
    },
  };
};

export default Partner;
