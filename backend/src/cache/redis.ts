import { createClient } from 'redis';

let redisClient: ReturnType<typeof createClient> | null = null;

export async function connectRedis() {
  try {
    const redisUrl = process.env.REDIS_URL;

    if (!redisUrl) {
      console.warn('⚠️ Redis URL not provided. Running without cache.');
      return null;
    }

    redisClient = createClient({ url: redisUrl });

    redisClient.on('error', err => {
      console.error('Redis error:', err.message);
    });

    await redisClient.connect();
    console.log('✅ Redis connected');
    return redisClient;
  } catch (err) {
    console.warn('⚠️ Redis unavailable. Continuing without cache.');
    return null;
  }
}

export function getRedisClient() {
  return redisClient;
}
