import { Injectable } from '@angular/core';
import { createClient, Entry, Space, ContentfulClientApi } from 'contentful';

// change these to include your own settings
const DEFAULT_CONFIG = {
  credentials: {
    space: 'le74bisjx3ax',
    accessToken: 'iEFI15RW2O6pLzero6cbQdmfcG3nE8r2TJ77z2tKs2g',
  },

  contentTypeIds: {
    product: 'product',
    category: 'category',
    newStoriesImage: 'newStoriesImage',
    video: 'video',
    homeHeroCarousel: 'homeHeroCarousel',
  }
};

@Injectable()
export class ContentfulService {
  cdaClient: ContentfulClientApi;
  config: {
    space: string,
    accessToken: string
  };
  titleHandlers: Function[];

  constructor() {
    try {
      this.config = JSON.parse(localStorage.catalogConfig);
    } catch (e) {
      this.config = DEFAULT_CONFIG.credentials;
    }

    this.titleHandlers = [];
    this._createClient();
    this.getSpace();
  }

  onTitleChange(fn): void {
    this.titleHandlers.push(fn);
  }

  // get the current space
  getSpace(): Promise<Space> {
    return this.cdaClient.getSpace()
      .then(space => {
        this.titleHandlers.forEach(handler => handler(space.name));

        return space;
      });
  }

  // fetch products
  getProducts(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: DEFAULT_CONFIG.contentTypeIds.product,
      order: '-sys.createdAt,sys.id'
    }, query))
    .then(res => res.items);
  }

  // fetch products with a given slug
  // and return one of them
  getProduct(slug: string): Promise<Entry<any>> {
    return this.getProducts({ 'fields.slug': slug })
    .then(items => items[0]);
  }

  // fetch categories
  getCategories(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: DEFAULT_CONFIG.contentTypeIds.category
    }, query))
    .then(res => res.items);
  }

  // fetch categories
  getProductsByCategoryName(name: string): Promise<Entry<any>[]> {
    return this.getProducts({ 'fields.categories.sys.id': name });
  }

  // fetch newStoriesImage
  getNewStoriesImage(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: DEFAULT_CONFIG.contentTypeIds.newStoriesImage,
      order: '-sys.createdAt'
    }, query))
    .then(res => res.items);
  }

  // fetch homeHeroCarousel
  gethomeHeroCarousel(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: DEFAULT_CONFIG.contentTypeIds.homeHeroCarousel,
      order: '-sys.updatedAt'
    }, query))
    .then(res => res.items);
  }

  // return a custom config if available
  getConfig(): { space: string, accessToken: string } {
    return this.config !== DEFAULT_CONFIG.credentials ?
      Object.assign({}, this.config) :
      { space: '', accessToken: '' };
  }

  // set a new config and store it in localStorage
  setConfig(config: {space: string, accessToken: string}) {
    localStorage.setItem('catalogConfig', JSON.stringify(config));
    this.config = config;

    this._createClient();
    this.getSpace();

    return Object.assign({}, this.config);
  }

  // set config back to default values
  resetConfig() {
    localStorage.removeItem('catalogConfig');
    this.config = DEFAULT_CONFIG.credentials;

    this._createClient();
    this.getSpace();

    return Object.assign({}, this.config);
  }

  _createClient() {
    this.cdaClient = createClient({
      space: this.config.space,
      accessToken: this.config.accessToken
    });
  }
}
