import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import { Registration } from '../../src/pages/main/register';
import { Browser } from '../../src/core';
import { environment } from '../../src/environments';

const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('1 LetsKamp Registration', async () => {
  let register: Registration;
  let browser: Browser;
  
  before(async () => {
    browser = new Browser();
    register = new Registration(browser);
    
  });

  after(async () => {
    await browser.close();
  });

  it('1.1 Open Register Page', async () => {
    await register.navigate();
  });

  it('1.2 Registration Successful', async () => {
    await register.register();
  });

  const goToRegistrationPage: () => Promise<void> = async (): Promise<void> => {
    await register.navigate();
    if (!await register.FirstName.isLocated(50000)) {
      await register.navigate();
    }
  };

  it('1.3 Should highlight required fields when they’re not filled in', async () => {
    await goToRegistrationPage();
    await register.Register.click();
    await browser.wait(async () => await register.FirstNameRequired.isLocated() === true);
    expect(await register.FirstNameRequired.isLocated()).to.be.true;
    await browser.wait(async () => await register.LastNameRequired.isLocated() === true);
    expect(await register.LastNameRequired.isLocated()).to.be.true;
    await browser.wait(async () => await register.EmailRequired.isLocated() === true);
    expect(await register.EmailRequired.isLocated()).to.be.true;
    await browser.wait(async () => await register.PasswordRequired.isLocated() === true);
    expect(await register.PasswordRequired.isLocated()).to.be.true;    
    await browser.wait(async () => await register.ConfirmPasswordRequired.isLocated() === true);
    expect(await register.ConfirmPasswordRequired.isLocated()).to.be.true;    
  });

  it('1.2. Should prompt invalid email when email is not correct', async () => {
    await register.FirstName.waitUntilLocatedAndDisplayed();
    await register.FirstName.sendKeys('test');
    await register.LastName.sendKeys('case');
    await register.Email.sendKeys('123');
    await browser.wait(async () => await register.InvalidEmail.isLocated() === true);
    expect(await register.InvalidEmail.isLocated()).to.be.true;
  });

  it('1.3. Should prompt password does not match when confirm password is not same', async () => {
    await register.FirstName.waitUntilLocatedAndDisplayed();
    await register.FirstName.sendKeys('test');
    await register.LastName.sendKeys('case');
    await register.Email.sendKeys('testcase@gmail.com');
    const password: string = environment.defaultUserPass;
    await register.Password.sendKeys(password);
    await register.ConfirmPassword.sendKeys(password + '1');
    await browser.wait(async () => await register.PasswordMismatchError.isLocated() === true);
    expect(await register.PasswordMismatchError.isLocated()).to.be.true;
  });
});
