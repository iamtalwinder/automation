import * as dotenv from 'dotenv';
import ProcessEnv = NodeJS.ProcessEnv;

dotenv.config();
const env: ProcessEnv = process.env;

if (
  !env.SITE_URL
) {
  throw Error('You need to set env variables. Make sure you have a .env file');
}

export const environment: any = {
  browser: env.SELENIUM_BROWSER,
  defaultUserEmail: env.DEFAULT_USER_EMAIL,
  defaultUserPass: env.DEFAULT_USER_PASS,
  siteUrl: env.SITE_URL,
};

export const businesses: any = {
  CURRENT: 'current',
};

export const cssValues: any = {
};

export const contextMenu: any = {
};

export const attributes: any = {
};

export const statuses: any = {
};

export const paymentTypes: any = {
};

export const gridWidget: any = {
};

export const classes: any = {
};

export const shapeWidget: any = {
};

export const textWidget: any = {
};

export const cosWidgets: any = {
};

export const cosApps: any = {
};

export const textDataLinks: any = {
};

export const shapeDataLinks: any = {
};

export const gridDataLinks: any = {
};

export const widgetData: any = {
};

export const desktopDefaultItems: any = {
};

export const tabletDefaultItems: any = {
};

export const mobileDefaultItems: any = {
};

export const settingsEmployee: any = {
};

export const dataLinkAttributes: any = {
};

export const domains: any = {
};

export const pages: any = {
};

export const pubData: any = {
};

export const colors: any = {
};

export const languages: any = {
};

export const ssns: any = {
  NoBulk: '',
};
