import React, { FC, useState } from "react";

// Components
import api from "../src/api";
import utils from "../src/utils";
import { IGetLayout } from "../src/components/DefaultLayout";
import { InferGetStaticPropsType, GetStaticProps } from "next";

const EventsPage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content }) => {
  const [events, setEvents] = useState([
    {
      title: "A career in tech: where do I start?",
      type: "Webinar",
      link: "https://www.eventbrite.com/e/a-career-in-tech-where-do-i-start-tickets-119907325037",
      datetime: "1600186500",
      location: "Online Event",
      image:
        "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F110764713%2F471402625215%2F1%2Foriginal.20200908-075349?w=800&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C500%2C3000%2C1500&s=196e31d7c3ad9b5a48d2c7d0b351d7a7",
    },
  ]);
  const eventBlocks = [];
  if (events) {
    events.forEach((event, index) => {
      eventBlocks.push(
        <a
          key={index}
          className="events__event"
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className="events__event__image"
            style={{
              backgroundImage: `url(${event.image})`,
            }}
          />
          <div className="events__event__info">
            <div className="events__event__type">{event.type}</div>
            <div className="events__event__title">{event.title}</div>
            <div className="events__event__datetime">
              {utils.formatDateTime(event.datetime)}
            </div>
            <div className="events__event__location">{event.location}</div>
          </div>
        </a>
      );
    });
  }

  return (
    <div className="events slider-block slider-block-first-load">
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row">
            <div className="col-3 col-0-sm" />
            <div className="col-6 col-12-sm">
              <h1 className="events__title slider">{content.events_title}</h1>
              <p
                className="events__text slider slider-delay-1"
                dangerouslySetInnerHTML={{
                  __html: utils.cleanText(content.events_text),
                }}
              />
            </div>
            <div className="col-3 col-0-sm" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-1 col-0-sm" />
        <div className="col-10 col-12-sm">
          <div className="events__items slider slider-delay-2">
            {eventBlocks}
          </div>
        </div>
        <div className="col-1 col-0-sm" />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ content: any }> = async (
  context
) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  const slug = locale === "en" ? "events" : "events";
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

export default EventsPage;
