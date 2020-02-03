const mainColors = {
  black: "#000000",
  white: "#FFFFFF",
  amber: "#FFBF00",
  grey1: "#eeeeee",
  grey2: "#dddddd",
  grey3: "#cccccc",
  grey4: "#bbbbbb",
  grey5: "#9a9a9a",
  grey6: "#727272",
  grey7: "#4D4D4D"
};

const colors = {
  black: mainColors.black,
  white: mainColors.white,
  primary: mainColors.amber,
  text: mainColors.grey7,
  formLabel: mainColors.grey7,
  formPlaceholder: mainColors.grey3,
  formBorder: mainColors.grey2,
  formError: "#fe7c8d",
  linkSecond: mainColors.grey4,
  pageTitle: mainColors.black,
  flashSuccess: "#5cb85c",
  flashDanger: "#fe7c8d",
  flashWarning: "#f0ad4e",
  flashInfo: "#5bc0de"
};

const fw = {
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  black: "900"
};

const fonts = {
  sansSerif: '"Montserrat", sans-serif'
};

const timings = {
  bounce: "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
};

const breakpoints = {
  md: 800,
  lg: 1440
};

const device = {
  gtMobile: `screen and (min-width: ${breakpoints.md})`,
  gtDesktop: `screen and (min-width: ${breakpoints.lg})`
};

export default { colors, fw, fonts, timings, breakpoints, device };
