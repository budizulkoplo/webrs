module.exports = {
  apps: [
    {
      name: 'webrs',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
        TZ: 'Asia/Jakarta',
      },
    },
  ],
};
