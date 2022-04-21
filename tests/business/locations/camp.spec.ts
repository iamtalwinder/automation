import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import { Browser } from '../../../src/core';
import { LoginPage } from '../../../src/pages/business';
import { WebComponent } from '../../../src/web-components';
import { LocationDetailPage, LocationsPage, AddCampPage, EditCampPage, CampDetailsPage } from '../../../src/pages/business/locations';

const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

const campName: string = 'Z' + new Date().getTime();

describe('Location Camps', async () => {
  let locationsPage: LocationsPage;
  let loginPage: LoginPage;
  let locationDetailPage: LocationDetailPage;
  let addCampPage: AddCampPage;  
  let editCampPage: EditCampPage;
  let campDetailsPage: CampDetailsPage;
  let browser: Browser;
  
  before(async () => {
    browser = new Browser();
    addCampPage = new AddCampPage(browser);
    editCampPage = new EditCampPage(browser);
    locationsPage = new LocationsPage(browser);
    loginPage = new LoginPage(browser);
    locationDetailPage = new LocationDetailPage(browser);
    campDetailsPage = new CampDetailsPage(browser);
    await loginPage.signIn();
  });

  after(async () => {
    await browser.close();
  });

  it('1. Add Camp successfully', async () => {
    await addCampPage.openAddCamp();
    await addCampPage.addCamp(campName, 5, 10);
    const camp: WebComponent = await campDetailsPage.getCampByName(campName);
    expect(await camp.isLocated()).to.be.true;
  });

  it('2. Open a Camp details ', async () => {

    await locationDetailPage.openCampDetails(campName);
    await campDetailsPage.clickOnMenuButton();
  });

  // it('3. Edit Camp', async () => {
  //   const editLocationName: string = 'Mohali' + new Date().getTime(); 

  //   await editCampPage.clickEditCampButton();
  //   await browser.sleep(3000);

  // });

});
