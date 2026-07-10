export interface APIProvider {
  id: string;
  name: string;
  baseUrl: string;
  authType: 'bearer' | 'apikey' | 'oauth';
  headers?: Record<string, string>;
}

export interface APIRequest {
  providerId: string;
  method: string;
  path: string;
  body?: any;
  headers?: Record<string, string>;
}

export interface APIResponse {
  success: boolean;
  status: number;
  data: any;
  error?: string;
}

export interface UsageSummary {
  [providerId: string]: {
    tokens: number;
    costUsd: number;
    requestCount: number;
  };
}
