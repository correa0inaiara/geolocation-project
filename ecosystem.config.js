// PM2 Config File
/* eslint-disable no-undef */
module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'src/server.ts',
      watch: '.',
      node_args: '--harmony',
    },
    {
      name: 'frontend',
      script: './client/src/main.ts',
      watch: ['./client'],
      node_args: '--harmony',
    },
  ],

  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
