interface TokenBucket {
  capacity: number;
  tokens: number;
  lastRefill: number;
  refillRate: number;
}

export class RateLimiter {
  private buckets: Map<string, TokenBucket> = new Map();

  public setLimit(providerId: string, rpm: number): void {
    const capacity = rpm;
    const refillRate = rpm / 60000;
    this.buckets.set(providerId, {
      capacity,
      tokens: capacity,
      lastRefill: Date.now(),
      refillRate
    });
  }

  private refill(bucket: TokenBucket): void {
    const now = Date.now();
    const elapsed = now - bucket.lastRefill;
    if (elapsed > 0) {
      const addedTokens = elapsed * bucket.refillRate;
      bucket.tokens = Math.min(bucket.capacity, bucket.tokens + addedTokens);
      bucket.lastRefill = now;
    }
  }

  public canRequest(providerId: string): boolean {
    const bucket = this.buckets.get(providerId);
    if (!bucket) return true;
    
    this.refill(bucket);
    return bucket.tokens >= 1;
  }

  public consume(providerId: string): void {
    const bucket = this.buckets.get(providerId);
    if (!bucket) return;
    
    this.refill(bucket);
    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
    } else {
      throw new Error(`Rate limit exceeded for provider "${providerId}".`);
    }
  }
}
