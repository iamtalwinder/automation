import { Browser, find } from '../../core';
import { AbstractPage } from '../abstract.page';
import { environment } from '../../environments';
import { WebComponent } from '../../web-components';
import { By } from 'selenium-webdriver';

export class LoginPage extends AbstractPage {
  @find(By.css('form mat-form-field:nth-child(1) input'))
  public Email: WebComponent;

  @find(By.css('form mat-form-field input[type="password"]'))
  public Password: WebComponent;

  @find(By.xpath('//*[text() = "No customer account found"]'))
  public NoCustomerFoundLabel: WebComponent;

  @find(By.css('form button'))
  public Login: WebComponent;

  constructor(browser: Browser) {
    super(browser);
    this.setUrl(environment.businessSiteUrl + '/login');
  }

  public async signIn(
    email: string = environment.defaultUserEmail,
    password: string = environment.defaultUserPass,
    checkStaleness: boolean = true,
  ): Promise<void> {
    await this.navigate();

    if (!await this.Email.isLocated(30000)) {
      await this.navigate();
    }

    await this.Email.sendKeys(email);
    await this.Password.sendKeys(password);
    if (checkStaleness) {
      await this.Login.clickAndWaitStaleness();
    } else {
      await this.Login.click();
    }
  }
}
