import { APIProvider } from '../types';

export class APIRegistry {
  private providers: Map<string, APIProvider> = new Map();

  public register(p: APIProvider): void {
    this.providers.set(p.id, p);
  }

  public get(id: string): APIProvider | null {
    return this.providers.get(id) || null;
  }

  public list(): APIProvider[] {
    return Array.from(this.providers.values());
  }
}
