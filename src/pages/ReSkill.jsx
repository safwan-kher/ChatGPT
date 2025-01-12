import React from 'react';

// Page
import Page from './Page';

// Components
import Bootcamps from 'components/Bootcamps';
import ImageText from 'components/ImageText';
import PartnerList from 'components/PartnerList';
import ThreeColumnImage from 'components/ThreeColumnImage';
import Timeline from 'components/Timeline';
import PreFooterBlocks from 'components/PreFooterBlocks';

export default class ReSkill extends Page {
  componentDidMount() {
    super.componentDidMount();
  }
  render() {
    const { content } = this.state;

    if (!content) {
      return super.render();
    }
    return (
      <div className="reskill">

        <PartnerList
          title={ content.partnerlist_title }
          items={ content.partnerlist_items }
        />

        <ImageText
          title={ content.imagetext_title }
          text={ content.imagetext_text }
          image={ content.imagetext_image }
        />

        <ThreeColumnImage
          title={ content.threecolumnimage_title }
          text={ content.threecolumnimage_text }
          items={ content.threecolumnimage_items }
        />

        <Bootcamps
          title={ content.bootcamps_title }
          items={ content.bootcamps_items }
        />

        <Timeline
          title={ content.timeline_title }
          text={ content.timeline_text }
          items={ content.timeline_items }
        />

        <PreFooterBlocks
          titleLeft={ content.prefooterblocks_title_left }
          textLeft={ content.prefooterblocks_text_left }
          textButtonLinkLeft={ () => {
            window.setIsApplyFormVisible(true);
            const input = document.getElementById('reskill-form-input');
            if (input) {
              input.focus();
            }
          }}
          textButtonLabelLeft={ content.prefooterblocks_button_label_left }
          titleRight={ content.prefooterblocks_title_right }
          textRight={ content.prefooterblocks_text_right }
          textButtonLinkRight={ () => {
            window.setIsSupportFormVisible(true);
            const input = document.getElementById('reskill-form-input2');
            if (input) {
              input.focus();
            }
          }}
          textButtonLabelRight={ content.prefooterblocks_button_label_right }
        />

      </div>
    );
  }
}
