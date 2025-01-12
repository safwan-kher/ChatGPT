import React from 'react';

// Helper
import utils from 'utils';

// Page
import Page from './Page';

// Styles


export default class FAQ extends Page {
  constructor(props) {
    super(props);
    this.state = {
      openBlockIndex: 0,
      openIndex: 0,
    };
  }
  componentDidMount() {
    super.componentDidMount();
  }
  render() {
    const { content } = this.state;

    if (!content) {
      return super.render();
    }

    const blocks = [];
    if (content.faq_blocks) {
      content.faq_blocks.forEach((block, blockIndex) => {
        const questions = [];

        block.questions.forEach((item, index) => {
          const isOpen = blockIndex === this.state.openBlockIndex && index === this.state.openIndex;
          questions.push(
            <div
              className={`faq__item${isOpen ? ' faq__item--open' : ''}`}
              key={index}
            >
              <h2
                className="faq__item__question"
                onClick={() => {
                  this.setState({
                    openBlockIndex: isOpen ? null : blockIndex,
                    openIndex: isOpen ? null : index,
                  });
                }}
              >
                {item.question}
              </h2>
              <div
                className="faq__item__answer"
                dangerouslySetInnerHTML={
                  { __html: utils.cleanText(item.answer, true) }
                }
              />
            </div>
          );
        });

        blocks.push(
          <div
            className="faq__group"
            key={blockIndex}
          >
            <h2 className="faq__title">
              {block.title}
            </h2>
            <div className="faq__items">
              {questions}
            </div>
          </div>
        );
      });
    }
    return (
      <div className="faq">
        <div className="full-width-outer">
          <div className="full-width-inner">
            <div className="row">
              <div className="col-3 col-0-sm" />
              <div className="col-6 col-12-sm">
                {blocks}
              </div>
              <div className="col-3 col-0-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
