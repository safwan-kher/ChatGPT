const getEnvironmentVariable = (environmentVariable) => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't fint environment variable: ${environmentVariable}`
    );
  } else {
    return unvalidatedEnvironmentVariable;
  }
};
// Move rewrites and redirects here
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: "/de/bootcamps-we-work-with",
        destination: "/de/bootcamps",
        permanent: true,
        locale: false,
      },
      {
        source: "/de/jobcenter",
        destination: "/de/arbeitsvermittler",
        permanent: true,
        locale: false,
      },
      {
        source: "/de/service-now",
        destination: "https://careeraccelerator.startsteps.org/de",
        permanent: true,
        locale: false,
      },
      {
        source: "/service-now",
        destination: "https://careeraccelerator.startsteps.org",
        permanent: true,
      },
      {
        source: "/axel-springer-nmt",
        destination: "https://axelspringer-nmt.startsteps.org",
        permanent: true,
      },
      {
        source: "/zalando",
        destination: "https://futurewomen.startsteps.org",
        permanent: true,
      },
      {
        source: "/sap",
        destination: "https://sap.startsteps.org",
        permanent: true,
      },
      {
        source: "/educate2employ",
        destination: "https://educate2employ.startsteps.org",
        permanent: true,
      },
      {
        source: "/de/business",
        destination: "/de/fuer-unternehmen",
        permanent: true,
        locale: false,
      },
      {
        source: "/default",
        destination: "/de",
        permanent: true,
        locale: false,
      },

      {
        source: "/en/jobcenter",
        destination: "/de/arbeitsvermittler",
        permanent: true,
        locale: false,
      },
      {
        source: "/en/arbeitsvermittler",
        destination: "/de/arbeitsvermittler",
        permanent: true,
        locale: false,
      },
      {
        source: "/de/professional-certificates",
        destination: "/de",
        permanent: true,
        locale: false,
      },
      {
        source: "/en/professional-certificates",
        destination: "/en",
        permanent: true,
        locale: false,
      },
      {
        source: "/nextsteps-agenda",
        destination:
          "https://wordpress.startsteps.org/wp-content/uploads/2022/09/Final-Agenda-for-NextSteps-Fall.pdf",
        permanent: true,
      },
      {
        source: "/nextsteps",
        destination:
          "https://app.talentspace.io/landing/fce0c69d-95b7-4a44-953c-8f8201a48ccf",
        permanent: true,
      },
      {
        source: "/next",
        destination: "https://app.talentspace.io/landing/412333302201444114",
        permanent: true,
      },
      { source: "/", destination: "/de", permanent: true, locale: false },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/de/kurse/tech-mentor",
          locale: false,
          destination: "/de/courses/tech-mentor",
        },
        {
          source: "/de/kurse/compass-kurs-digital-skills-jobs",
          locale: false,
          destination: "/de/courses/compass-course-digital-skills-jobs",
        },
        {
          source: "/de/%C3%BCber-uns",
          locale: false,
          destination: "/de/about-us",
        },
        { source: "/de/ueber-uns", locale: false, destination: "/de/about-us" },
        {
          source: "/de/los-gehts",
          locale: false,
          destination: "/de/apply-now",
        },
        {
          source: "/de/warum-ist-es-kostenlos",
          locale: false,
          destination: "/de/why-is-it-free",
        },
        { source: "/de/kontakt", locale: false, destination: "/de/contact" },
        { source: "/de/karriere", locale: false, destination: "/de/careers" },
        {
          source: "/de/bootcamps",
          locale: false,
          destination: "/de/bootcamps-we-work-with",
        },
        {
          source: "/de/fuer-unternehmen",
          locale: false,
          destination: "/de/business",
        },
        {
          source: "/de/orientierungskurs",
          locale: false,
          destination: "/de/orientation-compass",
        },
        {
          source: "/de/kursberatung",
          locale: false,
          destination: "/de/consultation-call",
        },
      ],
    };
  },
  headers: async () => [
    {
      source: "/:path*",
      locale: false,
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        {
          key: "Content-Security-Policy",
          value: "frame-ancestors 'self' startsteps.org *.startsteps.org",
        },
      ],
    },
  ],
  serverRuntimeConfig: {
    pipedriveApiKey: getEnvironmentVariable("PIPEDRIVE_API_KEY"),
  },
  i18n: {
    locales: ["de", "en", "default"],
    defaultLocale: "default",
    localeDetection: false,
  },
  images: {
    domains: ["wordpress.startsteps.org"],
  },
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? process.env.NETLIFY
        ? process.env.CONTEXT === "production"
          ? process.env.URL
          : process.env.DEPLOY_PRIME_URL
        : undefined
      : undefined,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
