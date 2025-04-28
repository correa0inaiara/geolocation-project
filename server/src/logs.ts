import * as bunyan from 'bunyan';

export const log = bunyan.createLogger({
  name: 'app',
  streams: [
    {
      level: 'info',
      stream: process.stdout,
    },
    {
      level: 'info',
      path: './logs/app.log',
    },
    {
      level: 'error',
      path: './logs/error.log',
    },
  ],
});
