const { createProxyMiddleware } = require('http-proxy-middleware');

const setupProxies = (app, routes) => {
  routes.forEach(r => {
    app.use(r.url, createProxyMiddleware({
      ...r.proxy,
      onProxyReq: (proxyReq, req, res) => {
        if (req.headers.cookie) {
          proxyReq.setHeader('Cookie', req.headers.cookie);
        }
      },
      onProxyRes: (proxyRes, req, res) => {
        const cookies = proxyRes.headers['set-cookie'];
        if (cookies) {
          res.append('Set-Cookie', cookies);
        }
      },
      onError: (err, req, res) => {
        res.status(503).json({
          error: {
            code: 'SERVICE_UNAVAILABLE',
            message: `Service indisponible : ${r.url}`,
            status: 503
          }
        });
      }
    }));
  });
};

exports.setupProxies = setupProxies;