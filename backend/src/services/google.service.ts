import { redisClient, redisEnabled } from '../cache/redis';

const CACHE_TTL = 60; // seconds (less volatile than price)

export const getFundamentals = async (
  symbol: string
): Promise<{ peRatio: number | null; earnings: string | null }> => {
  const cacheKey = `google:fundamentals:${symbol}`;

  // 1️⃣ Read from cache (only if Redis is enabled)
  if (redisEnabled && redisClient) {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  }

  /**
   * NOTE:
   * Google Finance does not expose official APIs.
   * For this assignment, we simulate the response
   * and document this limitation clearly.
   */
  const fundamentals = {
    peRatio:
      Math.random() > 0.2
        ? Number((Math.random() * 30).toFixed(2))
        : null,
    earnings: Math.random() > 0.2 ? 'Q3 FY25' : null
  };

  // 2️⃣ Save to cache (only if Redis is enabled)
  if (redisEnabled && redisClient) {
    await redisClient.setEx(
      cacheKey,
      CACHE_TTL,
      JSON.stringify(fundamentals)
    );
  }

  return fundamentals;
};
