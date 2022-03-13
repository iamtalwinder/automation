import * as chalk from 'chalk';
import 'chromedriver';
import 'edgedriver';
import { promises, writeFile } from 'fs';
import 'geckodriver';
import 'iedriver';
import { resolve } from 'path';
import { 
  Builder, 
  By, 
  Key, 
  Condition, 
  IRectangle, 
  IWebDriverOptionsCookie, 
  ThenableWebDriver,
} from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import slugify from 'slugify';
import { businesses, environment } from '../environments';
import { Logger } from '../services';
import { ShadowWebComponent, WebComponent } from '../web-components';

export class Browser {
  private readonly driver: ThenableWebDriver;
  private storedUrls: Map<string, string>;

  public constructor() {
    this.driver = Browser.createBrowser(environment.browser);
    this.storedUrls = new Map<string, string>();
  }

  public async rememberCurrentUrl(key: string): Promise<void> {
    const url: string = await this.driver.getCurrentUrl();

    this.storedUrls.set(key, url);
    Logger.warn(chalk.cyan(url));
  }

  public async clearStoredUrls(): Promise<void> {
    this.storedUrls = new Map<string, string>();
  }

  public hasStoredUrl(key: string): boolean {
    return !!this.storedUrls.get(key);
  }

  public getStoredUrl(key: string): string {
    return this.storedUrls.get(key);
  }

  public async navigate(url: string): Promise<void> {
    await this.driver.navigate().to(url);
  }

  public async navigateStoredUrl(key: string): Promise<void> {
    await this.navigate(this.storedUrls.get(key));
  }

  public async navigateNewTab(url: string): Promise<void> {
    const lastTabsCount: number = (await ((await this.getDriver()).getAllWindowHandles())).length;
    await (await this.driver).executeScript('window.open();');
    await this.wait(async () => (await (await this.getDriver()).getAllWindowHandles()).length > lastTabsCount);
    const tabs: Promise<string[]> = (await this.driver).getAllWindowHandles();
    await this.wait(async () => this.driver.switchTo().window((await tabs)[(await tabs).length - 1]), 2000);
    await this.driver.navigate().to(url);
  }

  public async switchToDefaultContent(): Promise<void> {
    await this.driver.switchTo().defaultContent();
  }

  public async sleep(time: number): Promise<void> {
    await this.driver.sleep(time);
  }

  public find(locator: By): WebComponent {
    return new WebComponent(this, locator);
  }

  public findShadowComponent(
    locator: By, shadowRootSelector: string, secondShadowRootSelector: string = null, extraSelector: string = null,
  ): ShadowWebComponent {
    return new ShadowWebComponent(this, locator, shadowRootSelector, secondShadowRootSelector, extraSelector);
  }

  public getDriver(): ThenableWebDriver {
    return this.driver;
  }

  public async clearCookies(): Promise<void> {
    await this.driver.manage().deleteAllCookies();
  }

  public async wait<T>(
    condition: Condition<T> | (() => { }), 
    implicitTimeout: number = environment.timeout,
  ): Promise<T> {
    return this.driver
      .wait(condition, implicitTimeout)
      .catch(async (error: Error) => {
        if (typeof condition === 'function') {
          error.message = error.message + ' | ' + condition.toString().replace(/ {2}/g, '').replace(/\n/g, ' ');
        }

        if (implicitTimeout >= environment.timeout) {
          Logger.warn(chalk.redBright(error.message));

          await this.takeScreenshot('wait');

          throw error;
        }

        Logger.warn(chalk.gray(error.message));

        return null;
      });
  }

  public async waitAll<T>(
    condition: Condition<T> | (() => { }), 
    implicitTimeout: number = environment.timeout,
  ): Promise<T> {
    return this.driver
      .wait(condition, implicitTimeout)
      .catch(async (error: Error) => {
        if (typeof condition === 'function') {
          error.message = error.message + ' | ' + condition.toString().replace(/ {2}/g, '').replace(/\n/g, ' ');
        }

        Logger.warn(chalk.gray(error.message));

        return null;
      });
  }

  public async getWindowSize(): Promise<IRectangle> {
    return this.driver.manage().window().getRect();
  }

  public async setWindowSize(width: number, height: number): Promise<void> {
    Logger.warn(chalk.cyan(`Changing window\'s size to ${width}x${height}`));
    await this.driver.manage().window().setRect({ width: width, height: height });
    await this.wait(async () => (await this.driver.manage().window().getRect()).width === width);
    Logger.warn(chalk.cyan(`Window\'s size changed to ${width}x${height}`));
  }

  public async getHomeUrl(): Promise<string> {
    return this.driver.executeScript('return document.location.origin;');
  }

  public async getAccessTokenStorage(): Promise<string> {
    const token: IWebDriverOptionsCookie = 
    await this.driver.executeScript("window.localStorage.getItem('pe_auth_token');");

    return token ? token.value : null;
  }

  public async getLocalStorage(item: string): Promise<string> {
    return this.driver.executeScript(`window.localStorage.getItem('${item}');`);
  }

  public async getUserAgent(): Promise<string> {
    return this.getDriver().executeScript('return navigator.userAgent');
  }

  public async isDocumentReady(): Promise<boolean> {
    return await this.driver.executeScript('return document.readyState;') === 'complete';
  }

  public async close(): Promise<void> {
    Logger.warn(chalk.gray('================================================================================'));

    await this.driver.quit();
  }

  public async closeTab(): Promise<void> {
    Logger.warn(chalk.yellow('================================================================================'));

    await (await this.driver).close();
  }

  public async openInNewTab(urlButton: WebComponent): Promise<void> {
  Logger.warn(chalk.cyan(`Opening in new tab:`));
  const lastTabsCount: number = (await ((await this.getDriver()).getAllWindowHandles())).length;
  await urlButton.click();
  await this.wait(async () => (await (await this.getDriver()).getAllWindowHandles()).length > lastTabsCount);
  const tabs: Promise<string[]> = (await this.getDriver()).getAllWindowHandles();
  await (await this.getDriver()).switchTo().window((await tabs)[lastTabsCount]);
  await this.wait(async () => (await (await this.getDriver()).getAllWindowHandles()).length === 0, 3000);
  }

  public async openInNewTabLink(link: string): Promise<void> {
  Logger.warn(chalk.cyan(`Opening in new tab:`));
  const lastTabsCount: number = (await ((await this.getDriver()).getAllWindowHandles())).length;
  await this.wait(async () => (await (await this.getDriver()).getAllWindowHandles()).length > lastTabsCount);
  const tabs: Promise<string[]> = (await this.getDriver()).getAllWindowHandles();
  await (await this.getDriver()).switchTo().window((await tabs)[lastTabsCount]);
  await this.wait(async () => (await (await this.getDriver()).getAllWindowHandles()).length === 0, 3000);
  }

  public async closeLastTab(waitTime: number = 3000): Promise<void> {
    await this.closeTab();
    await this.wait(async () => (await (await this.getDriver()).getAllWindowHandles()).length !== 1, 2000);
    const tabs: Promise<string[]> = (await this.getDriver()).getAllWindowHandles();
    await (await this.getDriver()).switchTo().window((await tabs)[(await tabs).length - 1]);
    await this.wait(async () => (await (await this.getDriver()).getAllWindowHandles()).length === 1, 2000);
  }

  public async takeScreenshot(prefix: string = ''): Promise<string> {
    let name: string;
    await this.driver.takeScreenshot().then(async (data: string) => {
      if (prefix) {
        prefix = `${prefix}-`;
      }

      const fileName: string = slugify(`${prefix}${new Date().toISOString()}.png`, { lower: true });
      name = fileName;
      const base64Data: string = data.replace(/^data:image\/png;base64,/, '');

      await promises.mkdir(resolve(environment.screenshotSavePath), { recursive: true });

      Logger.warn(chalk.yellowBright(`Screenshot taken: ` + resolve(environment.screenshotSavePath, fileName)));
      writeFile(resolve(environment.screenshotSavePath, fileName), base64Data, 'base64', (err: Error) => {
        if (err) {
          Logger.warn(err);
        }
      });
    });

    return name;
  }

  public async checkEnvironments(): Promise<void> {
    await this.wait(async () => environment.propertiesLoaded, 10000);
    if (!environment.propertiesLoaded) {
      throw new Error('Unable to load environment properties');
    }
  }

  public async getKeyCtrl(): Promise<string> {
    return ((await this.getUserAgent()).includes('Macintosh;')) ? Key.COMMAND : Key.CONTROL;
  }

  public async setLanguage(language: string = 'en'): Promise<void> {
    const languageCode: string = 
    (language === businesses.DE || language === businesses.AT) ? businesses.DE.toLowerCase() : 'en';

    await this.driver.executeScript(`window.localStorage.setItem('pe_current_locale', '${languageCode}');`);
    await this.driver.navigate().refresh();
  }

  private static createBrowser(browser: string): ThenableWebDriver {
    switch (browser) {
      case 'chrome':
        const options: Options = new Options();
        options.addArguments('--incognito', `--window-size=${environment.screen}`, '--disable-dev-shm-usage');
        // options.addArguments(`user-agent=${environment.userAgent}`);
        // compatibility mode in case of issue
        // options.addArguments('--incognito', '--headless', '--window-size=1280,1400', '--no-sandbox',
        //   '--enable-features=NetworkService,NetworkServiceInProcess', '--disable-features=VizDisplayCompositor');

        return new Builder().forBrowser('chrome').setChromeOptions(options).build();
      case 'firefox':

        return new Builder().forBrowser('firefox').build();
      case 'safari':
        const driver: ThenableWebDriver = new Builder().forBrowser('safari').build();
        // tslint:disable: no-floating-promises
        driver.manage().window().maximize().then();

        return driver;
      case 'ie':
        return new Builder().forBrowser('ie').build();
      case 'edge':
        return new Builder().forBrowser('edge').build();
      default:
        throw Error('Unsupported browser. Please choose one from chrome, firefox, safari, ie and edge');
    }
  }
}
