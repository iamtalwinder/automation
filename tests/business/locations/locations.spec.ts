import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import { Browser } from '../../../src/core';
import { LoginPage } from '../../../src/pages/business';
import { LocationsPage } from '../../../src/pages/business/locations';
const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);
const locationName: string = 'Z' + new Date().getTime();

describe('Business Locations', async () => {
  let locationsPage: LocationsPage;
  let loginPage: LoginPage;
  let browser: Browser;
  
  before(async () => {
    browser = new Browser();
    locationsPage = new LocationsPage(browser);
    loginPage = new LoginPage(browser);
    
    await loginPage.signIn();
  });

  after(async () => {
    await browser.close();
  });

  it('1. Add Locations Successfully', async () => { 
    const count: number = await locationsPage.addLocation(locationName);
    expect(await locationsPage.getLocationNameByPosition(count)).equal(locationName);

  });

  // it('1.1 Should highlight required fields when they’re not filled in', async () => {
  //   await locationsPage.addLocation();
  //   await browser.wait(async () => await locationsPage.LocationNameRequired.isLocated() === true);
  //   expect(await locationsPage.LocationNameRequired.isLocated()).to.be.true;
  //   await browser.wait(async () => await locationsPage.AddressNameRequired.isLocated() === true);
  //   expect(await locationsPage.AddressNameRequired.isLocated()).to.be.true;
  //   await browser.wait(async () => await locationsPage.CityNameRequired.isLocated() === true);
  //   expect(await locationsPage.CityNameRequired.isLocated()).to.be.true;
  //   await browser.wait(async () => await locationsPage.ZipRequired.isLocated() === true);
  //   expect(await locationsPage.ZipRequired.isLocated()).to.be.true;    
  //   await browser.wait(async () => await locationsPage.PhoneNumberRequired.isLocated() === true);
  //   expect(await locationsPage.PhoneNumberRequired.isLocated()).to.be.true;    
  //   await locationsPage.AddStage.click();

  // });
});
