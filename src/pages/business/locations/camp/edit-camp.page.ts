import { AbstractPage } from '../../../abstract.page';
import { By, Key } from 'selenium-webdriver';
import { Browser, find } from '../../../../core';
import { environment } from '../../../../environments';
import { WebComponent } from '../../../../web-components';

export class EditCampPage extends AbstractPage { 

  @find(By.xpath('//*[text() = "Edit camp"]'))
  public EditCamp: WebComponent;

 
  constructor(browser: Browser) {
    super(browser);
    this.setUrl(environment.businessSiteUrl + '/dashboard/locations');
  }

  public async clickEditCampButton() {
    await this.EditCamp.click();
    await this.browser.sleep(2000);
  }

 

}
