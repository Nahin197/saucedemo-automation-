export class CartPage {
    constructor(page) {
        this.titelOfProducts = page.locator('.inventory_item_name');
        this.priceOfProducts = page.locator('.inventory_item_price');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });

    }


    getTitelOFProducts() {
        return this.titelOfProducts;
    }

    getPriceOfProduct() {
        return this.priceOfProducts;
    }

     getCheckoutButton() {
        return this.checkoutButton;
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }




}