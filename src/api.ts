import fetch from 'cross-fetch';
import { parseOptions } from './utils';
import { ErrorResponse } from './types';
import { BASE_URL_V3 } from './common/constants';

export class Api {
  private headers: Headers;
  private defaultParams: URLSearchParams = new URLSearchParams();

  constructor(accessToken: string) {
    this.headers = new Headers();
    this.headers.set('Content-Type', 'application/json;charset=utf-8');
    this.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  public setApiKey(apiKey: string) {
    this.headers.delete('Authorization');
    this.defaultParams.set('api_key', apiKey);
  }

  public setLanguage(language: string) {
    this.defaultParams.set('language', language);
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  async get<T>(path: string, options?: Record<string, any>): Promise<T> {
    const params = parseOptions({ ...this.defaultParams, ...options });
    const response = await fetch(`${BASE_URL_V3}${path}?${params}`, {
      method: 'GET',
      headers: this.headers,
    });

    if (!response.ok) {
      return Promise.reject((await response.json()) as ErrorResponse);
    }

    return (await response.json()) as T;
  }
}
