export class CartOverViewPage{
    constructor(page){
        this.page = page;
         this.titelOfProducts = page.locator('.inventory_item_name');
         this.priceOfProducts = page.locator('.inventory_item_price');
         this.totalPrice = page.locator('.summary_subtotal_label');
         this.tax = page.locator('.summary_tax_label');
         this.totalSummery = page.locator('.summary_total_label');
         this.finish = page.getByRole('button', { name: 'Finish' });
    
    }

    getProductName(){
        return this.titelOfProducts;
    }

   async  getPriceOfProducts(){
        return await this.priceOfProducts.allTextContents();
    }

    async  getSinglePriceOfProduct(){
        return await this.priceOfProducts.textContent();
    }

   async getTotalPrice(){
        return await this.totalPrice.textContent();
    }

    async getTax(){
        return await this.tax.textContent();
    }

    async getTotalSummery(){
        return await  this.totalSummery.textContent();
    }
    async clickFinish(){
        await this.finish.click();
    }


}