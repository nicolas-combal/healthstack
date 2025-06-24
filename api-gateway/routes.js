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
            target: "http://auth-service:8001",
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
            target: "http://reports-service:8002",
            changeOrigin: true,
            pathRewrite: {
                [`^/reports`]: '',
            },
        }
    },
    {
        url: '/pgadmin',
        auth: false,
        creditCheck: false,
        proxy: {
            target: "http://pgadmin:80",
            changeOrigin: true,
            pathRewrite: {
                '^/pgadmin(.*)': '$1'
            },
            headers: {
                'X-Script-Name': '/pgadmin'
            }
        }
    }
];

exports.ROUTES = ROUTES;
