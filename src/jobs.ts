import Queue from 'bull';

import { config } from './config';

export const queue = new Queue('named', config.REDIS_HOST);

export const JOBS = {
  SEND_MESSAGE: 'SEND_MESSSAGE',
}

export const jobs = {
  [JOBS.SEND_MESSAGE]: (job: Job<{message: string}>) => {
    const { message } = job.data;

    console.log('send message: ', message);
  },
}
