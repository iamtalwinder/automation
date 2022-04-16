import { AbstractPage } from '../../../abstract.page';
import { By, Key } from 'selenium-webdriver';
import { Browser, find } from '../../../../core';
import { environment } from '../../../../environments';
import { WebComponent } from '../../../../web-components';
export class AddCampPage extends AbstractPage { 

  @find(By.xpath('//*[@id="wrapper"]/div[2]/fuse-content/app-location-tab/div/div[1]/div[1]/div[2]/div[1]/button'))
  public AddCampButton: WebComponent;

  @find(By.xpath('//input[@formcontrolname="name"]'))
  public CampName: WebComponent;
 
  @find(By.xpath('//input[@formcontrolname="categoryIds"]'))
  public CategoryName: WebComponent;

  @find(By.xpath('//input[@formcontrolname="minimumAge"]'))
  public MinimumAge: WebComponent;
 
  @find(By.xpath('//input[@formcontrolname="maximumAge"]'))
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

  constructor(browser: Browser) {
    super(browser);
    this.setUrl(environment.businessSiteUrl + '/dashboard/locations');
  }

  public async addCamp() {
    console.log("add-camp-button",this.AddCampButton);
    await this.AddCampButton.clickAndWaitStaleness(40000);
    await this.browser.sleep(2000);
  }
}
