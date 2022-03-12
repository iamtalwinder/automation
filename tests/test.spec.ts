import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import { Browser } from '../src/core';
import { LoginPage } from '../src/pages/main';

const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Test', async () => {

  let loginPage: LoginPage;
  let browser: Browser;
  
  before(async () => {
    browser = new Browser();
    loginPage = new LoginPage(browser);
    
  });

  after(async () => {
    await browser.close();
  });

  it('1. Test', async () => {
    await loginPage.signIn();
    expect(true).to.be.true;
  });
});
