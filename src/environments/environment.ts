import * as dotenv from 'dotenv';
import ProcessEnv = NodeJS.ProcessEnv;

dotenv.config();
const env: ProcessEnv = process.env;

if (
  !env.BUSINESS_SITE_URL
) {
  throw Error('You need to set env variables. Make sure you have a .env file');
}

export const environment: any = {
  browser: env.SELENIUM_BROWSER,
  defaultUserEmail: env.DEFAULT_USER_EMAIL,
  defaultUserPass: env.DEFAULT_USER_PASS,
  businessSiteUrl: env.BUSINESS_SITE_URL,
  mainSiteUrl: env.MAIN_SITE_URL,
  locationName: env.LOCATION_NAME,
  address: env.ADDRESS,
  phoneNumber: env.PHONE_NUMBER,
};
