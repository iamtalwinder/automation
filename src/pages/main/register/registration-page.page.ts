import { Browser, find } from '../../../core';
import { AbstractPage } from '../../abstract.page';
import { environment } from '../../../environments';
import { WebComponent } from '../../../web-components';
import { By } from 'selenium-webdriver';
import { env } from 'process';

export class Registration extends AbstractPage {
  @find(By.xpath('//input[@formcontrolname="FirstName"]/ancestor::div[contains(@class, "place-holder-div")]'))
  public FirstNameLabel: WebComponent;
  
  @find(By.css('input[name="FirstName"]'))
  public FirstName: WebComponent;

  @find(By.xpath('//input[@formcontrolname="LastName"]/ancestor::div[contains(@class, "place-holder-div")]'))
  public LastNameLabel: WebComponent;
  
  @find(By.css('input[name="LastName"]'))
  public LastName: WebComponent;

  @find(By.xpath('//input[@formcontrolname="Email"]/ancestor::div[contains(@class, "place-holder-div")]'))
  public EmailLabel: WebComponent;

  @find(By.css('input[name="Email"]'))
  public Email: WebComponent;

  @find(By.xpath('//input[@formcontrolname="Password"]/ancestor::div[contains(@class, "place-holder-div")]'))
  public PasswordLabel: WebComponent;

  @find(By.css('input[name="Password"]'))
  public Password: WebComponent;

  @find(By.xpath('//input[@formcontrolname="ConfirmPassword"]/ancestor::div[contains(@class, "place-holder-div")]'))
  public ConfirmPasswordLabel: WebComponent;

  @find(By.css('input[name="ConfirmPassword"]'))
  public ConfirmPassword: WebComponent;

  @find(By.css('input.login-button'))
  public Register: WebComponent;

  @find(By.xpath('//*[text() = "First name is required."]'))
  public FirstNameRequired: WebComponent;

  @find(By.xpath('//*[text() = "Last name is required."]'))
  public LastNameRequired: WebComponent;

  @find(By.xpath('//*[text() = "Email is required."]'))
  public EmailRequired: WebComponent;

  @find(By.xpath('//*[text() = "Password is required."]'))
  public PasswordRequired: WebComponent;

  @find(By.xpath('//*[text() = "Password is required."]'))
  public ConfirmPasswordRequired: WebComponent;

  @find(By.xpath('//*[text() = "Invalid email"]'))
  public InvalidEmail: WebComponent;

  @find(By.xpath('//*[text() = "The password you"ve entered doesn"t match."]'))
  public PasswordMismatchError: WebComponent;
  
  constructor(browser: Browser) {
    super(browser);

    this.setUrl(environment.mainSiteUrl + '/register' );
  }

  public async register(
    firstname: string = env.NEW_USER_FIRST_NAME,
    lastname: string = env.NEW_USER_LAST_NAME,
    email: string = env.NEW_USER_EMAIL,
    password: string = env.NEW_USER_PASSWORD,
    confirmpassword: string = env.NEW_USER_CONFIRM_PASSWORD,
    checkStaleness: boolean = true,
  ): Promise<void> {
    await this.navigate();

    if (!await this.FirstName.isLocated(30000)) {
      await this.navigate();
    }

    await this.FirstName.sendKeys(firstname);
    await this.LastName.sendKeys(lastname);
    await this.Email.sendKeys(email);
    await this.Password.sendKeys(password);
    await this.ConfirmPassword.sendKeys(confirmpassword);
    if (checkStaleness) {
      await this.Register.clickAndWaitStaleness();
    } else {
      await this.Register.click();
    }
  }
}
