import xss from "xss";

const utils = {
  cleanText(text, isHTML = false, stripTags = false, customAllowedTags = []) {
    if (!text) {
      return "";
    }
    let htmlText = text;
    if (!isHTML) {
      htmlText = htmlText.replace(/\n/g, "<br />");
    }
    return xss(htmlText, {
      // escapeHtml(html) {
      //   return "html"
      //   // return html.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace("&#8211;", "–").replace(/P/g, "A")
      // },
      stripIgnoreTag: true,
      // whiteList: {
      //   "p": [],
      //   "h1": [],
      // }
      whiteList: stripTags
        ? {}
        : {
            b: [],
            i: [],
            em: [],
            strong: [],
            a: ["href", "target"],
            br: [],
            ul: [],
            ol: [],
            li: [],
            img: ["alt", "src"],
            p: [],
            span: ["style"],
            h2: [],
            h3: [],
            h4: [],
            figure: [],
            figcaption: [],
            iframe: [
              "src",
              "title",
              "width",
              "height",
              "frameborder",
              "allow",
              "autoplay",
              "clipboard-write",
              "encrypted-media",
              "gyroscope",
              "picture-in-picture",
              "allowfullscreen",
            ],
            // whiteList: stripTags ? [] : ['b', 'i', 'em', 'strong', 'a', 'br', 'ul', 'ol', 'li', 'p', ...customAllowedTags]
          },
    });
    // return sanitizeHtml(htmlText, {
    //   allowedTags: stripTags ? [] : ['b', 'i', 'em', 'strong', 'a', 'br', 'ul', 'ol', 'li', 'p', ...customAllowedTags],
    //   allowedAttributes: {
    //     'a': ['href', 'target'],
    //     'img': ['alt', 'src'],
    //     'span': ['style'],
    //   },
    // });
  },
  formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  },
  formatDateTime(datetime) {
    const d = new Date(datetime * 1000);
    const date = d.toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const time = d.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} - ${time}`;
  },
  landingPageSlugs(footerFilter = false) {
    function landingPageSlug(language, slug, label) {
      this.language = language;
      this.slug = slug;
      this.label = label;
    }
    landingPageSlug.prototype.toString = function () {
      return `/${this.language}/${this.slug}`;
    };

    const slugs = [];

    // EN
    if (!footerFilter) {
      slugs.push(new landingPageSlug("en", "landing-page", "Landing Page"));
      slugs.push(
        new landingPageSlug(
          "en",
          "landing-page-women-in-tech",
          "Landing Page - Women in Tech"
        )
      );
    }
    slugs.push(
      new landingPageSlug(
        "en",
        "jobs-tomorrow-landing-page",
        "Landing Page Ads"
      )
    );
    slugs.push(
      new landingPageSlug(
        "en",
        "syrian-youth-assembly-landing-page",
        "Landing page SYA"
      )
    );
    slugs.push(
      new landingPageSlug(
        "en",
        "landing-page-jobs-4-refugees",
        "Landing page Jobs 4 Refugees"
      )
    );
    slugs.push(
      new landingPageSlug(
        "en",
        "landing-page-one-on-one-introduction-to-web-development",
        "Landing Page - Code Mentor EN"
      )
    );
    slugs.push(
      new landingPageSlug(
        "en",
        "landing-page-tbd-community",
        "Landing Page - tbd.community"
      )
    );
    slugs.push(
      new landingPageSlug(
        "en",
        "landing-page-startsteps-webinar",
        "Landing Page - Webinars"
      )
    );
    slugs.push(
      new landingPageSlug(
        "en",
        "landing-page-mentorme",
        "Landing Page - MentorMe"
      )
    );
    slugs.push(
      new landingPageSlug(
        "en",
        "landing-page-simple-germany",
        "Landing Page Simple Germany"
      )
    );
    slugs.push(
      new landingPageSlug(
        "en",
        "landing-page-arabalmanya",
        "Landing Page Arabalmanya"
      )
    );
    slugs.push(
      new landingPageSlug(
        "en",
        "landing-page-tiktok-stars-of-tomorrow",
        "Landing Page Tiktok Stars of Tomorrow"
      )
    );
    slugs.push(
      new landingPageSlug(
        "en",
        "landing-page-female-founders",
        "Landing Page Female Founders"
      )
    );

    // DE
    if (!footerFilter) {
      slugs.push(new landingPageSlug("de", "landing-page", "Landing page"));
      slugs.push(
        new landingPageSlug(
          "de",
          "landing-page-de-einzelkurs-code-intro-women-in-tech",
          "Landing Page - Women in Tech DE"
        )
      );
    }
    slugs.push(
      new landingPageSlug("de", "landing-page-woloho", "Landing page Woloho")
    );
    slugs.push(
      new landingPageSlug(
        "de",
        "landing-page-tech-berufen-mit-kind",
        "Landing page Tech Beruf mit Kind"
      )
    );
    slugs.push(
      new landingPageSlug(
        "de",
        "landing-page-jobcoaches-germany",
        "Landing Page - Jobcoaches"
      )
    );
    slugs.push(
      new landingPageSlug(
        "de",
        "landing-page-woloho-code-mentor",
        "Landing Page - Woloho Code Mentor DE"
      )
    );
    slugs.push(
      new landingPageSlug("de", "aa-jc-event-upcoming", "AA JC Events")
    );
    slugs.push(
      new landingPageSlug("de", "aa-jc-event-upcoming-2", "AA JC Events")
    );

    return slugs;
  },
  isLandingPage(footerFilter = false, currentUrl) {
    const slugs = [
      ...this.landingPageSlugs(footerFilter).map((slug) => slug.toString()),
      "/en/compass-tool",
      "/en/compass-tool/",
      "/en/compass-tool/results",
      "/en/compass-tool/results/",
    ];
    return slugs.includes(currentUrl);
  },
  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },
};

export default utils;
