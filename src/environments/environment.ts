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
  newuserfirstname: env.NEW_USER_FIRST_NAME,
  newuserlastname: env.NEW_USER_LAST_NAME,
  newuseremail: env.NEW_USER_EMAIL,
  newuserpassword: env.NEW_USER_PASSWORD,
  newuserconfirmpassword: env.NEW_USER_CONFIRM_PASSWORD,
  businessSiteUrl: env.BUSINESS_SITE_URL,
  mainSiteUrl: env.MAIN_SITE_URL,
  locationName: env.LOCATION_NAME,
  address: env.ADDRESS,
  city: env.CITY,
  state: env.STATE,
  zip: env.ZIP,
  phoneNumber: env.PHONE_NUMBER,
};

export const businesses: any = {
  CURRENT: 'current',
};
export const ssns: any = {
  NoBulk: '',
};
