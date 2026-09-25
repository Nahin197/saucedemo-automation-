export class CartPage {
    constructor(page) {
        this.titelOfProducts = page.locator('.inventory_item_name');
        this.priceOfProducts = page.locator('.inventory_item_price');

    }


    getTitelOFProducts() {
        return this.titelOfProducts;
    }

    getPriceOfProduct(){
        return this.priceOfProducts;
    }





}