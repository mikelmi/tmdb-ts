import {
  AccountEndpoint,
  CertificationEndpoint,
  ChangeEndpoint,
  CreditsEndpoint,
  GenreEndpoint,
  MoviesEndpoint,
  SearchEndpoint,
  TvShowsEndpoint,
  ConfigurationEndpoint,
  DiscoverEndpoint,
  PeopleEndpoint,
  ReviewEndpoint,
  TrendingEndpoint,
  FindEndpoint,
  KeywordsEndpoint,
  CollectionsEndpoint,
  TvSeasonsEndpoint,
  TvEpisodesEndpoint,
  WatchProvidersEndpoint,
} from './endpoints';
import { BaseEndpoint } from './endpoints/base';
import { CompaniesEndpoint } from './endpoints/companies';
import { NetworksEndpoint } from './endpoints/networks';

export class TMDB {
  private accessToken: string;
  private _endpoints = new Map<string, BaseEndpoint>();

  constructor(
    accessToken: string,
    private apiKeyAsParam = false,
    private defaultLanguage: string | undefined = undefined
  ) {
    this.accessToken = accessToken;
  }

  public setApiKey(apiKey: string) {
    this.apiKeyAsParam = true;
    this.accessToken = apiKey;
    this._endpoints.clear();
  }

  public setLanguage(language: string) {
    this.defaultLanguage = language;
    this._endpoints.clear();
  }

  private getEndpoint<T extends BaseEndpoint>(
    key: string,
    EndpointClass: typeof BaseEndpoint
  ): T {
    if (!this._endpoints.has(key)) {
      const endpoint = new EndpointClass(this.accessToken);

      if (this.apiKeyAsParam) {
        endpoint.setApiKey(this.accessToken);
      }

      if (this.defaultLanguage) {
        endpoint.setLanguage(this.defaultLanguage);
      }

      this._endpoints.set(key, endpoint);
    }

    return this._endpoints.get(key) as T;
  }

  get account(): AccountEndpoint {
    return this.getEndpoint<AccountEndpoint>('account', AccountEndpoint);
  }

  get configuration(): ConfigurationEndpoint {
    return this.getEndpoint<ConfigurationEndpoint>(
      'configuration',
      ConfigurationEndpoint
    );
  }

  get certifications(): CertificationEndpoint {
    return this.getEndpoint<CertificationEndpoint>(
      'certifications',
      CertificationEndpoint
    );
  }

  get changes(): ChangeEndpoint {
    return this.getEndpoint<ChangeEndpoint>('changes', ChangeEndpoint);
  }

  get credits(): CreditsEndpoint {
    return this.getEndpoint<CreditsEndpoint>('credits', CreditsEndpoint);
  }

  get companies(): CompaniesEndpoint {
    return this.getEndpoint<CompaniesEndpoint>('companies', CompaniesEndpoint);
  }

  get networks(): NetworksEndpoint {
    return this.getEndpoint<NetworksEndpoint>('networks', NetworksEndpoint);
  }

  get search(): SearchEndpoint {
    return this.getEndpoint<SearchEndpoint>('search', SearchEndpoint);
  }

  get genres(): GenreEndpoint {
    return this.getEndpoint<GenreEndpoint>('genres', GenreEndpoint);
  }

  get movies(): MoviesEndpoint {
    return this.getEndpoint<MoviesEndpoint>('movies', MoviesEndpoint);
  }

  get tvShows(): TvShowsEndpoint {
    return this.getEndpoint<TvShowsEndpoint>('tvShows', TvShowsEndpoint);
  }

  get tvEpisode(): TvEpisodesEndpoint {
    return this.getEndpoint<TvEpisodesEndpoint>(
      'tvEpisode',
      TvEpisodesEndpoint
    );
  }

  get discover(): DiscoverEndpoint {
    return this.getEndpoint<DiscoverEndpoint>('discover', DiscoverEndpoint);
  }

  get people(): PeopleEndpoint {
    return this.getEndpoint<PeopleEndpoint>('people', PeopleEndpoint);
  }

  get review(): ReviewEndpoint {
    return this.getEndpoint<ReviewEndpoint>('review', ReviewEndpoint);
  }

  get trending(): TrendingEndpoint {
    return this.getEndpoint<TrendingEndpoint>('trending', TrendingEndpoint);
  }

  get find(): FindEndpoint {
    return this.getEndpoint<FindEndpoint>('find', FindEndpoint);
  }

  get keywords(): KeywordsEndpoint {
    return this.getEndpoint<KeywordsEndpoint>('keywords', KeywordsEndpoint);
  }

  get collections(): CollectionsEndpoint {
    return this.getEndpoint<CollectionsEndpoint>(
      'collections',
      CollectionsEndpoint
    );
  }

  get tvSeasons(): TvSeasonsEndpoint {
    return this.getEndpoint<TvSeasonsEndpoint>('tvSeasons', TvSeasonsEndpoint);
  }

  get watchProviders(): WatchProvidersEndpoint {
    return this.getEndpoint<WatchProvidersEndpoint>(
      'watchProviders',
      WatchProvidersEndpoint
    );
  }
}
