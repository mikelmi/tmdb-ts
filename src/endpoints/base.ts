import { Api } from '../api';

export class BaseEndpoint {
  protected api: Api;

  constructor(protected readonly accessToken: string) {
    this.api = new Api(accessToken);
  }

  public setApiKey(apiKey: string) {
    this.api.setApiKey(apiKey);
  }

  public setLanguage(language: string) {
    this.api.setLanguage(language);
  }
}
