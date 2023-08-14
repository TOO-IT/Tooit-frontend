const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/tooit', // 프록시할 경로를 지정
    createProxyMiddleware({
      target: 'http://localhost:8080', // 프록시 대상 서버 주소
      changeOrigin: true, // Cross-Origin 헤더 설정
    }),
  );
};
