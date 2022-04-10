import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import { Browser } from '../../src/core';
import { LoginPage } from '../../src/pages/business';
import { LocationsPage } from '../../src/pages/business/locations';

const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Business Login', async () => {

  let loginPage: LoginPage;
  let locationPage: LocationsPage;
  let browser: Browser;
  
  before(async () => {
    browser = new Browser();
    loginPage = new LoginPage(browser);
    locationPage = new LocationsPage(browser);
    
  });

  after(async () => {
    await browser.close();
  });

  it('1. Login Unsuccessful -- Wrong email or password', async () => {
    await loginPage.signIn('wrong@gmail.com', '1233987', false);
    expect(await loginPage.NoCustomerFoundLabel.isLocated()).to.be.true;
  });

  it('2. Business Login Success', async () => {
    await loginPage.signIn();
    const loginUrl: string =  await browser.getCurrentUrl();
    const locationspageUrl: string = locationPage.getPageUrl();
    expect(loginUrl).to.equals(locationspageUrl);
  });
});
