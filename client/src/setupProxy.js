const proxy = require("http-proxy-middleware");
const target = process.env.REACT_APP_PROXY
  ? process.env.REACT_APP_PROXY
  : "http://backend:5000";

module.exports = function(app) {
  if (process.env.NODE_ENV === "development") {
    app.use(
      "/api",
      proxy({
        target,
        changeOrigin: true
      })
    );
  }
};
