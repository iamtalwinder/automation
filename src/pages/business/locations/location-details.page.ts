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

  @find(By.xpath('//*[text() = "Archive"]'))
  public ArchiveLocation: WebComponent;

  @find(By.xpath('//*[text() = " Archive "]'))
  public DialogBoxArchiveLocationButton: WebComponent;

  @find(By.xpath('//*[@id="wrapper"]/div[2]/fuse-content/app-location-tab/div/div[1]/div[1]/div[2]/div[1]/button'))
  public AddCampButton: WebComponent;
  
  @find(By.xpath('//*[@id="mat-tab-content-0-0"]/div/camp-details/div/div/div/div/div/table/tbody/tr[1]/td[1]'))
  public AddedCamp: WebComponent;

  @find(By.xpath('//*[@id="cdk-overlay-0"]/div/div/button[1]'))
  public EditCamp: WebComponent;

  private campDetailsPage: CampDetailsPage;

  constructor(browser: Browser) {
    super(browser);
    this.setUrl(environment.businessSiteUrl + '/dashboard/locations');
    this.campDetailsPage = new CampDetailsPage(browser);
  }
 
  public async openMenuButton(): Promise<void> {
    await this.MenuButton.click();
    await this.browser.wait(async () => this.EditLocation.isLocated(), 3000);

  }

  public async clickEditLocationButton(): Promise<void> {
    await this.EditLocation.clickAndWaitStaleness();
  }

  public async openArchiveLocationDialogBox(): Promise<void> {
    await this.MenuButton.click();
    await this.browser.wait(async () => this.ArchiveLocation.isLocated(), 3000);
    await this.ArchiveLocation.clickAndWaitStaleness();
  }

  public async clickArchiveLocationButton(): Promise<void> {
    await this.DialogBoxArchiveLocationButton.click();
  }

  public async openCampDetails(name: string): Promise<void> {
    const camp: WebComponent = await this.campDetailsPage.getCampByName(name);
    await camp.scrollIntoView();
    await camp.click();
    await this.browser.wait(async () => this.campDetailsPage.MenuButton.isLocated(), 3000);
  }

}