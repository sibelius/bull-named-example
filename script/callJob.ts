import { queue, JOBS } from '../src/jobs';

(async () => {
  try {
    const job = await queue.add(JOBS.SEND_MESSAGE, {
      message: 'name bull job',
    });

    // eslint-disable-next-line
    console.log({
      job,
    });
  } catch (err) {
    console.log('err: ', err);
  }

  process.exit(0);
})();
