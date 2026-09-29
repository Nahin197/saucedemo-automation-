import { expect, test } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { checkoutInfoPage } from '../pages/CheckoutInfoPage';
import { CartOverViewPage } from '../pages/CartOverViewPage';
import { checkoutCompletePage } from '../pages/checkoutCompletePage';

test('succesfully iteams purchase and verity Test ', async ({ page }) => {

    test.setTimeout(60000);

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const infoPage = new checkoutInfoPage(page);
    const cartOverView = new CartOverViewPage(page);
    const complete = new checkoutCompletePage(page);

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
    let sum = 0;

    for (const [index, name] of productsName.entries()) {
        //await cartPage.getTitelOFProducts().nth(i).textContent();
        //await cartPage.getTitelOFProducts().allTextContents();
        //  let productName = await cartPage.getTitelOFProducts().nth(i).textContent();
        //expect(productName).toBe(productsName[i]);
        // page.expect().toHaveText()

        expect(await cartPage.getTitelOFProducts().nth(index)).toHaveText(name);
        let cleanPrice = productsPrice[index].replace("$", "");
        // console.log(cleanPrice);
        sum += Number(cleanPrice);
    }

    const expectedTotal = 29.99 + 15.99 + 7.99;
    expect(sum).toBe(expectedTotal)
    console.log("expected is equal to actual");

    await cartPage.getCheckoutButton().scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await cartPage.clickCheckout();
    await page.waitForTimeout(2000);

    await infoPage.fillFirstName('Nahin');
    await page.waitForTimeout(1000);
    await infoPage.fillLastName('Islam');
    await page.waitForTimeout(1000);
    await infoPage.fillPostalCode('10002');
    await page.waitForTimeout(1000);
    await infoPage.clickContinue();
    await page.waitForTimeout(2000);

    const nameOfProducts = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Onesie'];
    const prices = await cartOverView.getPriceOfProducts();
    let Sum = 0;

    for (const [index, name] of nameOfProducts.entries()) {
        await expect(cartOverView.getProductName().nth(index)).toHaveText(name);
        // console.log(name);
        let cleanPrice = Number(prices[index].replace("$", ""));
        Sum += cleanPrice;

    }

    await cartOverView.totalSummery.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);

    const totalPrice = Number((await cartOverView.getTotalPrice()).replace("Item total: $", ""));
    await expect(totalPrice).toBe(Sum);

    const tax = Number((await cartOverView.getTax()).replace("Tax: $", ""));
    const totalWithTax = totalPrice + tax;

    const summery = Number((await cartOverView.getTotalSummery()).replace("Total: $", ""));

    expect(summery).toBe(totalWithTax);
    await cartOverView.clickFinish();

    expect(await complete.successText).toHaveText('Thank you for your order!');
    await page.waitForTimeout(2000);
    await complete.clickBackButton();
    await page.waitForTimeout(1000);


    await productPage.clickMenu();
    await page.waitForTimeout(1000);
    await productPage.clickResetButton();
    await page.waitForTimeout(1000);
    await productPage.clickLogout();
    await page.waitForTimeout(1000);


})