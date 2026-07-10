import { UsageSummary } from '../types';

export class CostTracker {
  private usage: UsageSummary = {};

  public record(providerId: string, tokens: number, costUsd: number): void {
    if (!this.usage[providerId]) {
      this.usage[providerId] = {
        tokens: 0,
        costUsd: 0,
        requestCount: 0
      };
    }
    
    this.usage[providerId].tokens += tokens;
    this.usage[providerId].costUsd += costUsd;
    this.usage[providerId].requestCount += 1;
  }

  public getUsage(providerId?: string): UsageSummary {
    if (providerId) {
      const summary = this.usage[providerId];
      return summary ? { [providerId]: summary } : {};
    }
    return { ...this.usage };
  }
}
