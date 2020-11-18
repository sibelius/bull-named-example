import Arena from 'bull-arena';
import Koa from 'koa';
import express from 'koa-express';
import Bull, { Job } from 'bull';
import { config } from './config';
import { jobs, queue } from './jobs';

const app = new Koa();

const setupJobs = () => {
  Object.keys(jobs).map((key) => {
    queue.process(key, 1, jobs[key]);
  });

  queue.on('active', (job: Job) => {
    console.log(`active:${job.name}:${job.id}`);
  });

  queue.on('completed', (job: Job) => {
    console.log(`completed:${job.name}:${job.id}`);
  });

  queue.on('failed', (job: Job, err: Error) => {
    console.log(`failed:${job.name}:${job.id}`, err);
  });
};

const run = async () => {
  setupJobs();

  const arena = Arena(
    {
      Bull,
      queues: [
        {
          name: 'named',
          hostId: 'named',
        },
      ],
    },
    {
      port: config.PORT,
    },
  );

  app.use(express(arena));
}

(async () => {
  await run();
})();
