import { createClient } from 'redis';

export const redisEnabled = !!process.env.REDIS_URL;

export const redisClient = redisEnabled
  ? createClient({
      url: process.env.REDIS_URL
    })
  : null;

if (redisEnabled && redisClient) {
  redisClient.on('error', (err) => {
    console.warn('Redis error:', err.message);
  });

  redisClient
    .connect()
    .then(() => console.log('Redis connected'))
    .catch(() =>
      console.warn('Redis connection failed, continuing without cache')
    );
} else {
  console.log('Redis URL not provided. Running without cache.');
}
