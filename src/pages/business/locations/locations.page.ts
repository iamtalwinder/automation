import { Browser, find } from '../../../core';
import { AbstractPage } from '../../abstract.page';
import { environment } from '../../../environments';
import { WebComponent } from '../../../web-components';
import { By, Key } from 'selenium-webdriver';

export class LocationsPage extends AbstractPage {
  @find(By.xpath('//*[text() = "Add Another Locations"]'))
  public AddLocationsBox: WebComponent;
 
  @find(By.xpath('//input[@formcontrolname="name"]'))
  public LocationNameInput: WebComponent;
 
  @find(By.xpath('//input[@formcontrolname="address"]'))
  public Address: WebComponent;

  @find(By.xpath('//input[@formcontrolname="city"]'))
  public City: WebComponent;

  @find(By.id('state'))
  public StateDropdown: WebComponent;
 
  @find(By.xpath('//input[@formcontrolname="zip"]'))
  public Zip: WebComponent;

  @find(By.xpath('//input[@formcontrolname="phoneNumber"]'))
  public PhoneNumber: WebComponent;
 
  @find(By.className('closeIcon'))
  public CloseIcon: WebComponent;

  @find(By.xpath('//*[text() = " Add Stage "]'))
  public AddStage: WebComponent;

  @find(By.xpath('//*[text() = "Buy Plan"]'))
  public BuyPlan: WebComponent;

  @find(By.xpath('//*[text() = " Location Name is required "]'))
  public LocationNameRequired: WebComponent;
 
  @find(By.xpath('//*[text() = " Address Name is required "]'))
  public AddressNameRequired: WebComponent;

  @find(By.xpath('//*[text() = " City Name is required "]'))
  public CityNameRequired: WebComponent;

  @find(By.xpath('//*[text() = " Zip code is required "]'))
  public ZipRequired: WebComponent;
 
  @find(By.xpath('//*[text() = " Phone Number is required "]'))
  public PhoneNumberRequired: WebComponent;
 
  @find(By.className('custom-card mb-20 w-272 h-80 mat-elevation-z5 br-4 cursorPointer ng-star-inserted'))
  public AddedLocation: WebComponent;

  constructor(browser: Browser) {
    super(browser);
    this.setUrl(environment.businessSiteUrl + '/dashboard/locations');
  }

  public async getLocationNameByPosition(position: number = 1): Promise<string> {
    return this.browser.find(By.css(`.custom-card.mb-20.w-272.h-80.mat-elevation-z5.br-4.cursorPointer.ng-star-inserted:nth-of-type(${position}) > div > div`)).getText();
  }

  public async addLocation(
    locationName: string = environment.locationName,
    address: string = environment.address,
    phoneNumber: string = environment.phoneNumber,
  ): Promise<number> {
    const count: number = await this.AddedLocation.countElements();


    if (await this.CloseIcon.isLocated(1000)) {
      await this.CloseIcon.click();
    }

    await this.AddLocationsBox.scrollIntoView();
    await this.AddLocationsBox.click();

    await this.LocationNameInput.sendKeys(locationName);    
    await this.Address.sendKeys(address);
    await this.browser.sleep(1000);
    await this.Address.sendKeys(Key.ARROW_DOWN);
    await this.Address.sendKeys(Key.ENTER);
    await this.PhoneNumber.sendKeys(phoneNumber);
    await this.AddStage.click();
    await this.browser.wait(async () => await this.AddedLocation.countElements() === count + 1, 30000);

    return count + 1;
  }
}
