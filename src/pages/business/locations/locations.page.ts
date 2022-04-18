import { By, Key } from 'selenium-webdriver';
import { Browser, find } from '../../../core';
import { environment } from '../../../environments';
import { WebComponent } from '../../../web-components';
import { AbstractPage } from '../../abstract.page';
import { LocationDetailPage } from './location-details.page';

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

  // @find(By.xpath('//*[text() = " Location Name is required "]'))
  // public LocationNameErrorRequired: WebComponent;
 
  @find(By.id('mat-error-25'))
  public AddressNameErrorRequired: WebComponent;

  @find(By.id('mat-error-26'))
  public CityNameErrorRequired: WebComponent;

  @find(By.id('mat-error-27'))
  public StateNameErrorRequired: WebComponent;

  @find(By.id('mat-error-28'))
  public ZipErrorRequired: WebComponent;
 
  @find(By.id('mat-error-29'))
  public PhoneNumberErrorRequired: WebComponent;
 
  @find(By.className('custom-card mb-20 w-272 h-80 mat-elevation-z5 br-4 cursorPointer ng-star-inserted'))
  public AddedLocation: WebComponent;

 

  private locationDetails: LocationDetailPage;

  constructor(browser: Browser) {
    super(browser);
    this.setUrl(environment.businessSiteUrl + '/dashboard/locations');

    this.locationDetails = new LocationDetailPage(browser);
  }

  public async getLocationNameByPosition(position: number = 1): Promise<string> {
    return this.browser.find(By.css(`.custom-card.mb-20.w-272.h-80.mat-elevation-z5.br-4.cursorPointer.ng-star-inserted:nth-of-type(${position}) > div > div`)).getText();
  }

  public async getLocationByPosition(position: number = 1): Promise<WebComponent> {
    return this.browser.find(By.css(`.custom-card.mb-20.w-272.h-80.mat-elevation-z5.br-4.cursorPointer.ng-star-inserted:nth-of-type(${position})`));
  }

  public async openLocationDialogBox() {
    await this.AddLocationsBox.scrollIntoView();
    await this.AddLocationsBox.click();
  }

  public async openLocation(position: number = 1) {
    const location: WebComponent = await this.getLocationByPosition(position);
    await location.scrollIntoView();
    await location.click();
    await this.browser.wait(async () => this.locationDetails.MenuButton.isLocated(), 3000);
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
  
  public async clearFields() {
    await this.LocationNameInput.clear();
    await this.Address.clear();
    await this.PhoneNumber.clear();
    
  }

  public async editLocation(editLocationName: string, editAddressName: string, editphoneNumber: string) {

    await this.LocationNameInput.sendKeys(editLocationName);
    await this.Address.sendKeys(editAddressName);
    await this.browser.sleep(1000);
    await this.Address.sendKeys(Key.ARROW_DOWN);
    await this.Address.sendKeys(Key.ENTER);
    await this.PhoneNumber.sendKeys(editphoneNumber);
    await this.AddStage.clickAndWaitStaleness();
    const updatedLocationName: WebComponent = this.browser.find(By.xpath(`//*[text() = " ${editLocationName} "]`));
    await this.browser.wait(async () => updatedLocationName.isLocated(), 30000);
  }

}
