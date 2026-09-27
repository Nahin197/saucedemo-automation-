export  class checkoutCompletePage{
    constructor(page) {
        this.page = page;
        this.successText = page.locator('.complete-header');
        this.backButton = page.getByRole('button' ,{name:'Back Home'});
        
    }

    async getSuccessText(){
         return await this.successText.textContent();
    }
    async clickBackButton(){
        await this.backButton.click();
    }

}