import React, { FC, useState, useEffect } from "react";

// Components
import api from "../../src/api";
import { IGetLayout } from "../../src/components/DefaultLayout";
import { InferGetStaticPropsType, GetStaticProps } from "next";

import Button from "../../src/components/Button";
import HeroWithText from "../../src/components/HeroWithText";
import { useRouter } from "next/router";

const WhyIsItFreePage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content }) => {
  const router = useRouter();

  const [state, setState] = useState({
    selectedSections: [],
    activeId: null,
    showQuestions: false,
    isLoaderVisible: false,
    totalQuestions: Math.max(
      ...content.questions.map((question) => question.step)
    ),
  });

  const [longButtonLabelLength, setLongButtonLabelLength] = useState(50);
  // constructor(props) {
  //   super(props);
  //   state = {
  //     selectedSections: [],
  //     activeId: null,
  //     showQuestions: false,
  //     isLoaderVisible: false,
  //   };
  // }
  // componentDidMount() {
  //   super.componentDidMount(null, (content) => {
  //     setState({
  //       totalQuestions: Math.max(...content.questions.map((question) => question.step)),
  //     });
  //   });
  // }
  const goBack = () => {
    const { selectedSections } = state;
    const lastSection = selectedSections.pop();

    setState((cur) => ({
      ...cur,
      selectedSections,
      activeId: lastSection.id,
    }));
  };
  const makeChoice = (question, answer) => {
    setState((cur) => ({
      ...cur,
      isLoaderVisible: answer.id === "done" ? true : false,
      selectedSections: [
        ...cur.selectedSections,
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
    }));
    if (answer.id === "done") {
      // TODO store this info somewhere?

      // setState(cur => ({ ...cur, isLoaderVisible: true }))
      const params = state.selectedSections
        .map((q) => {
          return q.filter && q.value ? `${q.filter}=${q.value}` : false;
        })
        .filter((q) => q);

      setTimeout(() => {
        router.push(`/en/compass-tool/results?${params.join("&")}`);
        // props.history.push(`/en/compass-tool/results?${params.join('&')}`);
      }, 3000);
    }

    // setState({
    //   isLoaderVisible: true,
    // }, () => {
    //   const params = state.selectedSections.map((q) => {
    //     return q.filter && q.value ? `${q.filter}=${q.value}` : false;
    //   }).filter((q) => q);

    //   setTimeout(() => {
    //     props.history.push(`/en/compass-tool/results?${params.join('&')}`);
    //   }, 3000);
    // });
    //   }
    // });
  };

  const replacePlaceholder = (item) => {
    const foundAnswer = state.selectedSections.find(
      (section) => section.id === item.placeholder
    );
    if (foundAnswer) {
      const strippedAnswer = foundAnswer.answer.replace(
        /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
        ""
      );
      return item.question.replace("[placeholder]", strippedAnswer);
    }
    return item.question;
  };

  const {
    totalQuestions,
    selectedSections,
    activeId,
    showQuestions,
    isLoaderVisible,
  } = state;

  const { title, text, button_label, image, questions } = content;

  let currentStep = 0;
  let currentId = "";
  if (selectedSections.length) {
    const currentSection = selectedSections[selectedSections.length - 1];
    currentStep = currentSection.step;
    currentId = currentSection.id;
  }

  const percentage = (currentStep / totalQuestions) * 100;

  useEffect(() => {
    setLongButtonLabelLength(window.innerWidth < 640 ? 30 : 50);
  }, []);
  // let longButtonLabelLength = 50
  // if (typeof window !== undefined) {
  //   longButtonLabelLength = (window.innerWidth < 640) ? 30 : 50
  // }
  const progressText = currentId.startsWith("2-")
    ? "Now we'll evaluate if you qualify for government support (up to 100% costs covered)."
    : "The first few questions will help determine what type of career you could excel in.";

  return (
    <div className="compass-tool">
      <div
        className={`compass-tool__loader__blocker${
          isLoaderVisible ? " compass-tool__loader__blocker--show" : ""
        }`}
      >
        <div className="compass-tool__loader">
          <div className="compass-tool__loader__heading">
            {"Calculating your results"}
          </div>
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
                className={
                  (activeId ? item.id === activeId : index === 0)
                    ? "active"
                    : ""
                }
              >
                <div className="row">
                  <div className="col-1 col-0-sm" />
                  <div className="col-5 col-12-sm">
                    <div className="compass-tool__question">
                      {index > 0 && (
                        <div
                          className="compass-tool__back"
                          onClick={() => goBack()}
                        />
                      )}
                      <h2>
                        {item.placeholder
                          ? replacePlaceholder(item)
                          : item.question}
                      </h2>
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
                            onClick={() => makeChoice(item, answer)}
                            variant={`small transparent-blue${
                              answer.label.length > longButtonLabelLength
                                ? ` wordy`
                                : ""
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="compass-tool__notice">
                      <span role="img" aria-label="Finger pointing up">
                        ☝️
                      </span>
                      You can change this preference later
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
                    <div className="compass-tool__progress-text">
                      {progressText}
                    </div>
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
              setState((cur) => ({ ...cur, showQuestions: true }));
            }}
            image={image}
          />
        )}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ content: any }> = async (
  context
) => {
  const locale = context.locale === "default" ? "de" : context.locale;

  if (locale !== "en") {
    return {
      notFound: true,
    };
  }

  const content = (await api.getContent("compass-tool", locale)) as any;
  return {
    props: {
      content: content.content,
      title: content.title,
      description: content.description,
      locale: context.locale,
    },
  };
};

export default WhyIsItFreePage;
