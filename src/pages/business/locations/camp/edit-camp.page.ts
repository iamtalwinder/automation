import { AbstractPage } from '../../../abstract.page';
import { By, Key } from 'selenium-webdriver';
import { Browser, find } from '../../../../core';
import { environment } from '../../../../environments';
import { WebComponent } from '../../../../web-components';
import { AddCampPage } from '.';

export class EditCampPage extends AbstractPage { 

  @find(By.xpath('//*[text() = "Edit camp"]'))
  public EditCamp: WebComponent;

  constructor(browser: Browser) {
    super(browser);
    this.setUrl(environment.businessSiteUrl + '/dashboard/locations');
  }

  private clearInputFields = AddCampPage;

  public async clickEditCampButton(): Promise<void> {
    await this.EditCamp.click();
  
    await this.browser.sleep(2000);
  }

 
  public async editCamp(editCampName: string, editCategoryName: string,
    editMinimumAge: number, editMaximumAge: number, editDescription: string,  ): Promise<void> {
 
  }

 

}
