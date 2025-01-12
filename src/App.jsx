import React, { useState } from 'react';
import { CookiesProvider } from "react-cookie"

// Images
import { ReactComponent as ImageMask } from './assets/image-mask.svg';
import { ReactComponent as ImageMaskAlt } from './assets/image-mask-alt.svg';
import { ReactComponent as ImageMaskSmall } from './assets/image-mask-small.svg';
import { ReactComponent as ImageMaskSmallMirror } from './assets/image-mask-small-mirror.svg';
import { ReactComponent as BackgroundMask } from './assets/background-mask.svg';
import { ReactComponent as BackgroundMaskMirror } from './assets/background-mask-mirror.svg';
import { ReactComponent as BackgroundMaskMobile } from './assets/background-mask-mobile.svg';
import { ReactComponent as BackgroundMaskMobileMirror } from './assets/background-mask-mobile-mirror.svg';

// Components
import CookieBanner from './components/CookieBanner';
import Header from './components/Header';
import DownloadOverlay from './components/DownloadOverlay';
import Footer from './components/Footer';
import PixelWrapper from './components/PixelWrapper';
import ScrollToTop from './components/ScrollToTop';
import ReferralWrapper from './components/ReferralWrapper';
import SessionWrapper from './components/Session';

// Pages
import About from './pages/About.jsx';
import ApplyNow from './pages/ApplyNow.jsx';
import BlogDetail from './pages/BlogDetail.tsx';
import BlogList from './pages/BlogList.jsx';
import Careers from './pages/Careers.jsx';
import CompassTool from './pages/CompassTool.jsx';
import CompassToolResults from './pages/CompassToolResults.jsx';
import Contact from './pages/Contact.jsx';
import Course from './pages/Course.jsx';
import Events from './pages/Events.jsx';
import FAQ from './pages/FAQ.jsx';
import Home from './pages/Home.jsx';
import JobCenter from './pages/JobCenter.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Legal from './pages/Legal.jsx';
import NoMatch from './pages/NoMatch.jsx';
import Partner from './pages/Partner.jsx';
import ReSkill from './pages/ReSkill.jsx';
import WhyIsItFree from './pages/WhyIsItFree.jsx';
import Bootcamps from './pages/Bootcamps';
import ProfessionalCertificates from './pages/ProfessionalCertificates';
import TechMentor from './pages/TechMentor';
import FirstStepsPage from './pages/FirstSteps.tsx';

// Helper
import utils from 'utils';

// Styles


export default function App() {
  let ticking = false;
  let headerElem = null;
  const [isDownloadOverlayVisible, setIsDownloadOverlayVisible] = useState(false);

  // On scroll stuff
  const checkElementPosition = (elem, viewportTop, viewportHeight) => {
    const activationPoint = viewportTop + (viewportHeight * 0.6);
    const viewportBottom = viewportTop + (viewportHeight * 0.9);
    const elemTop = elem.offsetTop;
    const elemBottom = elemTop + elem.offsetHeight;
    const topInView = viewportTop <= elemTop && elemTop <= viewportBottom;
    const middleInView = viewportTop >= elemTop && elemBottom >= viewportBottom;
    const bottomInView = viewportTop <= elemBottom && elemBottom <= viewportBottom;

    if (elem.classList) {
      if (topInView || middleInView || bottomInView) {
        elem.classList.add('slider-block--visible');
      } else {
        elem.classList.remove('slider-block--visible');
      }
      if (elemTop <= activationPoint) {
        elem.classList.add('slider-block--activated');
      }
    }
  }
  window.onScroll = (isFirstLoad = false) => {
    ticking = false;
    const viewportTop = window.scrollY;
    const viewportHeight = window.innerHeight;

    if (!headerElem) {
      headerElem = document.querySelector('.header');
    }
    if (headerElem && headerElem.classList) {
      if (viewportTop > 0) {
        headerElem.classList.add('header--small');
      } else {
        headerElem.classList.remove('header--small');
      }
    }

    if (isFirstLoad) {
      document.querySelectorAll('.slider-block-first-load').forEach(slider => {
        checkElementPosition(slider, viewportTop, viewportHeight);
      });
    } else {
      document.querySelectorAll('.slider-block').forEach(slider => {
        checkElementPosition(slider, viewportTop, viewportHeight);
      });
    }
  }
  window.addEventListener('scroll', e => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        window.onScroll(false);
      });
      ticking = true;
    }
  });

  // Download course package overlay
  window.showDownloadOverlay = () => {
    setIsDownloadOverlayVisible(true);
  }
  window.closeDownloadOverlay = () => {
    setIsDownloadOverlayVisible(false);
  }
  window.scheduleAChat = () => {
    // eslint-disable-next-line
    window.Calendly.initPopupWidget({ url: 'https://calendly.com/startsteps' });
  };

  let appClass = 'app';
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    appClass += ' dev';
  }

  const landingPages = utils.landingPageSlugs();

  return (
    <Router>
      <CookiesProvider>
        <SessionWrapper>
          <PixelWrapper>
            <ReferralWrapper>
              <div className={appClass}>

                <CookieBanner />

                <Header />

                <DownloadOverlay
                  isVisible={isDownloadOverlayVisible}
                  setIsVisible={(isVisible) => {
                    setIsDownloadOverlayVisible(isVisible);
                  }}
                />

                <main className="main" role="main">

                  <ScrollToTop>
                    <Switch>

                      {landingPages.map((landingPage, index) => (
                        <Route
                          exact
                          path={landingPage.toString()}
                          key={index}
                        >
                          <LandingPage
                            language={landingPage.language}
                            slug={landingPage.slug}
                            leadSource={landingPage.label}
                          />
                        </Route>
                      ))}

                      <Route exact path="/en/compass-tool">
                        <CompassTool
                          language="en"
                          slug="compass-tool"
                        />
                      </Route>
                      <Route exact path="/en/compass-tool/results">
                        <CompassToolResults
                          language="en"
                          slug="compass-tool-results"
                        />
                      </Route>
                      <Route exact path="/en/bootcamps-we-work-with">
                        <Bootcamps
                          language="en"
                          slug="bootcamps-we-work-with"
                        />
                      </Route>
                      <Route exact path="/de/bootcamps-we-work-with">
                        <Bootcamps
                          language="de"
                          slug="bootcamps-we-work-with"
                        />
                      </Route>
                      <Route exact path="/en/landing-page-first-steps-to-jobs-in-tech">
                        <FirstStepsPage
                          language="en"
                          slug="first-steps-to-jobs-in-tech"
                        />
                      </Route>
                      <Route exact path="/de/landing-page-first-steps-to-jobs-in-tech">
                        <FirstStepsPage
                          language="de"
                          slug="first-steps-to-jobs-in-tech"
                        />
                      </Route>

                      <Route exact path="/en/professional-certificates">
                        <ProfessionalCertificates
                          language="en"
                          slug="professional-certificates"
                        />
                      </Route>
                      <Route exact path="/de/professional-certificates">
                        <ProfessionalCertificates
                          language="de"
                          slug="professional-certificates"
                        />
                      </Route>
                      <Route exact path="/en/courses/tech-mentor">
                        <TechMentor
                          language="en"
                          slug="tech-mentor"
                        />
                      </Route>
                      <Route exact path="/de/kurse/tech-mentor">
                        <TechMentor
                          language="de"
                          slug="tech-mentor"
                        />
                      </Route>

                      <Route exact path="/en/about-us">
                        <About
                          language="en"
                          slug="about"
                        />
                      </Route>
                      <Route exact path="/en/contact">
                        <Contact
                          language="en"
                          slug="contact"
                        />
                      </Route>
                      <Route exact path="/en/apply-now">
                        <ApplyNow
                          language="en"
                          slug="apply-now"
                        />
                      </Route>
                      <Route exact path="/en/careers">
                        <Careers
                          language="en"
                          slug="careers"
                        />
                      </Route>
                      <Route exact path="/en/faq">
                        <FAQ
                          language="en"
                          slug="faq"
                        />
                      </Route>
                      <Route exact path="/en/why-is-it-free">
                        <WhyIsItFree
                          language="en"
                          slug="why-is-it-free"
                        />
                      </Route>
                      <Route exact path="/en/jobcenter">
                        <JobCenter
                          language="en"
                          slug="jobcenter"
                        />
                      </Route>
                      <Route exact path="/en/events">
                        <Events
                          language="en"
                          slug="events"
                        />
                      </Route>
                      <Route exact path="/en/reskill">
                        <ReSkill
                          language="en"
                          slug="reskill"
                        />
                      </Route>
                      <Route exact path="/en/blog">
                        <BlogList language="en" />
                      </Route>
                      <Route exact path="/en/blog/:slug">
                        <BlogDetail language="en" />
                      </Route>
                      <Route exact path="/en/courses/:slug">
                        <Course language="en" />
                      </Route>
                      <Route exact path="/en/partner/:partner">
                        <Partner language="en" />
                      </Route>
                      <Route exact path="/de/partner/:partner">
                        <Partner language="de" />
                      </Route>
                      <Route exact path="/en/legal/:slug">
                        <Legal language="en" />
                      </Route>
                      <Route exact path="/en">
                        <Home
                          language="en"
                          slug="home"
                        />
                      </Route>


                      <Route exact path="/de/ueber-uns">
                        <About
                          language="de"
                          slug="ueber-uns"
                        />
                      </Route>
                      <Route exact path="/de/kontakt">
                        <Contact
                          language="de"
                          slug="kontakt"
                        />
                      </Route>
                      <Route exact path="/de/los-gehts">
                        <ApplyNow
                          language="de"
                          slug="los-gehts"
                        />
                      </Route>
                      <Route exact path="/de/karriere">
                        <Careers
                          language="de"
                          slug="karriere"
                        />
                      </Route>
                      <Route exact path="/de/faq">
                        <FAQ
                          language="de"
                          slug="faq"
                        />
                      </Route>
                      <Route exact path="/de/fur-jobcoaches">
                        <WhyIsItFree
                          language="de"
                          slug="fur-jobcoaches"
                        />
                      </Route>
                      <Route exact path="/de/warum-ist-es-kostenlos">
                        <WhyIsItFree
                          language="de"
                          slug="warum-ist-es-kostenlos"
                        />
                      </Route>
                      <Route exact path="/de/jobcenter">
                        <JobCenter
                          language="de"
                          slug="jobcenter"
                        />
                      </Route>
                      <Route exact path="/de/events">
                        <Events
                          language="de"
                          slug="events"
                        />
                      </Route>
                      <Route exact path="/de/blog">
                        <BlogList language="en" />
                      </Route>
                      <Route exact path="/de/blog/:slug">
                        <BlogDetail language="en" />
                      </Route>
                      <Route exact path="/de/kurse/:slug">
                        <Course language="de" />
                      </Route>
                      <Route exact path="/de/legal/:slug">
                        <Legal language="de" />
                      </Route>
                      <Route exact path="/de">
                        <Home
                          language="de"
                          slug="startseite"
                        />
                      </Route>

                      <Route exact path="/">
                        <Redirect to="/de" />
                      </Route>

                      <Route path="*">
                        <NoMatch />
                      </Route>
                    </Switch>
                  </ScrollToTop>

                </main>

                <Footer />

                <div className="image-masks">
                  <ImageMask />
                  <ImageMaskAlt />
                  <ImageMaskSmall />
                  <ImageMaskSmallMirror />
                  <BackgroundMask />
                  <BackgroundMaskMirror />
                  <BackgroundMaskMobile />
                  <BackgroundMaskMobileMirror />
                </div>

              </div>
            </ReferralWrapper>
          </PixelWrapper>
        </SessionWrapper>
      </CookiesProvider>
    </Router>
  );
}
