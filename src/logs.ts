import Logger, * as bunyan from 'bunyan';

const streams: bunyan.Stream[] = [
  {
    level: 'info',
    path: './logs/app.log',
  },
  {
    level: 'error',
    path: './logs/error.log',
  }
]

export const log: Logger = bunyan.createLogger({
  name: 'app',
  streams: streams,
});
