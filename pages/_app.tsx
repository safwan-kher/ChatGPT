import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Script from "next/script";

import "../styles/globals.css";
import "../src/grid.scss";
import "../src/App.scss";
import "../src/pages/CompassTool.scss";
import "../src/pages/Contact.scss";
import "../src/pages/Partner.scss";
import "../src/pages/FirstSteps.scss";
import "../src/pages/ApplyNow.scss";
import "../src/pages/NoMatch.scss";
import "../src/pages/Bootcamps.scss";
import "../src/pages/CompassToolResults.scss";
import "../src/pages/LandingPage.scss";
import "../src/pages/FAQ.scss";
import "../src/pages/TechMentor.scss";
import "../src/pages/JobCenter.scss";
import "../src/pages/Events.scss";
import "../src/pages/Legal.scss";
import "../src/pages/BlogList.scss";
import "../src/pages/BlogDetail.scss";
import "../src/variables.scss";
import "../src/fonts.scss";
import "../src/components/PartnerHero/PartnerHero.scss";
import "../src/components/MultiSelectDropdown/MultiSelectDropdown.scss";
import "../src/components/LearnMore/LearnMore.scss";
import "../src/components/Supporters/Supporters.scss";
import "../src/components/WhyIsItFreeBody/WhyIsItFreeBody.scss";
import "../src/components/CompassBlock/CompassBlock.scss";
import "../src/components/ThreeColumnImage/ThreeColumnImage.scss";
import "../src/components/VideoBlock/VideoBlock.scss";
import "../src/components/ImageLoader/ImageLoader.scss";
import "../src/components/Form/Form.scss";
import "../src/components/Providers/Providers.scss";
import "../src/components/Team/Team.scss";
import "../src/components/Footer/Footer.scss";
import "../src/components/DownloadOverlay/DownloadOverlay.scss";
import "../src/components/CourseDetailCard/CourseDetailCard.scss";
import "../src/components/Dropdown/Dropdown.scss";
import "../src/components/ImageText/ImageText.scss";
import "../src/components/AboutHero/AboutHero.scss";
import "../src/components/Signup/Signup.scss";
import "../src/components/CompassWidget/CompassWidget.scss";
import "../src/components/CareersHero/CareersHero.scss";
import "../src/components/Students/Students.scss";
import "../src/components/BootcampsHero/BootcampsHero.scss";
import "../src/components/PartnerList/PartnerList.scss";
import "../src/components/HeroWithText/HeroWithText.scss";
import "../src/components/Button/Button.scss";
import "../src/components/FurtherDetails/FurtherDetails.scss";
import "../src/components/Bootcamps/Bootcamps.scss";
import "../src/components/Loading/Loading.scss";
import "../src/components/CoreValues/CoreValues.scss";
import "../src/components/Input/Input.scss";
import "../src/components/CookieBanner/CookieBanner.scss";
import "../src/components/Checkbox/Checkbox.scss";
import "../src/components/CareersList/CareersList.scss";
import "../src/components/BadgeTitle/BadgeTitle.scss";
import "../src/components/WhyIsItFreeHero/WhyIsItFreeHero.scss";
import "../src/components/PreFooterBlocks/PreFooterBlocks.scss";
import "../src/components/UltraHeader/UltraHeader.scss";
import "../src/components/Timeline/Timeline.scss";
import "../src/components/Community/Community.scss";
import "../src/components/Curriculum/Curriculum.scss";
import "../src/components/Header/Header.scss";
import "../src/components/Apply/Apply.scss";
import "../src/components/EasySteps/EasySteps.scss";
import "../src/components/SingleSelectDropdown/SingleSelectDropdown.scss";
import "../src/components/BigHero/BigHero.scss";
import "../src/components/SimpleDropdown/SimpleDropdown.scss";
import "../src/components/PartnerDetails/PartnerDetails.scss";
import "../src/components/EventsForm/events-form.css";
import "../src/utils.scss";

import PixelWrapper from "../src/components/PixelWrapper";
import ReferralWrapper from "../src/components/ReferralWrapper";
import SessionWrapper from "../src/components/Session";
import { IGetLayout, getDefaultLayout } from "../src/components/DefaultLayout";
import { CookiesProvider } from "react-cookie";
import { createContext, useState } from "react";
import { useEffect } from "react";
import api from "api";
import Head from "next/head";
import CookieBanner from "../src/components/CookieBanner";
import { getLandingPageLayout } from "components/LandingPageLayout";
import { useRouter } from "next/router";
import { getOrientationCourseLayout } from "components/OrientationCourseLayout";

export const AppContext = createContext({
  isDownloadOverlayVisible: false,
  setIsDownloadOverlayVisible: (value: boolean) => undefined,
  isApplyFormVisible: false,
  setIsApplyFormVisible: (value: boolean) => undefined,
  isSupportFormVisible: false,
  setIsSupportFormVisible: (value: boolean) => undefined,
  session: "",
  setSession: (value: string) => undefined,
});

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{ getLayout: IGetLayout }>) => {
  const [isDownloadOverlayVisible, setIsDownloadOverlayVisible] =
    useState(false);
  const [isApplyFormVisible, setIsApplyFormVisible] = useState(false);
  const [isSupportFormVisible, setIsSupportFormVisible] = useState(false);
  const [session, setSession] = useState(undefined);
  const router = useRouter();

  let getLayout = Component.defaultProps?.getLayout
    ? Component.defaultProps?.getLayout
    : (pageProps as any).isLandingPage
    ? getLandingPageLayout
    : getDefaultLayout;

  if ((pageProps as any).isSpeakAndCodePost) {
    getLayout = getOrientationCourseLayout;
  }

  useEffect(() => {
    // Horjar
    (window as any).hj =
      (window as any).hj ||
      function () {
        ((window as any).hj.q = (window as any).hj.q || []).push(arguments);
      };
    (window as any)._hjSettings = { hjid: 1998479, hjsv: 6 };

    //Pipedrive
    (window as any).ldfdr = (window as any).ldfdr || {};

    const interval = setInterval(() => {
      if (
        (window as any).fbq?.instance?.configsLoaded["690276994903670"] &&
        session
      ) {
        api.trackFbEvent({
          eventName: "PageView",
          externalId: session,
          customDataObj: {},
        });
        clearInterval(interval);
        clearTimeout(timeout);
      }
    }, 500);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [session]);

  useEffect(() => {
    if (router.locale === "default") {
      router.push("/de");
    }
  }, [router.locale]);

  return (
    <>
      {session && (
        <Head>
          <script defer={true}>{`
            !function (f, b, e, v, n, t, s) {
              if (f.fbq) return; n = f.fbq = function () {
                n.callMethod ?
                  n.callMethod.apply(n, arguments) : n.queue.push(arguments)
              };
              if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
              n.queue = []; t = b.createElement(e); t.async = !0;
              t.src = v; s = b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t, s)
            }(window, document, 'script',
              'https://connect.facebook.net/en_US/fbevents.js');
            fbq.disablePushState = true;
            fbq("init", "690276994903670", {
               external_id: "${session}",
             })
            `}</script>
        </Head>
      )}
      <Head>
        <script
          src="https://www.google.com/recaptcha/api.js?render=6LdKe8kZAAAAAGGy28VytGxoi6PCcD0IpcyNUeN9"
          defer={true}
        />
        <script
          defer={true}
          dangerouslySetInnerHTML={{
            __html: `
    !function (w, d, t) {
      w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || []; ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"], ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } }; for (var i = 0; i < ttq.methods.length; i++)ttq.setAndDefer(ttq, ttq.methods[i]); ttq.instance = function (t) {
        for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++
        )ttq.setAndDefer(e, ttq.methods[n]); return e
      }, ttq.load = function (e, n) { var i = "https://analytics.tiktok.com/i18n/pixel/events.js"; ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = i, ttq._t = ttq._t || {}, ttq._t[e] = +new Date, ttq._o = ttq._o || {}, ttq._o[e] = n || {}; n = document.createElement("script"); n.type = "text/javascript", n.async = !0, n.src = i + "?sdkid=" + e + "&lib=" + t; e = document.getElementsByTagName("script")[0]; e.parentNode.insertBefore(n, e) };


      ttq.load('C2NPNSQ3E7AIH24M291G');
      ttq.page();
    }(window, document, 'ttq');
    `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            if(JSON.parse(localStorage.getItem("mayAddTrackingScripts"))) {
              gtag('consent', 'default', {
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'ad_storage': 'granted',
                'analytics_storage': 'granted',
              });
            } else {
              gtag('consent', 'default', {
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
              });
            }`,
          }}
        ></script>
        <script
          defer={true}
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M52KWLH');       
          `,
          }}
        />
      </Head>
      <Script
        strategy="lazyOnload"
        src="https://static.hotjar.com/c/hotjar-1998479.js?sv=6"
      />
      <Script
        strategy="lazyOnload"
        src="https://sc.lfeeder.com/lftracker_v1_p1e024BPQBp8GB6d.js"
      />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-M52KWLH"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      <AppContext.Provider
        value={{
          isDownloadOverlayVisible: isDownloadOverlayVisible,
          setIsDownloadOverlayVisible: setIsDownloadOverlayVisible,
          isApplyFormVisible: isApplyFormVisible,
          setIsApplyFormVisible: setIsApplyFormVisible,
          isSupportFormVisible: isSupportFormVisible,
          setIsSupportFormVisible: setIsSupportFormVisible,
          session: session,
          setSession: setSession,
        }}
      >
        <CookiesProvider>
          <SessionWrapper>
            <PixelWrapper>
              <ReferralWrapper>
                <DefaultSeo
                  defaultTitle="StartSteps: Digital Skills & the Jobs of the Future"
                  description="Looking for a career change and unsure where to start? Our free navigation courses kickstart your journey to the digital skills and tech jobs of the future. Coding. Marketing. Data Science. UX / UI."
                  openGraph={{
                    type: "website",
                    locale: "de_DE",
                    url: "https://startsteps.org/de",
                    site_name: "StartSteps Digital Education",
                    images: (pageProps as any)?.content?.seo_image
                      ? [
                          {
                            url: (pageProps as any).content.seo_image.sizes[
                              "2048x2048"
                            ],
                            alt: (pageProps as any).content.seo_image.alt,
                            width: (pageProps as any).content.seo_image.width,
                            height: (pageProps as any).content.seo_image.height,
                            type: (pageProps as any).content.mime_type,
                          },
                        ]
                      : [
                          {
                            url: "https://startsteps.org/StartSteps.jpg",
                            width: 1280,
                            height: 626,
                            alt: "StartSteps Digital Education",
                          },
                        ],
                  }}
                  twitter={{
                    cardType: "summary_large_image",
                  }}
                />
                <CookieBanner />
                {getLayout(<Component {...pageProps} />)}
              </ReferralWrapper>
            </PixelWrapper>
          </SessionWrapper>
        </CookiesProvider>
      </AppContext.Provider>
    </>
  );
};

export default MyApp;
