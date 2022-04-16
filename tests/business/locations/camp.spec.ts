import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import { Browser } from '../../../src/core';
import { LoginPage } from '../../../src/pages/business';
import { LocationDetailPage, LocationsPage, AddCampPage } from '../../../src/pages/business/locations';

const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Location Camps', async () => {
  let locationsPage: LocationsPage;
  let loginPage: LoginPage;
  let locationDetailPage: LocationDetailPage;
  let addCampPage: AddCampPage;  
  let browser: Browser;
  
  before(async () => {
    browser = new Browser();
    addCampPage = new AddCampPage(browser);
    locationsPage = new LocationsPage(browser);
    loginPage = new LoginPage(browser);
    locationDetailPage = new LocationDetailPage(browser);
    await loginPage.signIn();
  });

  after(async () => {
    await browser.close();
  });

  it.only('3. Add Camp', async () => {
    await addCampPage.openAddCamp();
    await addCampPage.addCamp('test', 5, 10);
    await browser.sleep(3000);
  });
});
