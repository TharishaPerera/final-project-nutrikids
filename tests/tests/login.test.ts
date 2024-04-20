import { test, expect } from "@playwright/test";
import { LoginPage } from "@/tests/methods/login.page";

test("Verify login functionality", async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.navigateToURL()
    await loginPage.clickSignIn()
    await loginPage.login()
})

