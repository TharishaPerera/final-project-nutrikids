import { expect, Locator, Page } from "@playwright/test";
import TestData from '../testdata.json';

const { applicationURL, login } = TestData;

export class LoginPage {
  readonly page: Page;
  readonly btn_Signin: Locator;
  readonly lbl_PageHeaderWelcome: Locator;
  readonly lbl_LoginPageHeader: Locator;
  readonly txt_Email: Locator;
  readonly txt_Password: Locator;
  readonly lnk_dashboard: Locator;
  readonly lbl_Statistics: Locator;

  constructor(page: Page) {
    this.page = page;

    this.btn_Signin = page.locator('//button[text()="Sign In"]');
    this.lbl_PageHeaderWelcome = page.locator(
      '//h1[contains(text(),"Welcome to")]'
    );
    this.lbl_LoginPageHeader = page.locator('//h1[text()="Welcome"]');
    this.txt_Email = page.locator('//input[@name="email"]');
    this.txt_Password = page.locator('//input[@name="password"]');
    this.lnk_dashboard = page.locator('//a[text()="Dashboard"]');
    this.lbl_Statistics = page.locator('//div[text()="Statistics"]');
  }

  async navigateToURL() {
    await this.page.goto(applicationURL);
    await expect(this.lbl_PageHeaderWelcome).toHaveText("Welcome to NutriKids");
  }

  async clickSignIn() {
    await this.btn_Signin.click();
    await expect(this.lbl_LoginPageHeader).toHaveText("Welcome");
  }

  async login() {
    await this.txt_Email.fill(login.parent.email);
    await this.txt_Password.fill(login.parent.password);
    await this.btn_Signin.click();

    // verify login to the dashboard
    await expect(this.lbl_Statistics).toBeVisible();
  }
}
