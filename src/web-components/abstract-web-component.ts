import { By, IRectangle, Origin, ThenableWebDriver, until, WebElement, ILocation } from 'selenium-webdriver';
import { WebComponentInterface } from './web-component.interface';
import { Browser } from '../core';
import * as chalk from 'chalk';
import { IDirection, Key, Button } from 'selenium-webdriver/lib/input';
import { environment, attributes } from '../environments';
import { Logger } from '../services';

export abstract class AbstractWebComponent implements WebComponentInterface {
  protected driver: ThenableWebDriver;

  constructor(
    protected browser: Browser,
    public locator: By,
  ) {
    this.driver = browser.getDriver();
    /** No need to maximize, yet */
    // this.driver.manage().window().maximize();
  }

  public async click(): Promise<void> {
    return this.execute('CLICK', async (element: WebElement) => {
      await this.browser.wait(async () => element.isDisplayed());

      return element.click();
    },                  async (element: WebElement) => {
      return this.driver.executeScript('arguments[0].click();', element);
    });
  }

  public async getSelectedOption(): Promise<string> {
    return this.execute('GET SELECTED', async (element: WebElement) => {
      await this.browser.wait(async () => element.isDisplayed());

      return this.driver.executeScript('return arguments[0].selectedOptions[0].innerText;', element);
    });
  }

  public async clickInsideIframe(): Promise<void> {
    return this.execute('CLICK INSIDE IFRAME', async (element: WebElement) => {
      return this.driver.executeScript('arguments[0].click();', element);
    });
  }

  public async appendButton(id: string = 'actionBtn'): Promise<void> {
    return this.execute('APPEND ACTION BUTTON', async (element: WebElement) => {
      return this.driver.executeScript(`var button = document.createElement("BUTTON");button.id ="${id}";arguments[0].appendChild(button)`, element);
    });
  }

  public async removeButton(id: string = 'actionBtn'): Promise<void> {
    return this.execute('REMOVE ACTION BUTTON', async (element: WebElement) => {
      return this.driver.executeScript(`var button = arguments[0].querySelector("#${id}");arguments[0].removeChild(button)`, element);
    });
  }

  public async clickAndWaitStaleness(waitTime: number = 3000): Promise<void> {
    return this.execute('CLICK AND WAIT STALENESS', async (element: WebElement) => {
      await this.browser.wait(async () => element.isDisplayed());
      await element.click();
      await this.browser.wait(until.stalenessOf(element), waitTime);
    },                  async (element: WebElement) => {
      await this.browser.wait(async () => element.isDisplayed());
      await this.driver.executeScript('arguments[0].click();', element);
      await this.browser.wait(until.stalenessOf(element), waitTime);
    });
  }

  public async clickOfStaleness(waitTime: number = 3000): Promise<void> {
    return this.execute('CLICK OF STALENESS', async (element: WebElement) => {
      await this.browser.wait(until.stalenessOf(element), waitTime);
      await this.driver.actions().click(element).perform();
    },                  async (element: WebElement) => {
      await this.browser.wait(until.stalenessOf(element), waitTime);
      await this.driver.executeScript('arguments[0].click();', element);
    });
  }

  public async doubleClick(): Promise<void> {
    return this.execute('DOUBLE CLICK', async (element: WebElement) => {
      await this.browser.wait(async () => element.isDisplayed(), 0);

      return this.driver.actions().doubleClick(element).perform();
    });
  }

  public async hover(): Promise<void> {
    return this.execute('HOVER', async (element: WebElement) => {
      await this.browser.wait(async () => element.isDisplayed());

      return this.driver.actions().move({ origin: element }).perform();
    });
  }

  public async move(x: number, y: number, relative: boolean = true): Promise<void> {
    await this.getPosition();

    return this.execute(
      `MOVE | (${chalk.blueBright(x)},  ${chalk.blueBright(y)}, ${chalk.blueBright(relative ? 'relative' : 'absolute')})`,
      async (element: WebElement) => {
        await this.browser.wait(async () => element.isDisplayed());

        return this.browser.getDriver().actions()
          .move({ origin: element })
          .press()
          .move({ origin: relative ? Origin.POINTER : Origin.VIEWPORT, x, y })
          .release()
          .perform();
      },
    );
  }

  public async dragAndDrop(target: AbstractWebComponent, relative: boolean = true): Promise<void> {
    await this.getPosition();
    const targetPosition: IRectangle = await target.getPosition();
    const x: number = targetPosition.x;
    const y: number = targetPosition.y;

    return this.execute(
      `MOVE | (${chalk.blueBright(x)},  ${chalk.blueBright(y)}, ${chalk.blueBright(relative ? 'relative' : 'absolute')})`,
      async (element: WebElement) => {
        await this.browser.wait(async () => element.isDisplayed());

        return this.browser.getDriver().actions()
          .move({ origin: element })
          .press()
          .move({ origin: await target.getElement() })
          .release()
          .perform();
      },
    );
  }

  public async dragAndDropWithOffset(
    target: AbstractWebComponent, 
    offsetX?: number, 
    offsetY?: number, 
    relative: boolean = true,
  ): Promise<void> {
    await this.getPosition();
    const targetPosition: IRectangle = await target.getPosition();
    const x: number = targetPosition.x;
    const y: number = targetPosition.y;

    return this.execute(
      `MOVE | (${chalk.blueBright(x)},  ${chalk.blueBright(y)}, ${chalk.blueBright(relative ? 'relative' : 'absolute')})`,
      async (element: WebElement) => {
        await this.browser.wait(async () => element.isDisplayed());
        
        return this.browser.getDriver().actions()
          .move({ origin: element })
          .move(this.getLocation(offsetX, offsetY, relative))
          .press()
          .move({ origin: relative ? Origin.POINTER : Origin.VIEWPORT, x, y })
          .release()
          .perform();
      },
    );
  }

  public async clickWithOffset(x: number, y: number, relative: boolean = true): Promise<void> {
    await this.getPosition();

    // tslint:disable: max-line-length
    return this.execute(
      `CLICK WITH OFFSETT | (${chalk.blueBright(x)},  ${chalk.blueBright(y)}, ${chalk.blueBright(relative ? 'relative' : 'absolute')})`,
      async (element: WebElement) => {
        await this.browser.wait(async () => element.isDisplayed());

        return this.browser.getDriver().actions()
          .move({ origin: element })
          .move(this.getLocation(x, y, relative))
          .press()
          .release()
          .perform();
      },
    );
  }


  public async rightClick(): Promise<void> {
    await this.getPosition();

    return this.execute(
      `RIGHT CLICK`,
      async (element: WebElement) => {
        await this.browser.wait(async () => element.isDisplayed());

        return this.browser.getDriver().actions()
          .move({ origin: element })
          .press(Button.RIGHT)
          .release()
          .perform();
      },
    );
  }

  public async doubleclickWithOffset(x: number, y: number, relative: boolean = true): Promise<void> {
    await this.getPosition();

    return this.execute(
      `DOUBLE WITH OFFSETT | (${chalk.blueBright(x)},  ${chalk.blueBright(y)}, ${chalk.blueBright(relative ? 'relative' : 'absolute')})`,
      async (element: WebElement) => {
        await this.browser.wait(async () => element.isDisplayed());

        return this.browser.getDriver().actions()
          .move({ origin: element })
          .move(this.getLocation(x, y, relative))
          .press()
          .press()
          .release()
          .perform();
      },
    );
  }

  public getLocation(x: number, y: number, relative: boolean): IDirection {
    return { origin: relative ? Origin.POINTER : Origin.VIEWPORT, x, y };
  }

  public async clickWithControlKey(key: string): Promise<void> {
    return this.execute(`CLICK WITH CONTROL KEY ${key}`, async (element: WebElement) => {
      await this.browser.wait(async () => element.isDisplayed());

      return this.driver.actions().keyDown(key).click(element).keyUp(key).perform();
    });
  }

  public async clear(): Promise<void> {
    return this.execute('CLEAR', async (element: WebElement) => {
      await this.browser.wait(async () => element.isDisplayed());

      await element.clear();
    },                  async (element: WebElement) => {
      await this.driver.executeScript('arguments[0].clear();', element);
    });
  }

  public async scrollIntoView(): Promise<void> {
    return this.execute('SCROLL INTO VIEW', async (element: WebElement) => {
      await this.driver.executeScript('arguments[0].scrollIntoView(true);', element);
    });
  }

  public async sendKeys(keys: string): Promise<void> {
    return this.execute(`SEND KEYS | ${chalk.blueBright(keys)}`, async (element: WebElement) => {
      await element.sendKeys(keys);
    });
  }

  public async sendKeys2(keys: string): Promise<void> {
    return this.execute(`SEND KEYS | ${chalk.blueBright(keys)}`, async (element: WebElement) => {
      await element.click();
      await element.sendKeys(keys);
    });
  }


  public async selectText(): Promise<void> {
    let key: string;
    if ((await this.browser.getUserAgent()).includes('Macintosh;')) {
      key = Key.COMMAND;
    } else {
      key = Key.CONTROL;
    }

    return this.execute(`SELECT TEXT`, async (element: WebElement) => {

      return this.browser.getDriver().actions()
        .keyDown(key)
        .sendKeys('a')
        .keyUp(key)
        .perform();
    });
  }

  public async setTextContent(newValue: string): Promise<void> {
    await this.scrollIntoView();
    await this.click();
    await this.selectText();

    return this.execute(`SET TEXT CONTENT`, async (element: WebElement) => {

      return this.browser.getDriver().actions()
        .sendKeys(newValue)
        .perform();
    });
  }

  public async delete(): Promise<void> {
    await this.scrollIntoView();
    await this.waitUntilLocatedAndDisplayed();
    await this.click();

    return this.execute(`DELETE`, async (element: WebElement) => {
      return this.browser.getDriver().actions()
        .keyDown(Key.BACK_SPACE)
        .keyUp(Key.BACK_SPACE)
        .perform();
    });
  }

  public async copy(clickOnElement: boolean = true): Promise<void> {
    await this.scrollIntoView();

    return this.execute(`COPY`, async (element: WebElement) => {
      if (clickOnElement) {
        await element.click();
      }

      return this.browser.getDriver().actions()
        .keyDown(Key.CONTROL || Key.COMMAND)
        .sendKeys('c')
        .keyUp(Key.CONTROL || Key.COMMAND)
        .perform();
    });
  }

  public async paste(): Promise<void> {
    await this.scrollIntoView();

    return this.execute(`PASTE`, async (element: WebElement) => {
      await element.click();

      return this.browser.getDriver().actions()
        .keyDown(Key.CONTROL || Key.COMMAND)
        .sendKeys('v')
        .keyUp(Key.CONTROL || Key.COMMAND)
        .perform();
    });
  }

  public async getCssValue(style: string): Promise<string> {
    return this.execute(`GET STYLE | ${chalk.blueBright(style)}`, async (element: WebElement) => {
      return element.getCssValue(style);
    });
  }

  public async getAttribute(attribute: string): Promise<string> {
    return this.execute(`GET ATTRIBUTE | ${chalk.blueBright(attribute)}`, async (element: WebElement) => {
      return element.getAttribute(attribute);
    });
  }

  public async getText(waitForDisplayed: boolean = false): Promise<string> {
    return this.execute('GET TEXT', async (element: WebElement) => {
      if (waitForDisplayed) {
        await this.browser.wait(async () => element.isDisplayed());
      }

      return element.getText();
    });
  }

  public async getTextTag(): Promise<string> {
    return this.driver.executeScript(`return document.querySelector("${this.locator.value}").text;`);
  }

  public async getPosition(): Promise<IRectangle> {
    return this.execute('GET POSITION', async (element: WebElement) => {
      await this.browser.wait(async () => element.isDisplayed());

      return element.getRect();
    });
  }

  public async isDisplayed(): Promise<boolean> {
    return this.execute(`IS DISPLAYED`, async (element: WebElement) => {
      return element.isDisplayed();
    });
  }

  public async isEnabled(): Promise<boolean> {
    return this.execute(`IS ENABLED`, async (element: WebElement) => {
      return element.isEnabled();
    });
  }

  public async isSelected(): Promise<boolean> {
    return this.execute(`IS SELECTED`, async (element: WebElement) => {
      return element.isSelected();
    });
  }

  public async isChecked(): Promise<boolean> {
    return this.execute(`IS CHECKED`, async (element: WebElement) => {
      return element.getAttribute(attributes.CHECKED);
    });
  }

  public async switchToIframe(): Promise<void> {
    return this.execute(`SWITCH TO IFRAME`, async (element: WebElement) => {
      await this.browser.wait(async () => element.isDisplayed());
      await this.browser.getDriver().switchTo().frame(element);
    });
  }

  public async waitUntilLocatedAndDisplayed(implicitTimeout: number = environment.timeout): Promise<void> {
    await this.browser.wait(async () => {
      if (await this.isLocated(5000)) {
        return this.isDisplayed();
      } else {
        return false;
      }
    },                      implicitTimeout);
  }

  public async waitUntilNotLocated(implicitTimeout: number = environment.timeout): Promise<void> {
    await this.browser.wait(async () => await this.isLocated(1000) === false, implicitTimeout);
  }

  public async countElements(): Promise<number> {
    const elements: WebElement[] = await this.getElements();
    Logger.warn(`COUNT ELEMENTS |`, chalk.gray(this.locator.toString()), '|', chalk.greenBright(elements.length));

    return elements.length;
  }

  // public async checkCheckbox(): Promise<void> {
  //   return this.execute('GET POSITION', async (element: WebElement) => {
  //     if (!element.isChecked()) {
  //       await element.click();
  //       await element.isChecked();
  //     }
  //   });
  // }

  public abstract getElement(): Promise<WebElement>;

  public abstract getElements(implicitTimeout?: number): Promise<WebElement[]>;

  public abstract isLocated(implicitTimeout?: number): Promise<boolean>;

  protected async execute(
    actionName: string,
    action: (element: WebElement) => Promise<any>,
    scriptAction: (element: WebElement) => Promise<any> | (() => { }) = null,
  ): Promise<any> {
    const locator: string = this.locator.value;

    const element: WebElement = await this.getElement();
    try {
      const result: any = await action(element);

      if (result !== null && result !== undefined) {
        Logger.warn(`${actionName} |`, chalk.gray(this.locator.toString()), '|', chalk.greenBright(JSON.stringify(result)));
      } else {
        Logger.warn(`${actionName} |`, chalk.gray(this.locator.toString()));
      }

      return result;
    } catch (e) {
      Logger.warn(`${actionName} |`, chalk.gray(this.locator.toString()));

      if (e.name === 'ElementClickInterceptedError' || e.name === 'ElementNotInteractableError') {

        return this.execute(
          `SCRIPT ERROR ${actionName} ${e}`,
          scriptAction as (element: WebElement) => Promise<any>, scriptAction,
        );
      }

      if (e.name === 'StaleElementReferenceError' || e.name === 'InvalidElementStateError') {
        await this.driver.sleep(100);
        Logger.warn(chalk.gray(e.name), chalk.gray('Repeat after 100ms'));

        return this.execute(actionName, action, scriptAction);
      }

      Logger.warn(chalk.redBright(e.name));
      Logger.warn(chalk.redBright(e.message));
      await this.browser.takeScreenshot(actionName);

      throw e;
    } 
  }
}
