import { APIProvider, APIRequest, APIResponse } from '../types';
import { APIRegistry } from '../Registry/registry';

export class APIGateway {
  public id = 'api:gateway';
  private registry: APIRegistry;

  constructor(registry: APIRegistry) {
    this.registry = registry;
  }

  public registerProvider(provider: APIProvider): void {
    this.registry.register(provider);
  }

  public getProvider(id: string): APIProvider | null {
    return this.registry.get(id);
  }

  public async request(req: APIRequest): Promise<APIResponse> {
    const provider = this.getProvider(req.providerId);
    if (!provider) {
      return {
        success: false,
        status: 404,
        data: null,
        error: `Provider with ID "${req.providerId}" not found in registry.`
      };
    }

    const url = `${provider.baseUrl.replace(/\/$/, '')}/${req.path.replace(/^\//, '')}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...provider.headers,
      ...req.headers
    };

    if (provider.authType === 'bearer') {
      let token = '';
      if (provider.id === 'groq') {
        token = process.env.GROQ_API_KEY_1 || '';
      } else if (provider.id === 'openai') {
        token = process.env.OPENAI_API_KEY || '';
      }
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    try {
      const response = await fetch(url, {
        method: req.method,
        headers,
        body: req.body ? JSON.stringify(req.body) : undefined
      });

      const data = await response.json().catch(() => null);

      return {
        success: response.ok,
        status: response.status,
        data,
        error: response.ok ? undefined : `HTTP error: ${response.statusText}`
      };
    } catch (error: any) {
      return {
        success: false,
        status: 500,
        data: null,
        error: error.message || 'Unknown network error'
      };
    }
  }
}
