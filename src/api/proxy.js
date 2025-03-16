const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  const proxy = createProxyMiddleware({
    target: "https://stem-api.istad.co",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/api", // Keep the "/api" prefix intact
    },
    onProxyReq: (proxyReq, req) => {
    
      if (req.headers.authorization) {
        proxyReq.setHeader("Authorization", req.headers.authorization);
      }
    },
  });

  proxy(req, res);
};