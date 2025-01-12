import React from 'react';

// Page
import Page from './Page';

// Components
import CareersHero from 'components/CareersHero';
import CareersList from 'components/CareersList';

export default class Careers extends Page {
  componentDidMount() {
    super.componentDidMount();
  }
  render() {
    const { content } = this.state;

    if (!content) {
      return super.render();
    }
    return (
      <div className="careers">

        <CareersHero
          title={ content.careershero_title }
          text={ content.careershero_text }
        />

        <CareersList items={ content.careersjobs_blocks } />

      </div>
    );
  }
}
