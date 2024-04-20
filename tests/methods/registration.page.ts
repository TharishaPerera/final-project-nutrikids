import { expect, Locator, Page } from "@playwright/test";
import { APPLICATION_URL } from "../tests.config";
import testdata from '../testdata.json';
import * as fs from "fs";

export const generateUniqueEmail = (email: string) => {
    return email.replace('test', Date.now().toString());
};

export class RegistrationPage {
  readonly page: Page;
  readonly lbl_SignUpPageHeader: Locator;
  readonly txt_Name: Locator;
  readonly txt_Email: Locator;
  readonly txt_Password: Locator;
  readonly txt_PasswordConfirmation: Locator;
  readonly ele_ddRole: Locator;
  readonly txt_NoOfChildren: Locator;
  readonly txt_YoungestAge: Locator;
  readonly lbl_Confirmation: Locator;
  readonly btn_Signup: Locator;

  constructor(page: Page) {
    this.page = page;

    this.txt_Name = page.locator('//input[@name="name"]');
    this.txt_Email = page.locator('//input[@name="email"]');
    this.txt_Password = page.locator('//input[@name="password"]');
    this.txt_PasswordConfirmation = page.locator(
      '//input[@name="confirmPassword"]'
    );
    this.ele_ddRole = page.locator(
      '//input[@name="confirmPassword"]/../following-sibling::div/select'
    );
    this.txt_NoOfChildren = page.locator('//input[@name="noOfChildren"]');
    this.txt_YoungestAge = page.locator('//input[@name="youngestAge"]');
    this.lbl_SignUpPageHeader = page.locator('//h1[text()="Sign Up"]');
    this.lbl_Confirmation = page.locator(
      '//li/div/div[text()="Confirmation email sent!"]'
    );
    this.btn_Signup = page.locator('//button[text()="Sign Up"]');
  }

  async navigateToURL() {
    await this.page.goto(APPLICATION_URL + "/auth/sign-up");
    await expect(this.lbl_SignUpPageHeader).toHaveText("Sign Up");
  }

  async registerAsParent() {
    await this.txt_Name.fill(testdata.register.parent.name);
    await this.txt_Email.fill(generateUniqueEmail(testdata.register.parent.email));
    await this.txt_Password.fill(testdata.register.parent.password);
    await this.txt_PasswordConfirmation.fill(testdata.register.parent.password);
    await this.ele_ddRole.selectOption({ value: testdata.register.parent.role });
    await this.txt_NoOfChildren.fill(testdata.register.parent.noOfChildren);
    await this.txt_YoungestAge.fill(testdata.register.parent.youngestAge);
    await this.btn_Signup.click();

    await expect(this.lbl_Confirmation).toHaveText("Confirmation email sent!");
  }

  async registerAsConsultant() {
    await this.txt_Name.fill(testdata.register.consultant.name);
    await this.txt_Email.fill(generateUniqueEmail(testdata.register.consultant.email));
    await this.txt_Password.fill(testdata.register.consultant.password);
    await this.txt_PasswordConfirmation.fill(testdata.register.consultant.password);
    await this.ele_ddRole.selectOption({ value: testdata.register.consultant.role });
    await this.btn_Signup.click();

    await expect(this.lbl_Confirmation).toHaveText("Confirmation email sent!");
  }
}
