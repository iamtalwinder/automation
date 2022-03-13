import 'reflect-metadata';
import { By } from 'selenium-webdriver';
import * as chalk from 'chalk';
import { CSSMatrixOject } from './utils.interface';
import { Logger } from '../services';

export const uuidRegex: RegExp = new RegExp(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);

export function find(
  locator: By, 
  shadowRootSelector: | null | string = null,
  secondShadowRootSelector: | null | string = null, 
  extraSelector: | null | string = null,
): (target: any, propertyKey: string) => void {
  return (target: any, propertyKey: string): void => {
    const type: any = Reflect.getMetadata('design:type', target, propertyKey);
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      get: function (): any {
        if (shadowRootSelector === null) {
          return new type(this.browser, locator);
        } else if (extraSelector !== null) {
          return new type(this.browser, locator, shadowRootSelector, null, extraSelector);
        } else if (secondShadowRootSelector === null) {
          return new type(this.browser, locator, shadowRootSelector);
        } else {
          return new type(this.browser, locator, shadowRootSelector, secondShadowRootSelector);
        }
      },
    });
  };
}

beforeEach(async () => {
  Logger.warn(chalk.gray('================================================================================'));
});

export function parseCSSMatrix(matrix: string): CSSMatrixOject {
  const matrixPattern: RegExp = /-?\d+\.?\d*/g;
  const functionKeys: string[] = ['scaleX', 'skewY', 'skewX', 'scaleY', 'translateX', 'translateY'];
  const matrixValues: string[] = matrix.match(matrixPattern);

  return functionKeys.reduce<CSSMatrixOject>(
    (acc: CSSMatrixOject, val: string, i: number) => ({ ...acc, [val]: matrixValues[i] }), 
    { } as CSSMatrixOject,
  );
}

export function pxToInt(stringToParse: string): number {
  return parseInt(stringToParse.replace(/px/g, ''), 10);
}

export function getUUIDFromString(stringToParse: string): string {
  return uuidRegex.exec(stringToParse)[0];
}

export function parseViewportContent(content: string): { } {
  const entriesArray: string[] = content.split(', ');

  return entriesArray.reduce((acc: { }, val: string) => {
    const [key, value]: string[] = val.split('=');

    return { ...acc, [key]: value };
  },                         { });
}
