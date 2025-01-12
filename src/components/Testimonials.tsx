import React, { useState } from "react";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    name: "Mariia",
    position: "Intern in the Software Engineering team at Zalando",
    image: "https://via.placeholder.com/150",
    quote:
      "The StartSteps Bootcamp felt like running a marathon, but not alone—it was a journey we shared with classmates, mentors, and organizers.",
    borderColor: "#FF5722",
  },
  {
    name: "John",
    position: "Intern in the Software Engineering team at Zalando",
    image: "https://via.placeholder.com/150",
    quote:
      "The StartSteps Bootcamp felt like running a marathon, but not alone—it was a journey we shared with classmates, mentors, and organizers.",
    borderColor: "#FF5722",
  },
  {
    name: "Snow",
    position: "Intern in the Software Engineering team at Zalando",
    image: "https://via.placeholder.com/150",
    quote:
      "The StartSteps Bootcamp felt like running a marathon, but not alone—it was a journey we shared with classmates, mentors, and organizers.",
    borderColor:"#FF5722",
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNavigation = (direction: "prev" | "next") => {
    setIsAnimating(true);

    if (direction === "prev") {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
      );
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className={styles.testimonialsContainer}>
      <div className={styles.testimonialsWrapper}>
        <div className={styles.header}>
          <h1>Testimonials</h1>
          <h2>Inspiring Women in Tech</h2>
        </div>
        <div className={styles.testimonialSlider}>
          <div
            className={`${styles.testimonialCard} ${
              isAnimating ? styles.slideAnimation : ""
            }`}
            style={{
              borderColor: testimonials[currentIndex].borderColor,
            }}
          >
            <div className={styles.testimonialContent}>
              <div className={styles.profileSection}>
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className={styles.profileImage}
                />
              </div>
              <div className={styles.quoteSection}>
                <div className={styles.quoteHeader}>
                  <div className={styles.quoteMark}>
                    <svg
                      width="1000px"
                      height="1000px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                      </g>
                    </svg>
                  </div>
                  <div className={styles.quoteContent}>
                    <h3>{testimonials[currentIndex].name},</h3>
                    <p>{testimonials[currentIndex].position}</p>
                  </div>
                </div>
                <div className={styles.quoteText}>
                  {testimonials[currentIndex].quote}
                </div>
                <div className={styles.readMoreContainer}>
                  <a href="#" className={styles.readMore}>
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.navigation}>
            <button
              className={`${styles.prevBtn} ${
                isAnimating ? styles.active : ""
              }`}
              onClick={() => handleNavigation("prev")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 4L7 12L15 20"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className={`${styles.nextBtn} ${
                isAnimating ? styles.active : ""
              }`}
              onClick={() => handleNavigation("next")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 4L17 12L9 20"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
