import { FC, ReactElement, useState, useEffect, useContext } from "react";
import { NextSeo } from "next-seo";
import Link from "next/link";

import { AppContext } from "../../pages/_app";
import { useRouter } from "next/router";
import { CoursePackageDownloadForm } from "./CoursePackageDownloadForm";
import coursePackage from "../../course-package.json";
import { getReferral } from "./ReferralWrapper";
import { useCookies } from "react-cookie";

export interface IGetLayout {
  (page: ReactElement): ReactElement;
}

const OrientationCourseLayout: FC<{ pageProps: any }> = ({
  children,
  pageProps,
}) => {
  const router = useRouter();
  const [cookies] = useCookies();
  const locale = router.locale === "en" ? "en" : "de";
  const [ticking, setTicking] = useState(false);
  const context = useContext(AppContext);
  const checkElementPosition = (elem, viewportTop, viewportHeight) => {
    const activationPoint = viewportTop + viewportHeight * 0.6;
    const viewportBottom = viewportTop + viewportHeight * 0.9;
    const elemTop = elem.offsetTop;
    const elemBottom = elemTop + elem.offsetHeight;
    const topInView = viewportTop <= elemTop && elemTop <= viewportBottom;
    const middleInView = viewportTop >= elemTop && elemBottom >= viewportBottom;
    const bottomInView =
      viewportTop <= elemBottom && elemBottom <= viewportBottom;

    if (elem.classList) {
      if (topInView || middleInView || bottomInView) {
        elem.classList.add("slider-block--visible");
      } else {
        elem.classList.remove("slider-block--visible");
      }
      if (elemTop <= activationPoint) {
        elem.classList.add("slider-block--activated");
      }
    }
  };

  useEffect(() => {
    let headerElem = null;
    (window.onscroll as any) = (isFirstLoad = false) => {
      setTicking(false);
      const viewportTop = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (!headerElem) {
        headerElem = document.querySelector(".header");
      }
      if (headerElem && headerElem.classList) {
        if (viewportTop > 0) {
          headerElem.classList.add("header--small");
        } else {
          headerElem.classList.remove("header--small");
        }
      }

      if (isFirstLoad) {
        document
          .querySelectorAll(".slider-block-first-load")
          .forEach((slider) => {
            checkElementPosition(slider, viewportTop, viewportHeight);
          });
      } else {
        document.querySelectorAll(".slider-block").forEach((slider) => {
          checkElementPosition(slider, viewportTop, viewportHeight);
        });
      }
    };
    window.onscroll(true as any);
    window.addEventListener("scroll", (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          window.onscroll(false as any);
        });
        setTicking(true);
      }
    });
  }, []);

  return (
    <>
      <NextSeo
        title={pageProps.title}
        description={pageProps.description}
        openGraph={{
          ...(pageProps.content.seo_image && {
            images: [
              {
                url: pageProps.content.seo_image.sizes["2048x2048"],
                alt: pageProps.content.seo_image.alt,
                width: pageProps.content.seo_image.width,
                height: pageProps.content.seo_image.height,
                type: pageProps.content.mime_type,
              },
            ],
          }),
          title: `${pageProps.title}`,
          description: pageProps.description,
          locale: pageProps.locale === "en" ? "en_US" : "de_DE",
        }}
      />
      {children}

      <CoursePackageDownloadForm
        close={() => context.setIsDownloadOverlayVisible(false)}
        isOpen={context.isDownloadOverlayVisible}
        leadSource={`Compass Course Package`}
        optionalPipeDriveLeadSource={`Download Course Package${getReferral(
          cookies.ref
        )}`}
        fileUrl={coursePackage.url[locale]}
        pipelineId={"61"}
        linkText={coursePackage.label[locale]}
      />

      <div className="image-masks">
        <svg className="svg">
          <clipPath id="image-mask" clipPathUnits="objectBoundingBox">
            <path d="M0.001,0.166 C0,0.16,0.003,0.155,0.007,0.155 L0.994,0.001 C0.998,0.001,1,0.006,1,0.012 L0.91,0.993 C0.91,0.998,0.907,1,0.903,1 L0.072,0.878 C0.069,0.878,0.066,0.875,0.066,0.87 L0.001,0.166"></path>
          </clipPath>
        </svg>
        <svg>
          <defs>
            <clipPath id="card" clipPathUnits="objectBoundingBox">
              <path d="M1,0.154 C1,0.148,1,0.143,0.994,0.142 L0.023,0.003 C0.017,0.002,0.012,0.007,0.012,0.013 L0.004,0.992 C0.004,0.998,0.009,1,0.015,1 L0.938,0.96 C0.943,0.96,0.946,0.956,0.947,0.951 L1,0.154" />
            </clipPath>
          </defs>
        </svg>
        <svg>
          <defs>
            <clipPath id="card-2" clipPathUnits="objectBoundingBox">
              <path d="M1,0.014 C1,0.008,0.997,0.003,0.992,0.003 H0.013 C0.007,0.003,0.002,0.009,0.002,0.015 L0.064,0.994 C0.064,1,0.07,1,0.076,1 L0.994,0.829 C0.999,0.828,1,0.824,1,0.819 V0.014" />
            </clipPath>
          </defs>
        </svg>
        <svg className="svg">
          <clipPath id="image-mask-alt" clipPathUnits="objectBoundingBox">
            <path d="M0.001,0.082 C0,0.076,0.004,0.07,0.008,0.07 L0.993,0.001 C0.998,0,1,0.006,1,0.013 L0.91,0.991 C0.91,0.997,0.906,1,0.902,1 L0.073,0.926 C0.069,0.926,0.066,0.922,0.066,0.916 L0.001,0.082"></path>
          </clipPath>
        </svg>
        <svg className="svg">
          <clipPath id="image-mask-small" clipPathUnits="objectBoundingBox">
            <path d="M0.002,0.148 C0.001,0.138,0.006,0.13,0.013,0.129 L0.987,0.002 C0.995,0.001,1,0.011,1,0.022 L0.914,0.987 C0.913,0.996,0.907,1,0.9,1 L0.076,0.9 C0.07,0.9,0.065,0.893,0.064,0.885 L0.002,0.148"></path>
          </clipPath>
        </svg>
        <svg className="svg">
          <clipPath
            id="image-mask-small-mirror"
            clipPathUnits="objectBoundingBox"
          >
            <path d="M1,0.112 C1,0.102,1,0.093,0.992,0.092 L0.018,0.002 C0.01,0.001,0.003,0.01,0.004,0.021 L0.093,0.986 C0.094,0.996,0.101,1,0.107,1 L0.929,0.889 C0.935,0.888,0.94,0.882,0.94,0.873 L1,0.112"></path>
          </clipPath>
        </svg>
        <svg className="svg">
          <clipPath id="background-mask" clipPathUnits="objectBoundingBox">
            <path d="M1,0.008 C1,0.004,0.998,0,0.994,0 L0.006,0.052 C0.003,0.052,0,0.055,0,0.059 L0.029,0.864 C0.029,0.867,0.031,0.87,0.034,0.87 L0.921,1 C0.925,1,0.928,0.998,0.928,0.994 L1,0.008"></path>
          </clipPath>
        </svg>
        <svg className="svg">
          <clipPath
            id="background-mask-mirror"
            clipPathUnits="objectBoundingBox"
          >
            <path d="M0,0 L1,0.067 L0.944,0.831 L0.047,1 L0,0" />
          </clipPath>
        </svg>
        <svg className="svg">
          <clipPath
            id="background-mask-mobile"
            clipPathUnits="objectBoundingBox"
          >
            <path d="M1,0.009 C1,0.004,0.995,0,0.988,0 L0.011,0.032 C0.005,0.032,0,0.036,0,0.04 L0.042,0.933 C0.042,0.937,0.046,0.94,0.052,0.941 L0.925,1 C0.932,1,0.937,0.997,0.938,0.993 L1,0.009"></path>
          </clipPath>
        </svg>
        <svg className="svg">
          <clipPath
            id="background-mask-mobile-mirror"
            clipPathUnits="objectBoundingBox"
          >
            <path d="M0,0 L1,0.044 L0.946,0.936 L0.045,1 L0,0"></path>
          </clipPath>
        </svg>
      </div>
      <footer className="footer-alt full-width-outer" role="complementary">
        <Link
          href={`https://startsteps.org/${locale === "en" ? "en" : "de"}`}
          target="_blank"
          className="alt-logo"
        ></Link>
        <p>
          Copyright &copy; {new Date().getFullYear()} StartSteps Digital
          Education GmbH. All rights reserved.
        </p>
        <ul className="legal-link-list">
          <li>
            <Link href="/legal/disclaimer">Disclaimer</Link>
          </li>
          <li>
            <Link href="/legal/privacy">Privacy</Link>
          </li>
          <li>
            <Link href="/legal/imprint">Imprint</Link>
          </li>
        </ul>
        <ul className="social-icon-list">
          <li>
            <a
              href="https://www.linkedin.com/company/startsteps/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg
                className="social-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/startsteps_germany/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg
                className="social-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>
          </li>
        </ul>
        <p>
          Built with{" "}
          <span role="img" aria-label="heart">
            💚
          </span>{" "}
          in Berlin
        </p>
      </footer>
    </>
  );
};

const getOrientationCourseLayout: IGetLayout = (page: ReactElement) => {
  return (
    <OrientationCourseLayout pageProps={page.props}>
      {page}
    </OrientationCourseLayout>
  );
};

export { getOrientationCourseLayout };
