export class Logger {
  public static log(...args: any): void {
    // tslint:disable: no-console
    console.log(...args);
  }

  public static warn(...args: any): void {
    // tslint:disable: no-console
    console.warn(...args);
  }
}
