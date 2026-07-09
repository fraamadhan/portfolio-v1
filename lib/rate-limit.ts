const rateLimitMap = new Map<string, number[]>();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

export function rateLimit(
  ip: string,
  limit = 5,
  windowMs = 60 * 1000
): RateLimitResult {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter out timestamps older than the window
  const activeTimestamps = timestamps.filter((ts) => now - ts < windowMs);

  if (activeTimestamps.length >= limit) {
    const oldestTimestamp = activeTimestamps[0] || now;
    return {
      success: false,
      remaining: 0,
      reset: oldestTimestamp + windowMs,
    };
  }

  activeTimestamps.push(now);
  rateLimitMap.set(ip, activeTimestamps);

  return {
    success: true,
    remaining: limit - activeTimestamps.length,
    reset: now + windowMs,
  };
}
