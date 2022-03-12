import { environment } from "../src/environments";
import * as chalk from 'chalk';

before(async () => {
  const start_time: number = Date.now();

  // timer function to wait until properties are loaded
  const timerFn: (resolve: () => void) => void = (resolve: () => void): void => {
    resolve();
  }

  // executing the promise to wait for resolution
  // tslint:disable-next-line:typedef
  await new Promise<void>(resolve => timerFn(resolve));
})
