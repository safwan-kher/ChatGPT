const NavigationItems = {
  en: [
    {
      label: "Home",
      slug: "",
      hideOnDesktop: true,
    },
    {
      label: "Courses",
      slug: "courses",
      dropdownWide: true,
      dropdownAlignLeft: true,
      children: [
        {
          label: "Compass Course",
          subLabel: "Try all the skills in one month.",
          subSubLabel: "Full-Time",
          slug: "compass-course-digital-skills-jobs",
          image: "compass_small.png",
        },
        {
          label: "Tech: Mentor Course",
          subLabel: "Pick one skill & study with your own trainer.",
          subSubLabel: "Part-Time",
          slug: "tech-mentor",
          image: "rocket.png",
        },
      ],
    },
    {
      label: "Tools",
      slug: "",
      dropdownWide: false,
      dropdownAlignLeft: false,
      children: [
        {
          label: "Bootcamp Finder",
          subLabel:
            "Discover our tech career bootcamp partners, and other educational pathways to jobs in tech.",
          slug: "bootcamps-we-work-with",
          image: "hands.png",
        },
        {
          label: "For Arbeitsvermittler:innen",
          subLabel:
            "🇩🇪 Information for the employment agencies of Jobcenter and Agentur für Arbeit.",
          slug: "arbeitsvermittler",
          fullSlug: {
            locale: "de",
            slug: "/arbeitsvermittler",
          },
          image: "bulb.png",
        },
        {
          label: "Blog Articles",
          subLabel:
            "Unlock the secrets to the jobs of tomorrow and pave the way for your future success with our inspiring StartSteps articles.",
          slug: "blog",
          fullSlug: {
            locale: "en",
            slug: "/blog",
          },
          image: "blog-icon.png",
        },
      ],
    },
    {
      label: "About us",
      slug: "about-us",
    },
    {
      label: "Apply now",
      slug: "apply-now",
      isButton: true,
    },
  ],
  de: [
    {
      label: "Startseite",
      slug: "",
      hideOnDesktop: true,
    },
    {
      label: "Kurse",
      slug: "kurse",
      dropdownWide: true,
      dropdownAlignLeft: true,
      children: [
        {
          label: "Kompass (Digitale Berufe)",
          subLabel:
            "Eine Einführung in Programmierung, Marketing, UX/UI & Data",
          subSubLabel: "Full-Time",
          slug: "compass-kurs-digital-skills-jobs",
          image: "compass_small.png",
        },
        {
          label: "Tech:Mentor (Einzelunterricht)",
          subLabel:
            "Wähle ein Thema & und lerne mit deinem*r eigenen Lehrer*in.",
          subSubLabel: "Teilzeit",
          slug: "tech-mentor",
          image: "rocket.png",
        },
      ],
    },
    {
      label: "Tools",
      slug: "",
      dropdownWide: false,
      dropdownAlignLeft: false,
      children: [
        {
          label: "Bootcamp Finder",
          subLabel:
            "Entdecke unsere Partner Bootcamps im Tech-Bereich, und andere Bildungswege zu einem Job in Tech.",
          slug: "bootcamps",
          image: "hands.png",
        },
        {
          label: "Für Arbeitsvermittler:innen",
          subLabel:
            "Maßnahmenbezogene Infos für Arbeitsvermittler:innen von Jobcenter und Agentur für Arbeit.",
          slug: "arbeitsvermittler",
          image: "bulb.png",
        },
        {
          label: "Blog-Artikel",
          subLabel:
            "Entdecke die Jobs von morgen, verstehe gefragte Kompetenzen, gewinne Inspiration und sichere dir konkrete Tipps für deine Karriere in der Tech-Branche.",
          slug: "blog",
          image: "blog-icon.png",
        },
      ],
    },
    {
      label: "Über uns",
      slug: "ueber-uns",
    },
    {
      label: "Los geht's",
      slug: "los-gehts",
      isButton: true,
    },
  ],
};
export default NavigationItems;
