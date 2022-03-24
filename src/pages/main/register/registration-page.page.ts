import { Browser, find } from '../../../core';
import { AbstractPage } from '../../abstract.page';
import { environment } from '../../../environments';
import { WebComponent } from '../../../web-components';
import { By } from 'selenium-webdriver';

export class Registration extends AbstractPage {
  @find(By.xpath("//input[@formcontrolname='FirstName']/ancestor::div[contains(@class, 'place-holder-div')]"))
  public FirstNameLabel: WebComponent;
  
  @find(By.css("input[name='firstName']"))
  public FirstName: WebComponent;
  
  @find(By.xpath("//input[@formcontrolname='LastName']/ancestor::div[contains(@class, 'place-holder-div')]"))
  public LastNameLabel: WebComponent;
  
  @find(By.css("input[name='LastName']"))
  public LastName: WebComponent;

  @find(By.xpath("//input[@formcontrolname='Email']/ancestor::div[contains(@class, 'place-holder-div')]"))
  public EmailLabel: WebComponent;

  @find(By.css("input[name='Email']"))
  public Email: WebComponent;

  @find(By.xpath("//input[@formcontrolname='Password']/ancestor::div[contains(@class, 'place-holder-div')]"))
  public PasswordLabel: WebComponent;

  @find(By.css("input[formcontrolname='Password']"))
  public Password: WebComponent;

  @find(By.xpath("//input[@formcontrolname='ConfirmPassword']/ancestor::div[contains(@class, 'place-holder-div')]"))
  public ConfirmPasswordLabel: WebComponent;

  @find(By.css("input[formcontrolname='ConfirmPassword']"))
  public ConfirmPassword: WebComponent;

  @find(By.css("input.login-button"))
  public Register: WebComponent;

  constructor(browser: Browser) {
    super(browser);

    this.setUrl(environment.mainSiteUrl + '/register' );
  }
}