module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mulish: ["Mulish"],
        arial: ["Arial"],
        georgia: ["Georgia"],
        gilroy: ["Gilroy"],
        mont: ["Mont"],
        encode: ["EncodeSans"],
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0%" },
          "5%": { opacity: "100%" },
          "28%": { opacity: "100%" },
          "33%": { opacity: "0%" },
          "100%": { opacity: "0%" },
        },
      },
      animation: {
        fade: "fade 6s ease-in-out infinite",
        pulse: "pulse 2s linear infinite",
      },
      colors: {
        purple: {
          700: "#604C9E",
        },
        red: {
          100: "#FFF5F3",
        },
        indigo: {
          50: "#FAF8FE",
          100: "#F6F4FF",
          200: "#EDE7FF",
          300: "#EDE9FF",
          400: "#F3EFFF",
          600: "#6142F5",
          700: "#481BFF",
        },
        orange: {
          600: "#EA632A",
        },
        teal: {
          300: "#00ADEE",
          400: "#00FFE0",
        },
        gray: {
          100: "#F1F1F1",
          700: "#6A6A6A",
        },
        filterYellow: "#EDCA53",
        filterBlue: "#48A0F9",
        filterGreen: "#61BB97",
        filterPink: "#DD0568",
        filterPurple: "#6A217B",
        zalandoMain: "#FF6900",
        zalandoSecondary: "#EFEFF0",
        servicenowMain: "#032D42",
        servicenowSecondary: "#62D84E",
        mediatechMain: "#0000FF",
        mediatechSecondary: "#FF00FF",
        mediatechGray: "#F2F2F2",
        educateMain: "#E1EAF9",
        educateSecondary: "#1F299C",
        educateGray: "#E1EAF9",
        educateAccent: "#30D1FF",
        educateAccent2: "#A3A9F5",
      },
      spacing: {
        "long-container": "calc(100% - 4rem)",
      },
      backgroundImage: {
        dots: "url(/assets/dots.svg)",
      },
      listStyleType: {
        star: "'⭐️'",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
