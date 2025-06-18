const ROUTES = [
    {
        url: '/auth',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://auth-service:8001/auth",
            changeOrigin: true,
            pathRewrite: {
                [`^/auth`]: '',
            },
        }
    },
    {
        url: '/reports',
        auth: false,
        creditCheck: false,
        proxy: {
            target: "http://reports-service:8002/reports",
            changeOrigin: true,
            pathRewrite: {
                [`^/reports`]: '',
            },
        }
    }
];

exports.ROUTES = ROUTES;
