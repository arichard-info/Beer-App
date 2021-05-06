const showDataNrt =
  process.env.CONTEXT === "test" || process.env.NODE_ENV === "development";

module.exports = {
  presets: ["react-app"],
  plugins: [
    !showDataNrt && ["react-remove-properties", { properties: ["data-nrt"] }],
  ].filter(Boolean),
};
