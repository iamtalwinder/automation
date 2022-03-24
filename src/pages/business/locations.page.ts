import { Browser, find } from '../../core';
import { AbstractPage } from '../abstract.page';
import { environment } from '../../environments';

export class LocationsPage extends AbstractPage {
  constructor(browser: Browser) {
    super(browser);
    this.setUrl(environment.businessSiteUrl + '/dashboard');
  }
}