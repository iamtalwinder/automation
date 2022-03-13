import { By, until, WebElement } from 'selenium-webdriver';
import { AbstractWebComponent } from './abstract-web-component';
import { environment } from '../environments';

export class WebComponent extends AbstractWebComponent {

  public async getElement(): Promise<WebElement> {
    return this.browser.wait(until.elementLocated(this.locator));
  }

  public async getElements(implicitTimeout: number = 500): Promise<WebElement[]> {
    return await this.browser.wait(until.elementsLocated(this.locator), implicitTimeout) || [];
  }

  public async isLocated(implicitTimeout: number = environment.timeout): Promise<boolean> {
    return !!await this.browser.wait(until.elementLocated(this.locator), implicitTimeout);
  }
}
