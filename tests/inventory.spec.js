import { expect, test } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

test('Inventory reset App Test ', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.input('standard_user', 'secret_sauce');
    await loginPage.clickLoginButton();
    await expect(page).toHaveURL(/inventory.html/);
    await page.waitForTimeout(1000);
    await productPage.clickMenu();
    await page.waitForTimeout(1000);
    await productPage.clickResetButton();
    await page.waitForTimeout(1000);
    await productPage.clickCloseMenu();

    for (let i = 0; i < 3; i++) {
        productPage.clickAddToCart().nth(i).click();
        console.log("add to cart iteam :" + (i + 1));
        await page.waitForTimeout(1000);
    }

    await page.locator('.shopping_cart_link').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await productPage.clickShoppingCartLink();
    //  await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/cart.html/);

    const productsName = ["Sauce Labs Backpack", "Sauce Labs Bolt T-Shirt", "Sauce Labs Onesie"];
    const productsPrice = await cartPage.getPriceOfProduct().allTextContents();
    let sum=0;

    for (let i = 0; i < 3; i++) {
        //await cartPage.getTitelOFProducts().nth(i).textContent();
        //await cartPage.getTitelOFProducts().allTextContents();
        //  let productName = await cartPage.getTitelOFProducts().nth(i).textContent();
        //expect(productName).toBe(productsName[i]);
        // page.expect().toHaveText()

        expect(await cartPage.getTitelOFProducts().nth(i)).toHaveText(productsName[i]);
        let cleanPrice = productsPrice[i].replace("$","");
        // console.log(cleanPrice);
        sum += Number(cleanPrice);
    }

    const expectedTotal = 29.99 + 15.99 + 7.99;
    expect(sum).toBe(expectedTotal)
    console.log("expected is equal to actual");
    

    




})