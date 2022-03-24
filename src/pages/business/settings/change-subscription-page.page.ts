import { Browser, find } from '../../../core';
import { AbstractPage } from '../../abstract.page';
import { environment } from '../../../environments';

export class ChangeSubscriptionPage extends AbstractPage {
constructor(browser: Browser) {
   super(browser);
   this.setUrl(environment.businessSiteUrl + '/change-subscription');
  }
}