import React from 'react';

// Helper
import utils from 'utils';

// Page
import Page from './Page';

// Styles


class Legal extends Page {
  componentDidMount() {
    super.componentDidMount('slug');
  }
  render() {
    const { content } = this.state;

    if (!content) {
      return super.render();
    }

    return (
      <div className="legal">
        <div className="row">
          <div className="col-3 col-0-sm" />
          <div className="col-6 col-12-sm">
            <h1 className="legal__title">
              {content.generic_title}
            </h1>
            <div
              className="legal__text"
              dangerouslySetInnerHTML={
                { __html: utils.cleanText(content.generic_text, true) }
              }
            />
          </div>
          <div className="col-3 col-0-sm" />
        </div>
      </div>
    );
  }
}
export default Legal
