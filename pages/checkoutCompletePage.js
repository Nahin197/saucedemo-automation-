export  class checkoutCompletePage{
    constructor(page) {
        this.page = page;
        this.successText = page.locator('.complete-header');
        
    }

    async getSuccessText(){
        await this.successText.textContent();
    }

}