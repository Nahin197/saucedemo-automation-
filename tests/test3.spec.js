import { expect, test } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { checkoutInfoPage } from '../pages/CheckoutInfoPage';
import { CartOverViewPage } from '../pages/CartOverViewPage';
import { checkoutCompletePage } from '../pages/checkoutCompletePage';

test('succesfully  single iteam purchase and verity Test', async ({ page }) => {

    test.setTimeout(60000);

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const infoPage = new checkoutInfoPage(page);
    const cartOverView = new CartOverViewPage(page);
    const complete = new checkoutCompletePage(page);
    await loginPage.goto();

    await loginPage.input('performance_glitch_user', 'secret_sauce');
    await loginPage.clickLoginButton();
    await expect(page).toHaveURL(/inventory.html/);
    await page.waitForTimeout(1000);
    await productPage.clickMenu();
    await page.waitForTimeout(1000);
    await productPage.clickResetButton();
    await page.waitForTimeout(1000);
    await productPage.clickCloseMenu();
    await productPage.selectSortOption('za');

    productPage.clickAddToCart().nth(0).click();
    await page.waitForTimeout(1000);
    await productPage.clickShoppingCartLink();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/cart.html/);
    await cartPage.clickCheckout();

    await infoPage.fillFirstName('Nahin');
    await page.waitForTimeout(1000);
    await infoPage.fillLastName('Islam');
    await page.waitForTimeout(1000);
    await infoPage.fillPostalCode('10002');
    await page.waitForTimeout(1000);
    await infoPage.clickContinue();
    await page.waitForTimeout(2000);

    const nameOfProduct = 'Test.allTheThings() T-Shirt (Red)';
    const price = await cartOverView.getSinglePriceOfProduct();
    await expect(cartOverView.getProductName()).toHaveText(nameOfProduct);
    let cleanPrice = Number(price.replace("$", ""));

    await cartOverView.totalSummery.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);

    const totalPrice = Number((await cartOverView.getTotalPrice()).replace("Item total: $", ""));
    await expect(totalPrice).toBe(cleanPrice);

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

});