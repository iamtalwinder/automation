import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import { Browser } from '../../../src/core';
import { SettingsPage } from '../../../src/pages/business/settings';
import { ChangeSubscriptionPage } from '../../../src/pages/business/settings';

const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Business Settings', async () => {

  let settingsPage: SettingsPage;
  let changeSubscriptionPage: ChangeSubscriptionPage;
  let browser: Browser;
  
  before(async () => {
    browser = new Browser();
    settingsPage = new SettingsPage(browser);
    changeSubscriptionPage = new ChangeSubscriptionPage(browser);
    
  });

  after(async () => {
    await browser.close();
  });

  it("1. Navigate to change subscripiton", async () =>{
    await settingsPage.openSettingsPage();
    // await settingsPage.ChangeSubscriptionLink.clickAndWaitStaleness();
    // const currentUrl =  await browser.getCurrentUrl();
    // const changeSubscriptionUrl = await changeSubscriptionPage.getPageUrl()
    // expect(currentUrl).to.equals(changeSubscriptionUrl);
  });

});
