import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import { Registration } from '../../src/pages/main/register';
import { Browser } from '../../src/core';

const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('LetsKamp', async () => {
  let register: Registration;
  let browser: Browser;
  
  before(async () => {
    browser = new Browser();
    register = new Registration(browser);
    
  });

  after(async () => {
    await browser.close();
  });

  it('1. Open Register Page', async () => {
    await register.navigate();
  })
});
