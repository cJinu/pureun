/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "amber-overlay": "rgba(255, 253, 247, 1)", // Amber-50에 흰색 투명도 60%를 적용한 색상
        "amber-cloudy": "rgba(203, 194, 159, 1)", // Amber-100에 검은색 투명도 20%를 적용한 색상
      },
      width: {
        "auto-important": "auto!important",
      },
      maxWidth: {
        "page": "26rem",
      },
      fontFamily: {
        katuri: ["Katuri", "Pretendard Variable"],
        KCCMurukmuruk: ["KCCMurukmuruk", "Pretendard Variable"],
      },
      fontSize: {
        title: [
          "1.875rem",
          {
            lineHeight: "2.25rem",
            fontWeight: "700",
          },
        ],
        section: [
          "1.125rem",
          {
            lineHeight: "1.75em",
            fontWeight: "600",
          },
        ],
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
