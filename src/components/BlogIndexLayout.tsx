import { FC, ReactElement, useState, useEffect, useContext } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { IGetLayout } from "./DefaultLayout";
import { BetterHeader } from "components/BetterHeader";
import FooterAlt from "./FooterAlt";

const BlogIndexLayout: FC<{ pageProps: any }> = ({ children, pageProps }) => {
  const router = useRouter();
  const [ticking, setTicking] = useState(false);
  const [small, setSmall] = useState(false);
  // On scroll stuff
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
          setSmall(true);
          headerElem.classList.add("header--small");
        } else {
          setSmall(false);
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
    <div className="">
      <NextSeo
        title={pageProps.title as string}
        description={pageProps.description}
        openGraph={{
          url: `https://startsteps.org/${
            pageProps.locale === "en" ? "en" : "de"
          }${router.asPath}`,
          title: `${pageProps.title} — StartSteps: Digital Skills & the Jobs of the Future`,
          description: pageProps.description,
          locale: pageProps.locale === "en" ? "en_US" : "de_DE",
        }}
      />
      <BetterHeader small={small} />

      <main className="" role="main">
        {children}
      </main>

      <svg className="absolute pointer-events-none w-0">
        <clipPath id="background-mask" clipPathUnits="objectBoundingBox">
          <path d="M1,0.008 C1,0.004,0.998,0,0.994,0 L0.006,0.052 C0.003,0.052,0,0.055,0,0.059 L0.029,0.864 C0.029,0.867,0.031,0.87,0.034,0.87 L0.921,1 C0.925,1,0.928,0.998,0.928,0.994 L1,0.008"></path>
        </clipPath>
      </svg>

      <svg className="absolute pointer-events-none w-0">
        <clipPath id="background-mask-mirror" clipPathUnits="objectBoundingBox">
          <path d="M0,0 L1,0.067 L0.944,0.831 L0.047,1 L0,0" />
        </clipPath>
      </svg>
      <svg className="absolute pointer-events-none w-0">
        <clipPath id="background-mask-mobile" clipPathUnits="objectBoundingBox">
          <path d="M1,0.009 C1,0.004,0.995,0,0.988,0 L0.011,0.032 C0.005,0.032,0,0.036,0,0.04 L0.042,0.933 C0.042,0.937,0.046,0.94,0.052,0.941 L0.925,1 C0.932,1,0.937,0.997,0.938,0.993 L1,0.009"></path>
        </clipPath>
      </svg>

      <svg className="absolute pointer-events-none w-0">
        <defs>
          <clipPath id="card" clipPathUnits="objectBoundingBox">
            <path d="M1,0.154 C1,0.148,1,0.143,0.994,0.142 L0.023,0.003 C0.017,0.002,0.012,0.007,0.012,0.013 L0.004,0.992 C0.004,0.998,0.009,1,0.015,1 L0.938,0.96 C0.943,0.96,0.946,0.956,0.947,0.951 L1,0.154" />
          </clipPath>
        </defs>
      </svg>
      <svg className="absolute pointer-events-none w-0">
        <clipPath
          id="image-mask-small-mirror"
          clipPathUnits="objectBoundingBox"
        >
          <path d="M1,0.112 C1,0.102,1,0.093,0.992,0.092 L0.018,0.002 C0.01,0.001,0.003,0.01,0.004,0.021 L0.093,0.986 C0.094,0.996,0.101,1,0.107,1 L0.929,0.889 C0.935,0.888,0.94,0.882,0.94,0.873 L1,0.112"></path>
        </clipPath>
      </svg>

      <svg className="absolute pointer-events-none w-0">
        <clipPath id="image-mask-small" clipPathUnits="objectBoundingBox">
          <path d="M0.002,0.148 C0.001,0.138,0.006,0.13,0.013,0.129 L0.987,0.002 C0.995,0.001,1,0.011,1,0.022 L0.914,0.987 C0.913,0.996,0.907,1,0.9,1 L0.076,0.9 C0.07,0.9,0.065,0.893,0.064,0.885 L0.002,0.148"></path>
        </clipPath>
      </svg>

      <FooterAlt />
    </div>
  );
};

const getBlogIndexLayout: IGetLayout = (page: ReactElement) => {
  return <BlogIndexLayout pageProps={page.props}>{page}</BlogIndexLayout>;
};

export { getBlogIndexLayout };
