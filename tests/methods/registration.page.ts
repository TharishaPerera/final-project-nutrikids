import { expect, Locator, Page } from "@playwright/test";
import TestData from '../testdata.json';

const { applicationURL, register } = TestData;

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
    await this.page.goto(applicationURL + "/auth/sign-up");
    await expect(this.lbl_SignUpPageHeader).toHaveText("Sign Up");
  }

  async registerAsParent() {
    await this.txt_Name.fill(register.parent.name);
    await this.txt_Email.fill(generateUniqueEmail(register.parent.email));
    await this.txt_Password.fill(register.parent.password);
    await this.txt_PasswordConfirmation.fill(register.parent.password);
    await this.ele_ddRole.selectOption({ value: register.parent.role });
    await this.txt_NoOfChildren.fill(register.parent.noOfChildren);
    await this.txt_YoungestAge.fill(register.parent.youngestAge);
    await this.btn_Signup.click();

    await expect(this.lbl_Confirmation).toHaveText("Confirmation email sent!");
  }

  async registerAsConsultant() {
    await this.txt_Name.fill(register.consultant.name);
    await this.txt_Email.fill(generateUniqueEmail(register.consultant.email));
    await this.txt_Password.fill(register.consultant.password);
    await this.txt_PasswordConfirmation.fill(register.consultant.password);
    await this.ele_ddRole.selectOption({ value: register.consultant.role });
    await this.btn_Signup.click();

    await expect(this.lbl_Confirmation).toHaveText("Confirmation email sent!");
  }
}
