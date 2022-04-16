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
const locationName: string = 'Z' + new Date().getTime();



describe('Business Locations', async () => {
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

  it('1. Add Locations Successfully', async () => { 
    const count: number = await locationsPage.addLocation(locationName);
    expect(await locationsPage.getLocationNameByPosition(count)).equal(locationName);

  });
  
  it('2. Click on Edit Location Button and Edit Location' , async () => {
    const editLocationName: string = 'Haryana-camp' + new Date().getTime();
    const editAddressName: string = '100 N University St, Normal, IL 61761, USA';
    const editphoneNumber: string = new Date().getTime().toString();
    
    await locationsPage.openLocation();
    await locationDetailPage.openMenuButton();
    await locationDetailPage.clickEditLocationButton();
    await locationsPage.clearFields();
    await locationsPage.editLocation(editLocationName, editAddressName, editphoneNumber);

    expect(await locationDetailPage.LocationName.getText()).to.equal(editLocationName);
    //  expect(await locationDetailPage.AddressName.getText()).to.equal(editAddressName);
    //  expect(await locationDetailPage.PhoneNumber.getText()).to.equal(editphoneNumber);
  });

  it('3. Archive location', async () => {
    await locationsPage.openLocation();
    await locationDetailPage.openMenuButton();
    await locationDetailPage.archiveLocation();
    await locationDetailPage.clickArchiveLocationButton();
    await browser.sleep(3000);
  });

  
  // it('4. Add Camp Successfully', async () => { 
  //   // const count: number = await locationsPage.addLocation(locationName);
  //   // expect(await locationsPage.getLocationNameByPosition(count)).equal(locationName);
  //   // await locationsPage.openLocation();
  //   await locationsPage.openLocation();
  //   await addCampPage.addCamp();
  // });


  // it('1.1 Should highlight required fields when they’re not filled in', async () => {
  //   await locationsPage.openLocationDialogBox();
  //   await locationsPage.LocationNameInput.click();
  //   await browser.wait(async () => await locationsPage.LocationNameErrorRequired.isLocated() === true);
  //   expect(await locationsPage.LocationNameErrorRequired.isLocated()).to.be.true;
  //   await locationsPage.Address.click();
  //   await browser.wait(async () => await locationsPage.AddressNameErrorRequired.isLocated() === true);
  //   expect(await locationsPage.AddressNameErrorRequired.isLocated()).to.be.true;
  //   await locationsPage.City.click();
  //   await browser.wait(async () => await locationsPage.CityNameErrorRequired.isLocated() === true);
  //   expect(await locationsPage.CityNameErrorRequired.isLocated()).to.be.true;
  //   await locationsPage.Zip.click();
  //   await browser.wait(async () => await locationsPage.ZipErrorRequired.isLocated() === true);
  //   expect(await locationsPage.ZipErrorRequired.isLocated()).to.be.true;  
  //   await locationsPage.PhoneNumber.click();
  //   await browser.wait(async () => await locationsPage.PhoneNumberErrorRequired.isLocated() === true);
  //   expect(await locationsPage.PhoneNumberErrorRequired.isLocated()).to.be.true;    

  // });
});
