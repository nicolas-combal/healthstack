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
            target: "http://localhost:8001/auth",
            changeOrigin: true,
            pathRewrite: {
                [`^/auth`]: '',
            },
        }
    },
    {
        url: '/reports',
        auth: true,
        creditCheck: true,
        proxy: {
            target: "http://localhost:8002/reports",
            changeOrigin: true,
            pathRewrite: {
                [`^/reports`]: '',
            },
        }
    }
];

exports.ROUTES = ROUTES;