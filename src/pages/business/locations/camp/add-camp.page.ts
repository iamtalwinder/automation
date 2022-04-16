import { AbstractPage } from '../../../abstract.page';
import { By, Key } from 'selenium-webdriver';
import { Browser, find } from '../../../../core';
import { environment } from '../../../../environments';
import { WebComponent } from '../../../../web-components';
import { LocationDetailPage } from '../location-details.page';
import { LocationsPage } from '../locations.page';

export class AddCampPage extends AbstractPage { 

  @find(By.xpath('//input[@formcontrolname="name"]'))
  public CampName: WebComponent;
 
  @find(By.id('mat-select-1'))
  public CategoryNameDropDown: WebComponent;

  @find(By.xpath('//*[@id="wrapper"]/div[2]/fuse-content/app-addandeditcamp/div/div[2]/form/div/div/div[4]/div/mat-form-field[1]'))
  public MinimumAgeWrapper: WebComponent;

  @find(By.id('//*[@id="wrapper"]/div[2]/fuse-content/app-addandeditcamp/div/div[2]/form/div/div/div[4]/div/mat-form-field[1]/div/div[1]/div[3]'))
  public MinimumAge: WebComponent;
 
  @find(By.id('mat-input-44'))
  public MaximumAge: WebComponent;
 
  @find(By.xpath('//input[@formcontrolname="Description"]'))
  public Description: WebComponent;

  @find(By.id('mat-checkbox-1-input'))
  public Monday: WebComponent;

  @find(By.id('mat-checkbox-2-input'))
  public Tuesday: WebComponent;

  @find(By.id('mat-checkbox-3-input'))
  public Wednesday: WebComponent;

  @find(By.id('mat-checkbox-4-input'))
  public Thursday: WebComponent;

  @find(By.id('mat-checkbox-5-input'))
  public Friday: WebComponent;

  @find(By.id('mat-checkbox-6-input'))
  public Saturday: WebComponent;

  @find(By.id('mat-checkbox-7-input'))
  public Sunday: WebComponent;

  @find(By.id('dropOffTime'))
  public DropOffTime: WebComponent;

  @find(By.id('pickUpTime'))
  public PickUpTime: WebComponent;

  @find(By.id('afterCare'))
  public AfterCare: WebComponent;

  @find(By.id('termsAndConditions'))
  public TermsAndConditions: WebComponent;

  @find(By.xpath('//*[text() = " Upload Files "]'))
  public UploadFilesButton: WebComponent;

  @find(By.xpath('//*[text() = "Publish"]'))
  public PublishButton: WebComponent;

  @find(By.xpath('//*[text() = "Save as Draft"]'))
  public SaveAsDraftButton: WebComponent;

  private locationDetails: LocationDetailPage;
  private locationsPage: LocationsPage;

  constructor(browser: Browser) {
    super(browser);
    this.setUrl(environment.businessSiteUrl + '/dashboard/locations');
    this.locationDetails = new LocationDetailPage(browser)
    this.locationsPage = new LocationsPage(browser);
  }

  public async openAddCamp(locationPosition: number = 1): Promise<void> {
    await this.locationsPage.openLocation(locationPosition);
    await this.locationDetails.AddCampButton.click();
    await this.browser.wait(async () => this.CampName.isLocated(), 3000);
  }

  public async addCamp(
    campName: string,
    minimumAge: number,
    maximumAge: number,
  ): Promise<void> {

    await this.CampName.sendKeys(campName);
    await this.CategoryNameDropDown.click();
    await this.CategoryNameDropDown.sendKeys(Key.ARROW_DOWN + Key.ENTER + Key.ESCAPE);
    await this.MinimumAgeWrapper.click();
    await this.MinimumAgeWrapper.sendKeys(Key.NUMPAD5);
  }

 
}
