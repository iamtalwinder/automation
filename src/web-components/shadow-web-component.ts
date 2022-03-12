import { By, WebElement } from 'selenium-webdriver';
import { AbstractWebComponent } from "./abstract-web-component";
import { Browser } from "../core";
import { environment } from "../environments";


export class ShadowWebComponent extends AbstractWebComponent {
  constructor(
    protected browser: Browser,
    public locator: By,
    private shadowRootSelector: string,
    private secondShadowRootSelector: string,
    private extraSelector: string,
  ) {
    super(browser, locator);
  }

  public async getElement(): Promise<WebElement> {
    return this.browser.wait(async () => {
      return (await this.getShadowRoot()).findElement(this.locator).catch(async () => null)
    });
  }

  public async getElements(implicitTimeout: number = 500): Promise<WebElement[]> {
    return await this.browser.wait(async () => {
      const elements: WebElement[] = await (await this.getShadowRoot()).findElements(this.locator).catch(async () => []);

      if (elements.length !== 0) {
        return elements
      }
    }, implicitTimeout) || [];
  }

  public async isLocated(implicitTimeout: number = environment.timeout): Promise<boolean> {
    return (await this.getElements(implicitTimeout)).length !== 0;
  }

  private async getShadowRoot(): Promise<WebElement> {
    return this.browser.wait(async () => {
      if (!this.secondShadowRootSelector) {
        if (!this.extraSelector) {
          return this.driver.executeScript(`return document.querySelector("${this.shadowRootSelector}").shadowRoot`).catch(async () => null);
        } else {
          return this.driver.executeScript(
            `return document.querySelector("${this.shadowRootSelector}").shadowRoot.querySelector("${this.extraSelector}")`).catch(async () => null);
        }
      } else {
        return this.driver.executeScript(`return document.querySelector("${this.shadowRootSelector}").shadowRoot.querySelector("${this.secondShadowRootSelector}").shadowRoot`).catch(async () => null);
      }
    });
  }
}
