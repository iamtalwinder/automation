import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import { Browser } from '../../../src/core';
import { LoginPage } from '../../../src/pages/business';
import { AddCampPage, LocationDetailPage, LocationsPage } from '../../../src/pages/business/locations';
import { WebComponent } from '../../../src/web-components';
const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);
const locationName: string = 'Z' + new Date().getTime();

describe('Add Camp', async () => {
  let addCampPage: AddCampPage;
  let locationsPage: LocationsPage;
  let loginPage: LoginPage;
  let browser: Browser;

  before(async () =>{
    browser = new Browser();
    addCampPage = new AddCampPage(browser);
    locationsPage = new LocationsPage(browser);
    loginPage = new LoginPage(browser);
    // await loginPage.signIn();

  });

  after(async () => {
    await browser.close();
  });

  // it('1. Add Camp Successfully', async () => { 
  //   const count: number = await locationsPage.addLocation(locationName);
  //   expect(await locationsPage.getLocationNameByPosition(count)).equal(locationName);
  //   await locationsPage.openLocation();
  //   await addCampPage.addCamp();
  // });

})