import React from 'react';

// Page
import Page from './Page';

// Components
import Button from 'components/Button';
import HeroWithText from 'components/HeroWithText';

// Styles


class CompassTool extends Page {
  constructor(props) {
    super(props);
    this.state = {
      selectedSections: [],
      activeId: null,
      showQuestions: false,
      isLoaderVisible: false,
    };
  }
  componentDidMount() {
    super.componentDidMount(null, (content) => {
      this.setState({
        totalQuestions: Math.max(...content.questions.map((question) => question.step)),
      });
    });
  }
  goBack() {
    const { selectedSections } = this.state;
    const lastSection = selectedSections.pop();

    this.setState({
      selectedSections,
      activeId: lastSection.id,
    });
  }
  makeChoice(question, answer) {
    this.setState({
      selectedSections: [
        ...this.state.selectedSections,
        {
          id: question.id,
          question: question.question,
          answer: answer.label,
          filter: question.filter,
          value: answer.value,
          step: question.step,
        },
      ],
      activeId: answer.id,
    }, () => {
      if (answer.id === 'done') {
        // TODO store this info somewhere?
        this.setState({
          isLoaderVisible: true,
        }, () => {
          const params = this.state.selectedSections.map((q) => {
            return q.filter && q.value ? `${q.filter}=${q.value}` : false;
          }).filter((q) => q);

          setTimeout(() => {
            this.props.history.push(`/en/compass-tool/results?${params.join('&')}`);
          }, 3000);
        });
      }
    });
  }
  replacePlaceholder(item) {
    const foundAnswer = this.state.selectedSections.find((section) => section.id === item.placeholder);
    if (foundAnswer) {
      const strippedAnswer = foundAnswer.answer.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '');
      return item.question.replace('[placeholder]', strippedAnswer);
    }
    return item.question;
  }
  render() {
    const {
      content,
      totalQuestions,
      selectedSections,
      activeId,
      showQuestions,
      isLoaderVisible,
    } = this.state;

    if (!content) {
      return super.render();
    }
    const {
      title,
      text,
      button_label,
      image,
      questions,
    } = content;

    let currentStep = 0;
    let currentId = '';
    if (selectedSections.length) {
      const currentSection = selectedSections[selectedSections.length - 1];
      currentStep = currentSection.step;
      currentId = currentSection.id;
    }

    const percentage = (currentStep / totalQuestions) * 100;
    const longButtonLabelLength = (window.innerWidth < 640) ? 30 : 50;
    const progressText = currentId.startsWith('2-') ? 'Now we\'ll evaluate if you qualify for government support (up to 100% costs covered).' : 'The first few questions will help determine what type of career you could excel in.';

    return (
      <div className="compass-tool">

        <div className={`compass-tool__loader__blocker${isLoaderVisible ? ' compass-tool__loader__blocker--show' : ''}`}>
          <div className="compass-tool__loader">
            <div className="compass-tool__loader__heading">{'Calculating your results'}</div>
            <div className="compass-tool__loader__gears">
              <div className="compass-tool__loader__gear" />
              <div className="compass-tool__loader__gear" />
              <div className="compass-tool__loader__gear" />
            </div>
          </div>
        </div>

        <div className="slider-block slider-block-first-load">

          {showQuestions ? (
            <>
              {questions.map((item, index) => (
                <section
                  key={index}
                  className={(activeId ? item.id === activeId : index === 0) ? 'active' : ''}
                >
                  <div className="row">
                    <div className="col-1 col-0-sm" />
                    <div className="col-5 col-12-sm">
                      <div className="compass-tool__question">
                        {index > 0 && (
                          <div
                            className="compass-tool__back"
                            onClick={() => this.goBack()}
                          />
                        )}
                        <h2>{item.placeholder ? this.replacePlaceholder(item) : item.question}</h2>
                      </div>
                    </div>
                    <div className="col-1 col-0-sm" />
                    <div className="col-4 col-12-sm">
                      <div className="compass-tool__answers">
                        <div className="compass-tool__buttons">
                          {item.answers.map((answer, index) => (
                            <Button
                              key={index}
                              label={answer.label}
                              onClick={() => this.makeChoice(item, answer)}
                              variant={`small transparent-blue${answer.label.length > longButtonLabelLength ? ` wordy` : ''}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="compass-tool__notice">
                        <span role="img" aria-label="Finger pointing up">☝️</span>You can change this preference later
                      </div>
                      {!isLoaderVisible && (
                        <div className="compass-tool__progress compass-tool__progress--nomargin hide-on-desktop">
                          <div
                            className="compass-tool__progress__bar"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="col-1 col-0-sm" />
                  </div>
                </section>
              ))}
              {!isLoaderVisible && (
                <div className="row">
                  <div className="col-1 col-0-sm" />
                  <div className="col-10 col-12-sm">
                    <div className="hide-on-mobile">
                      <div className="compass-tool__progress">
                        <div
                          className="compass-tool__progress__bar"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                      <div className="compass-tool__progress-text">{progressText}</div>
                    </div>
                  </div>
                  <div className="col-1 col-0-sm" />
                </div>
              )}
            </>
          ) : (
              <HeroWithText
                title={title}
                text={text}
                buttonLabel={button_label}
                buttonOnClick={() => {
                  window.scrollTo(0, 0);
                  this.setState({ showQuestions: true });
                }}
                image={image}
              />
            )}

        </div>
      </div>
    );
  }
}

export default CompassTool;
