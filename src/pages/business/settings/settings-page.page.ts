import { Browser, find } from '../../../core';
import { AbstractPage } from '../../abstract.page';
import { environment } from '../../../environments';
import { LoginPage } from '..';
import { WebComponent } from '../../../web-components';
import { By } from 'selenium-webdriver';

export class SettingsPage extends AbstractPage {

  @find(By.css('fuse-navbar-vertical fuse-nav-vertical-item:nth-child(2) a'))
  public SettingsMenu: WebComponent;

  @find(By.css('setting-plan-details > div:nth-child(2) > div'))
  public ChangeSubscriptionLink: WebComponent;

  private loginPage: LoginPage;

  constructor(browser: Browser) {
    super(browser);
    this.loginPage = new LoginPage(browser);
    this.setUrl(environment.businessSiteUrl + '/settings');
  }

  public async openSettingsPage(): Promise<void> {
    await this.loginPage.signIn();
    await this.SettingsMenu.click();
  }
}
