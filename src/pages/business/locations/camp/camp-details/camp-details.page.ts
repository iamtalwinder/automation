import { AbstractPage } from '../../../../abstract.page';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import { By, Key } from 'selenium-webdriver';
import { Browser, find } from '../../../../../../src/core';
import { LoginPage } from '../../../../../../src/pages/business';
import { AddCampPage, LocationDetailPage, LocationsPage } from '../../../../../../src/pages/business/locations';
import { WebComponent } from '../../../../../../src/web-components';
import { environment } from '../../../../../environments';

const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);
export class CampDetailsPage extends AbstractPage {
  
  @find(By.xpath('//*[@id="wrapper"]/div[2]/fuse-content/app-camp-tab/div/div[1]/div[1]/div[2]/div[2]/button'))
  public MenuButton: WebComponent;

  constructor(browser: Browser) {
    super(browser);
    this.setUrl(environment.businessSiteUrl + '/dashboard/locations');
  }

  public async clickOnMenuButton() {
    await this.MenuButton.click();
  }
 
 }
