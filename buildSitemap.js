const fs = require("fs");
const { SitemapStream, streamToPromise } = require("sitemap");
const fetch = require("node-fetch");

const smStream = new SitemapStream({
  hostname: "https://startsteps.org",
});

const subDomain = "wordpress";
const wpBaseURL = `https://${subDomain}.startsteps.org/wp-json`;

smStream.write({
  url: ``,
  lastmod: "2021-07-19",
  changefreq: "weekly",
  priority: 1.0,
});

smStream.write({
  url: `en/blog`,
  lastmod: "2021-07-19",
  changefreq: "weekly",
  priority: 0.1,
});

smStream.write({
  url: `en/courses/compass-course-digital-skills-jobs`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.6,
  links: [
    {
      lang: "en",
      url: "en/courses/compass-course-digital-skills-jobs",
    },
    {
      lang: "de",
      url: "de/kurse/compass-kurs-digital-skills-jobs",
    },
  ],
});

smStream.write({
  url: `de/kurse/compass-kurs-digital-skills-jobs`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.6,
  links: [
    {
      lang: "en",
      url: "en/courses/compass-course-digital-skills-jobs",
    },
    {
      lang: "de",
      url: "de/kurse/compass-kurs-digital-skills-jobs",
    },
  ],
});

smStream.write({
  url: `de/kurse/tech-mentor`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.6,
  links: [
    {
      lang: "en",
      url: "en/courses/tech-mentor",
    },
    {
      lang: "de",
      url: "de/kurse/tech-mentor",
    },
  ],
});

smStream.write({
  url: `en/courses/tech-mentor`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.6,
  links: [
    {
      lang: "en",
      url: "en/courses/tech-mentor",
    },
    {
      lang: "de",
      url: "de/kurse/tech-mentor",
    },
  ],
});

smStream.write({
  url: `en/bootcamps-we-work-with`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.1,
  links: [
    {
      lang: "en",
      url: "en/bootcamps-we-work-with",
    },
    {
      lang: "de",
      url: "de/bootcamps",
    },
  ],
});

smStream.write({
  url: `de/bootcamps`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.1,
  links: [
    {
      lang: "en",
      url: "en/bootcamps-we-work-with",
    },
    {
      lang: "de",
      url: "de/bootcamps",
    },
  ],
});

smStream.write({
  url: `de/ueber-uns`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.1,
  links: [
    {
      lang: "en",
      url: "en/about-us",
    },
    {
      lang: "de",
      url: "de/ueber-uns",
    },
  ],
});

smStream.write({
  url: `en/about-us`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.2,
  links: [
    {
      lang: "en",
      url: "en/about-us",
    },
    {
      lang: "de",
      url: "de/ueber-uns",
    },
  ],
});

smStream.write({
  url: `en/apply-now`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.3,
  links: [
    {
      lang: "en",
      url: "en/apply-now",
    },
    {
      lang: "de",
      url: "de/los-gehts",
    },
  ],
});

smStream.write({
  url: `de/los-gehts`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.3,
  links: [
    {
      lang: "en",
      url: "en/apply-now",
    },
    {
      lang: "de",
      url: "de/los-gehts",
    },
  ],
});

// Professional Certificates
smStream.write({
  url: `en/professional-certificates`,
  lastmod: "2021-07-19",
  changefreq: "weekly",
  priority: 0.2,
  links: [
    {
      lang: "en",
      url: "en/professional-certificates",
    },
    {
      lang: "de",
      url: "de/professional-certificates",
    },
  ],
});

smStream.write({
  url: `de/professional-certificates`,
  lastmod: "2021-07-19",
  changefreq: "weekly",
  priority: 0.2,
  links: [
    {
      lang: "en",
      url: "en/professional-certificates",
    },
    {
      lang: "de",
      url: "de/professional-certificates",
    },
  ],
});

// Events
smStream.write({
  url: `en/events`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.5,
  links: [
    {
      lang: "en",
      url: "en/events",
    },
    {
      lang: "de",
      url: "de/events",
    },
  ],
});

smStream.write({
  url: `de/events`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.5,
  links: [
    {
      lang: "en",
      url: "en/events",
    },
    {
      lang: "de",
      url: "de/events",
    },
  ],
});

// Why is it free
smStream.write({
  url: `en/why-is-it-free`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.5,
  links: [
    {
      lang: "en",
      url: "en/why-is-it-free",
    },
    {
      lang: "de",
      url: "de/warum-ist-es-kostenlos",
    },
  ],
});

smStream.write({
  url: `de/warum-ist-es-kostenlos`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.5,
  links: [
    {
      lang: "en",
      url: "en/why-is-it-free",
    },
    {
      lang: "de",
      url: "de/warum-ist-es-kostenlos",
    },
  ],
});

// FAQ
smStream.write({
  url: `en/faq`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.5,
  links: [
    {
      lang: "en",
      url: "en/faq",
    },
    {
      lang: "de",
      url: "de/faq",
    },
  ],
});

smStream.write({
  url: `de/faq`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.5,
  links: [
    {
      lang: "en",
      url: "en/faq",
    },
    {
      lang: "de",
      url: "de/faq",
    },
  ],
});

// Contact
smStream.write({
  url: `en/contact`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.5,
  links: [
    {
      lang: "en",
      url: "en/contact",
    },
    {
      lang: "de",
      url: "de/kontakt",
    },
  ],
});

smStream.write({
  url: `de/kontakt`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.5,
  links: [
    {
      lang: "en",
      url: "en/contact",
    },
    {
      lang: "de",
      url: "de/kontakt",
    },
  ],
});

// Privace
smStream.write({
  url: `en/legal/privacy`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.5,
  links: [
    {
      lang: "en",
      url: "en/legal/privacy",
    },
    {
      lang: "de",
      url: "de/legal/privacy",
    },
  ],
});

smStream.write({
  url: `de/legal/privacy`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.5,
  links: [
    {
      lang: "en",
      url: "en/legal/privacy",
    },
    {
      lang: "de",
      url: "de/legal/privacy",
    },
  ],
});

// Career Mentor
smStream.write({
  url: `/en/career-mentor`,
  lastmod: "2024-02-01",
  changefreq: "monthly",
  priority: 0.5,
  links: [
    {
      lang: "en",
      url: "/en/career-mentor",
    },
    {
      lang: "de",
      url: "/de/career-mentor",
    },
  ],
});

smStream.write({
  url: `/de/career-mentor`,
  lastmod: "2024-02-01",
  changefreq: "monthly",
  priority: 0.5,
  links: [
    {
      lang: "en",
      url: "/en/career-mentor",
    },
    {
      lang: "de",
      url: "/de/career-mentor",
    },
  ],
});

// Business
smStream.write({
  url: `/en/business`,
  lastmod: "2024-02-01",
  changefreq: "monthly",
  priority: 0.5,
  links: [
    {
      lang: "en",
      url: "/en/business",
    },
    {
      lang: "de",
      url: "/de/fuer-unternehmen",
    },
  ],
});

smStream.write({
  url: `/de/fuer-unternehmen`,
  lastmod: "2024-02-01",
  changefreq: "monthly",
  priority: 0.5,
  links: [
    {
      lang: "en",
      url: "/en/business",
    },
    {
      lang: "de",
      url: "/de/fuer-unternehmen",
    },
  ],
});

// Orientation Compass
smStream.write({
  url: `/en/orientation-compass`,
  lastmod: "2024-05-05",
  changefreq: "monthly",
  priority: 0.5,
  links: [
    {
      lang: "en",
      url: "/en/orientation-compass",
    },
    {
      lang: "de",
      url: "/de/orientierungskurs",
    },
  ],
});

smStream.write({
  url: `/de/orientierungskurs`,
  lastmod: "2024-05-05",
  changefreq: "monthly",
  priority: 0.5,
  links: [
    {
      lang: "en",
      url: "/en/orientation-compass",
    },
    {
      lang: "de",
      url: "/de/orientierungskurs",
    },
  ],
});

smStream.write({
  url: `en/reskill`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.5,
});

smStream.write({
  url: `en/nextsteps`,
  lastmod: "2022-03-28",
  changefreq: "monthly",
  priority: 0.5,
});

smStream.write({
  url: `en/careers`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.2,
});

smStream.write({
  url: `en/compass-tool`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.5,
});

smStream.write({
  url: `de/arbeitsvermittler`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.5,
});

smStream.write({
  url: `en/legal/disclaimer`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.5,
});

smStream.write({
  url: `en/legal/imprint`,
  lastmod: "2021-07-19",
  changefreq: "monthly",
  priority: 0.5,
});

fetch(`${wpBaseURL}/wp/v2/pages?slug=bootcamps-we-work-with`)
  .then((res) => res.json())
  .then((pageData) =>
    fetch(`${wpBaseURL}/acf/v3/pages/${pageData[0].id}`)
      .then((bootcampsAcf) => bootcampsAcf.json())
      .then((bootcamps) => {
        bootcamps.acf.bootcamps.forEach((bootcamp) => {
          smStream.write({
            url: `en/partner/${bootcamp.post_name}`,
            lastmod: "2021-07-19",
            changefreq: "monthly",
            priority: 0.6,
            links: [
              {
                lang: "en",
                url: `en/partner/${bootcamp.post_name}`,
              },
              {
                lang: "de",
                url: `de/partner/${bootcamp.post_name}`,
              },
            ],
          });
          smStream.write({
            url: `de/partner/${bootcamp.post_name}`,
            lastmod: "2021-07-19",
            changefreq: "monthly",
            priority: 0.6,
            links: [
              {
                lang: "en",
                url: `en/partner/${bootcamp.post_name}`,
              },
              {
                lang: "de",
                url: `de/partner/${bootcamp.post_name}`,
              },
            ],
          });
        });
      })
  )
  .then(() => {
    fetch(`${wpBaseURL}/wp/v2/posts?categories=1&per_page=100&lang=en`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((blogPost) => {
          const alternativeLanguagePageSlug =
            blogPost.acf.alternative_language_page_slug;
          smStream.write({
            url: `en/blog/${blogPost.slug}`,
            lastmod: blogPost.modified,
            changefreq: "monthly",
            priority: 0.8,
            ...(alternativeLanguagePageSlug && {
              links: [
                { lang: "en", url: `en/blog/${blogPost.slug}` },
                { lang: "de", url: `de/blog/${alternativeLanguagePageSlug}` },
              ],
            }),
          });
        });
      })
      .then(() => {
        fetch(`${wpBaseURL}/wp/v2/posts?categories=2&per_page=100&lang=de`)
          .then((response) => response.json())
          .then((data) => {
            data.forEach((blogPost) => {
              const alternativeLanguagePageSlug =
                blogPost.acf.alternative_language_page_slug;
              smStream.write({
                url: `de/blog/${blogPost.slug}`,
                lastmod: blogPost.modified,
                changefreq: "monthly",
                priority: 0.8,
                ...(alternativeLanguagePageSlug && {
                  links: [
                    { lang: "de", url: `de/blog/${blogPost.slug}` },
                    {
                      lang: "en",
                      url: `en/blog/${alternativeLanguagePageSlug}`,
                    },
                  ],
                }),
              });
            });
          })
          .then(() => {
            smStream.end();

            streamToPromise(smStream)
              .then((sm) => sm.toString())
              .then((sitemap) => {
                fs.writeFileSync("public/sitemap.xml", sitemap);
              });
          });
      });
  })
  .catch((error) => {
    reject(error);
  });
