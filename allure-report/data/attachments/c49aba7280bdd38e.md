# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test2.spec.js >> succesfully iteams purchase and verity Test 
- Location: tests\test2.spec.js:9:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 53.97
Received: 75.97
```

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('.inventory_item_name').first()
Expected: "Sauce Labs Backpack"
Received: "Test.allTheThings() T-Shirt (Red)"

Call log:
  - Expect "toHaveText" locator('.inventory_item_name').first() with timeout 5000ms
  - waiting for locator('.inventory_item_name').first()
    - locator resolved to <div class="inventory_item_name" data-test="inventory-item-name">Test.allTheThings() T-Shirt (Red)</div>
    - unexpected value "Test.allTheThings() T-Shirt (Red)"
  - Test ended.

```

```yaml
- text: Test.allTheThings() T-Shirt (Red)
```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test';
  2   | import { ProductPage } from '../pages/ProductPage';
  3   | import { LoginPage } from '../pages/LoginPage';
  4   | import { CartPage } from '../pages/CartPage';
  5   | import { checkoutInfoPage } from '../pages/CheckoutInfoPage';
  6   | import { CartOverViewPage } from '../pages/CartOverViewPage';
  7   | import { checkoutCompletePage } from '../pages/checkoutCompletePage';
  8   | 
  9   | test('succesfully iteams purchase and verity Test ', async ({ page }) => {
  10  | 
  11  |     const loginPage = new LoginPage(page);
  12  |     const productPage = new ProductPage(page);
  13  |     const cartPage = new CartPage(page);
  14  |     const infoPage = new checkoutInfoPage(page);
  15  |     const cartOverView = new CartOverViewPage(page);
  16  |     const complete = new checkoutCompletePage(page);
  17  | 
  18  |     await loginPage.goto();
  19  |     await loginPage.input('standard_user', 'secret_sauce');
  20  |     await loginPage.clickLoginButton();
  21  |     await expect(page).toHaveURL(/inventory.html/);
  22  |     await page.waitForTimeout(1000);
  23  |     await productPage.clickMenu();
  24  |     await page.waitForTimeout(1000);
  25  |     await productPage.clickResetButton();
  26  |     await page.waitForTimeout(1000);
  27  |     await productPage.clickCloseMenu();
  28  | 
  29  |     for (let i = 0; i < 3; i++) {
  30  |         productPage.clickAddToCart().nth(i).click();
  31  |         console.log("add to cart iteam :" + (i + 1));
  32  |         await page.waitForTimeout(1000);
  33  |     }
  34  | 
  35  |     await page.locator('.shopping_cart_link').scrollIntoViewIfNeeded();
  36  |     await page.waitForTimeout(1000);
  37  |     await productPage.clickShoppingCartLink();
  38  |     //  await page.locator('.shopping_cart_link').click();
  39  |     await page.waitForTimeout(2000);
  40  |     await expect(page).toHaveURL(/cart.html/);
  41  | 
  42  |     const productsName = ["Sauce Labs Backpack", "Sauce Labs Bolt T-Shirt", "Sauce Labs Onesie"];
  43  |     const productsPrice = await cartPage.getPriceOfProduct().allTextContents();
  44  |     let sum = 0;
  45  | 
  46  |     for (const [index, name] of productsName.entries()) {
  47  |         //await cartPage.getTitelOFProducts().nth(i).textContent();
  48  |         //await cartPage.getTitelOFProducts().allTextContents();
  49  |         //  let productName = await cartPage.getTitelOFProducts().nth(i).textContent();
  50  |         //expect(productName).toBe(productsName[i]);
  51  |         // page.expect().toHaveText()
  52  | 
> 53  |         expect(await cartPage.getTitelOFProducts().nth(index)).toHaveText(name);
      |                                                                ^ Error: expect(locator).toHaveText(expected) failed
  54  |         let cleanPrice = productsPrice[index].replace("$", "");
  55  |         // console.log(cleanPrice);
  56  |         sum += Number(cleanPrice);
  57  |     }
  58  | 
  59  |     const expectedTotal = 29.99 + 15.99 + 7.99;
  60  |     expect(sum).toBe(expectedTotal)
  61  |     console.log("expected is equal to actual");
  62  | 
  63  |     await cartPage.getCheckoutButton().scrollIntoViewIfNeeded();
  64  |     await page.waitForTimeout(2000);
  65  |     await cartPage.clickCheckout();
  66  |     await page.waitForTimeout(2000);
  67  | 
  68  |     await infoPage.fillFirstName('Nahin');
  69  |     await page.waitForTimeout(1000);
  70  |     await infoPage.fillLastName('Islam');
  71  |     await page.waitForTimeout(1000);
  72  |     await infoPage.fillPostalCode('10002');
  73  |     await page.waitForTimeout(1000);
  74  |     await infoPage.clickContinue();
  75  |     await page.waitForTimeout(2000);
  76  | 
  77  |     const nameOfProducts = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Onesie'];
  78  |     const prices = await cartOverView.getPriceOfProducts();
  79  |     let Sum = 0;
  80  | 
  81  |     for (const [index, name] of nameOfProducts.entries()) {
  82  |         await expect(cartOverView.getProductName().nth(index)).toHaveText(name);
  83  |         // console.log(name);
  84  |         let cleanPrice = Number(prices[index].replace("$", ""));
  85  |         Sum += cleanPrice;
  86  | 
  87  |     }
  88  | 
  89  |     await cartOverView.totalSummery.scrollIntoViewIfNeeded();
  90  |     await page.waitForTimeout(2000);
  91  | 
  92  |     const totalPrice = Number((await cartOverView.getTotalPrice()).replace("Item total: $", ""));
  93  |     await expect(totalPrice).toBe(Sum);
  94  | 
  95  |     const tax = Number((await cartOverView.getTax()).replace("Tax: $", ""));
  96  |     const totalWithTax = totalPrice + tax;
  97  | 
  98  |     const summery = Number((await cartOverView.getTotalSummery()).replace("Total: $", ""));
  99  | 
  100 |     expect(summery).toBe(totalWithTax);
  101 |     await cartOverView.clickFinish();
  102 | 
  103 |     expect(await complete.successText).toHaveText('Thank you for your order!');
  104 |     await page.waitForTimeout(2000);
  105 |     await complete.clickBackButton();
  106 |     await page.waitForTimeout(1000);
  107 | 
  108 | 
  109 |     await productPage.clickMenu();
  110 |     await page.waitForTimeout(1000);
  111 |     await productPage.clickResetButton();
  112 |     await page.waitForTimeout(1000);
  113 |     await productPage.clickLogout();
  114 |     await page.waitForTimeout(1000);
  115 | 
  116 | 
  117 | })
```