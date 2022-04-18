import { By, Key } from 'selenium-webdriver';
import { CampDetailsPage, EditCampPage } from '.';
import { Browser, find } from '../../../core';
import { environment } from '../../../environments';
import { WebComponent } from '../../../web-components';
import { AbstractPage } from '../../abstract.page';

export class LocationDetailPage extends AbstractPage { 
  
  @find(By.xpath('//*[@id="wrapper"]/div[2]/fuse-content/app-location-tab/div/div[1]/div[1]/div[2]/div[2]/button'))
  public MenuButton: WebComponent;

  @find(By.className('customButton flex ng-star-inserted'))
  public AddButton: WebComponent;

  @find(By.xpath('//*[text() = "Edit Location"]'))
  public EditLocation: WebComponent;

  @find(By.xpath('//*[@id="wrapper"]/div[2]/fuse-content/app-location-tab/div/div[1]/div[1]/div[1]/div[1]'))
  public LocationName: WebComponent;

  @find(By.xpath('//*[@id="wrapper"]/div[2]/fuse-content/app-location-tab/div/div[1]/div[1]/div[1]/div[2]/div[1]'))
  public AddressName: WebComponent;

  @find(By.xpath('//*[@id="wrapper"]/div[2]/fuse-content/app-location-tab/div/div[1]/div[1]/div[1]/div[2]/div[2]'))
  public PhoneNumber: WebComponent;

  @find(By.xpath('//*[@id="cdk-overlay-0"]/div/div/button[2]'))
  public ArchiveLocation: WebComponent;

  @find(By.xpath('//*[@id="mat-dialog-0"]/dialog-content-example-dialog/div/div[2]/div[2]/div/button'))
  public ArchiveLocationButton: WebComponent;

  @find(By.xpath('//*[@id="wrapper"]/div[2]/fuse-content/app-location-tab/div/div[1]/div[1]/div[2]/div[1]/button'))
  public AddCampButton: WebComponent;
  
  @find(By.xpath('//*[@id="mat-tab-content-0-0"]/div/camp-details/div/div/div/div/div/table/tbody/tr[1]/td[1]'))
  public AddedCamp: WebComponent;

  @find(By.xpath('//*[@id="cdk-overlay-0"]/div/div/button[1]'))
  public EditCamp: WebComponent;

  private campDetailPage: CampDetailsPage;

  constructor(browser: Browser) {
    super(browser);
    this.setUrl(environment.businessSiteUrl + '/dashboard/locations');
    this.campDetailPage = new CampDetailsPage(browser);
  }
 
  public async openMenuButton() {
    await this.MenuButton.click();
    await this.browser.wait(async () => this.EditLocation.isLocated(), 3000);
  }

  public async clickEditLocationButton() {
    await this.EditLocation.click();
    await this.browser.sleep(2000);
  }

  public async archiveLocation() {
    await this.ArchiveLocation.clickAndWaitStaleness();
  }

  public async clickArchiveLocationButton() {
    await this.ArchiveLocationButton.click();
  }

  public async openCampDetails() {
    await this.AddedCamp.click();
    await this.browser.wait(async () => this.campDetailPage.MenuButton.isLocated(), 3000);
  }

}