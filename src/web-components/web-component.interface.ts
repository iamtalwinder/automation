import { WebElement } from 'selenium-webdriver';

export interface WebComponentInterface {
  getElement(): Promise<WebElement>;

  getElements(implicitTimeout?: number): Promise<WebElement[]>;

  isLocated(implicitTimeout?: number): Promise<boolean>;
}
