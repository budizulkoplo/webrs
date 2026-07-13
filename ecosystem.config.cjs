module.exports = {
  apps: [
    {
      name: 'webrs',
      script: '.next/standalone/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        TZ: 'Asia/Jakarta',
      },
    },
  ],
};
