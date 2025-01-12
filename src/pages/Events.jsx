import React from 'react';

// Helper
import utils from 'utils';


// Page
import Page from './Page';

// Styles


export default class Events extends Page {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          title: 'A career in tech: where do I start?',
          type: 'Webinar',
          link: 'https://www.eventbrite.com/e/a-career-in-tech-where-do-i-start-tickets-119907325037',
          datetime: '1600186500',
          location: 'Online Event',
          image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F110764713%2F471402625215%2F1%2Foriginal.20200908-075349?w=800&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C500%2C3000%2C1500&s=196e31d7c3ad9b5a48d2c7d0b351d7a7',
        },
      ]
    };
  }
  componentDidMount() {
    super.componentDidMount();
  }
  render() {
    const {
      content,
      events,
    } = this.state;

    if (!content) {
      return super.render();
    }

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
              <div className="events__event__type">
                {event.type}
              </div>
              <div className="events__event__title">
                {event.title}
              </div>
              <div className="events__event__datetime">
                {utils.formatDateTime(event.datetime)}
              </div>
              <div className="events__event__location">
                {event.location}
              </div>
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
                <h2 className="events__title slider">
                  {content.events_title}
                </h2>
                <p
                  className="events__text slider slider-delay-1"
                  dangerouslySetInnerHTML={
                    { __html: utils.cleanText(content.events_text) }
                  }
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
  }
}
