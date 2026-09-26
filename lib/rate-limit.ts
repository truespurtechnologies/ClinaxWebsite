interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

const CLEANUP_INTERVAL = 60000
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup > CLEANUP_INTERVAL) {
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key)
      }
    }
    lastCleanup = now
  }
}

export interface RateLimitConfig {
  interval: number
  uniqueTokenPerInterval: number
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

export function rateLimit(config: RateLimitConfig) {
  const { interval, uniqueTokenPerInterval } = config

  return {
    check: (identifier: string): RateLimitResult => {
      cleanup()

      const now = Date.now()
      const entry = rateLimitStore.get(identifier)

      if (!entry || now > entry.resetTime) {
        const resetTime = now + interval
        rateLimitStore.set(identifier, { count: 1, resetTime })
        return {
          success: true,
          limit: uniqueTokenPerInterval,
          remaining: uniqueTokenPerInterval - 1,
          reset: resetTime,
        }
      }

      if (entry.count >= uniqueTokenPerInterval) {
        return {
          success: false,
          limit: uniqueTokenPerInterval,
          remaining: 0,
          reset: entry.resetTime,
        }
      }

      entry.count++
      return {
        success: true,
        limit: uniqueTokenPerInterval,
        remaining: uniqueTokenPerInterval - entry.count,
        reset: entry.resetTime,
      }
    },
  }
}
