let redis = null;
let isConnected = false;

// Check if we are running in Node.js runtime and Redis is enabled
if (typeof window === 'undefined' && process.env.REDIS_ENABLED !== 'false') {
  try {
    // Use eval('require') to completely bypass Webpack client-side compilation of node-only package
    const Redis = eval('require')('ioredis');

    const redisUrl = process.env.REDIS_URL;
    const config = redisUrl
      ? redisUrl
      : {
          host: process.env.REDIS_HOST || '127.0.0.1',
          port: parseInt(process.env.REDIS_PORT || '6379', 10),
          password: process.env.REDIS_PASSWORD || undefined,
          connectTimeout: 1500, // Timeout after 1.5s so we don't hang server boot or requests
          maxRetriesPerRequest: 1, // Minimize retry delay per failed command
          retryStrategy(times) {
            // Reconnect with backoff to prevent log spam
            return Math.min(times * 5000, 60000);
          },
        };

    redis = new Redis(config);

    redis.on('connect', () => {
      isConnected = true;
      console.log('✅ Redis connection initialized successfully.');
    });

    redis.on('ready', () => {
      isConnected = true;
      console.log('✅ Redis is ready to accept commands.');
    });

    redis.on('error', (err) => {
      isConnected = false;
      // We log as warning instead of throwing to prevent application crash
      console.warn('⚠️ Redis Connection/Error:', err.message);
    });

    redis.on('close', () => {
      isConnected = false;
      console.log('🔌 Redis connection closed.');
    });
  } catch (error) {
    console.error('❌ Failed to initialize Redis client:', error);
  }
}

/**
 * Helper to wrap database or API calls with a Redis-backed caching layer.
 * If Redis is unavailable or fails, it falls back to the original fetch function gracefully.
 *
 * @param {string} key - Cache key
 * @param {Function} fetchFn - Async function returning fresh data on cache miss
 * @param {number} ttlSeconds - Time To Live (expiration) in seconds. Defaults to 300s (5m)
 * @returns {Promise<any>}
 */
export async function getOrSetCache(key, fetchFn, ttlSeconds = 300) {
  // If Redis is not initialized or disconnected, bypass cache entirely
  if (!redis || !isConnected) {
    return await fetchFn();
  }

  try {
    const cachedValue = await redis.get(key);
    if (cachedValue) {
      // Cache Hit - print to terminal so user can see it working
      console.log(`⚡ [Redis Cache HIT] Key: ${key}`);
      return JSON.parse(cachedValue);
    }
  } catch (err) {
    console.warn(`⚠️ Redis get failed for key "${key}", falling back:`, err.message);
  }

  // Cache Miss -> Fetch fresh data
  console.log(`❌ [Redis Cache MISS] Key: ${key}. Fetching fresh data...`);
  const data = await fetchFn();

  // Save to cache asynchronously in background (don't block the request)
  if (data !== undefined && data !== null && redis && isConnected) {
    redis.set(key, JSON.stringify(data), 'EX', ttlSeconds).catch((err) => {
      console.warn(`⚠️ Redis set failed for key "${key}":`, err.message);
    });
  }

  return data;
}
