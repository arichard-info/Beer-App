const mainColors = {
  black: "#000000",
  white: "#FFFFFF",
  amber: "#FFBF00",
  pastelAmber: "#FFEBBC",
  grey1: "#eeeeee",
  grey2: "#dddddd",
  grey3: "#cccccc",
  grey4: "#bbbbbb",
  grey5: "#9a9a9a",
  grey6: "#727272",
  grey7: "#4D4D4D",
  grey9: "#222222"
};

const levelShades = [
  mainColors.pastelAmber,
  "#FFD65C",
  mainColors.amber,
  "#FFA41D",
  "#F77F5A",
  "#F75A5A",
  "#D32626",
  "#731E1E"
];

const colors = {
  ...mainColors,
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
  flashInfo: "#5bc0de",
  levelShades
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
  sm: 500,
  md: 800,
  lg: 1440
};

const device = {
  gtMobileSm: `screen and (min-width: ${breakpoints.sm}px)`,
  gtMobile: `screen and (min-width: ${breakpoints.md}px)`,
  gtDesktop: `screen and (min-width: ${breakpoints.lg}px)`
};

export default { colors, fw, fonts, timings, breakpoints, device };
