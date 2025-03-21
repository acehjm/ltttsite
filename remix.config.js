/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    ignoredRouteFiles: ["**/.*"],
    serverModuleFormat: "cjs",
    tailwind: true,
    future: {
        v2_dev: true,
        v2_errorBoundary: true,
        v2_headers: true,
        v2_meta: true,
        v2_normalizeFormMethod: true,
        v2_routeConvention: true,
    },
    // 添加 Vite 配置
    vite: {
        css: {
            postcss: true,
        },
    },
};
