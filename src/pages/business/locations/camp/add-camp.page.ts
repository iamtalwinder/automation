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

  @find(By.id('mat-input-3'))
  public MinimumAge: WebComponent;

  @find(By.xpath('//*[@id="wrapper"]/div[2]/fuse-content/app-addandeditcamp/div/div[2]/form/div/div/div[4]/div/mat-form-field[2]'))
  public MaximumAgeWrapper: WebComponent;

  @find(By.id('mat-input-4'))
  public MaximumAge: WebComponent;
 
  @find(By.id('description'))
  public Description: WebComponent;

  @find(By.xpath('//*[@id="mat-checkbox-1"]'))
  public Monday: WebComponent;

  @find(By.xpath('//*[@id="mat-checkbox-2"]'))
  public Tuesday: WebComponent;

  @find(By.xpath('//*[@id="mat-checkbox-3"]'))
  public Wednesday: WebComponent;

  @find(By.xpath('//*[@id="mat-checkbox-4"]'))
  public Thursday: WebComponent;

  @find(By.xpath('//*[@id="mat-checkbox-5"]'))
  public Friday: WebComponent;

  @find(By.xpath('//*[@id="mat-checkbox-6"]'))
  public Saturday: WebComponent;

  @find(By.xpath('//*[@id="mat-checkbox-7"]'))
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
  public SaveAsDraftCampButton: WebComponent;

  
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
    campName: string = 'Z' + new Date().getTime(),
    minimumAge: number,
    maximumAge: number,
  ): Promise<void> {

    await this.CampName.sendKeys(campName);
    await this.CategoryNameDropDown.click();
    await this.CategoryNameDropDown.sendKeys(Key.ARROW_DOWN + Key.ENTER + Key.ESCAPE);
    await this.MinimumAgeWrapper.click();
    await this.MinimumAge.sendKeys(minimumAge);
    await this.MaximumAgeWrapper.click();
    await this.MaximumAge.sendKeys(maximumAge);
    await this.Description.sendKeys('This is our camp description.');
    await this.Monday.scrollIntoView();
    await this.Monday.click();
    await this.Tuesday.scrollIntoView();
    await this.Tuesday.click();
    await this.Wednesday.scrollIntoView();
    await this.Wednesday.click();
    await this.Thursday.click();
    await this.DropOffTime.click();
    await this.DropOffTime.sendKeys('12:20:30PM');
    await this.PickUpTime.click();
    await this.PickUpTime.sendKeys('1:30:30PM');
    await this.AfterCare.scrollIntoView();
    await this.AfterCare.click();
    await this.AfterCare.sendKeys(120);
    await this.TermsAndConditions.click();
    await this.TermsAndConditions.sendKeys('These are our Terms and conditions .You have to accept all these Terms and conditions.');
    await this.PublishButton.clickAndWaitStaleness();
  }

  public async clearCampFromFields(): Promise<void> {
    await this.CampName.clear();
    await this.CategoryNameDropDown.clear();
    await this.MinimumAge.clear();
    await this.MaximumAge.clear();
    await this.Description.clear();
    await this.Monday.clear();
    await this.Tuesday.clear();
    await this.Wednesday.clear();
    await this.Thursday.clear();
    await this.DropOffTime.clear();
    await this.PickUpTime.clear();
    await this.AfterCare.clear();
    await this.TermsAndConditions.clear();
  }
}
