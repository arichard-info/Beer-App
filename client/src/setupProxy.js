const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",
    proxy({
      target: "http://backend:5000",
      changeOrigin: true
    })
  );
};
