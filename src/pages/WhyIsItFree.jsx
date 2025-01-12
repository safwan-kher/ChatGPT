import React from 'react';

// Page
import Page from './Page';

// Components
import WhyIsItFreeHero from 'components/WhyIsItFreeHero';
import WhyIsItFreeBody from 'components/WhyIsItFreeBody';
import Apply from 'components/Apply';

export default class WhyIsItFree extends Page {
  componentDidMount() {
    super.componentDidMount();
  }
  render() {
    const { content } = this.state;

    if (!content) {
      return super.render();
    }
    return (
      <div className="whyisitfree">

        <WhyIsItFreeHero
          title={ content.whyisitfreehero_title }
          text={ content.whyisitfreehero_text }
          bottomText={ content.whyisitfreehero_bottom_text }
          image={ content.whyisitfreehero_image }
        />

        <WhyIsItFreeBody
          title={ content.whyisitfreebody_title }
          text={ content.whyisitfreebody_text }
        />

        <Apply
          title={ content.apply_title }
          text={ content.apply_text }
          items={ content.apply_items }
          bottomTitle={ content.apply_bottom_title }
          bottomButtonLabel={ content.apply_bottom_button_label }
        />

      </div>
    );
  }
}
