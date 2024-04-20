import { test, expect } from "@playwright/test";
import { RegistrationPage } from "@/tests/methods/registration.page";

test("Verify registration as parent", async ({ page }) => {
    const registrationPage = new RegistrationPage(page)

    await registrationPage.navigateToURL()
    await registrationPage.registerAsParent()
})

test("Verify registration as consultant", async ({ page }) => {
    const registrationPage = new RegistrationPage(page)

    await registrationPage.navigateToURL()
    await registrationPage.registerAsConsultant()
})
