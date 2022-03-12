import { Browser } from '../core';

export abstract class AbstractPage {
  private url: string;
  
  constructor(protected browser: Browser) {
  }

  public async navigate(): Promise<void> {
    await this.browser.navigate(this.url);
  }

  protected setUrl(url: string): void {
    this.url = url;
  }
}
