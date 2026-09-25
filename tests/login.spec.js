import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test("Login test", async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.waitForTimeout(2000);
    await loginPage.input('locked_out_user', 'secret_sauce');
    await loginPage.clickLoginButton();
    await page.waitForTimeout(2000);

    await expect(loginPage.getAlertLocator()).toHaveText("Epic sadface: Sorry, this user has been locked out.");
    

     
    // await page.pause();

})