export class checkoutInfoPage {
    constructor(page) {
        this.page = page;
        this.firstName = this.page.getByRole('textbox', { name: 'First Name' });
        this.LastName = this.page.getByRole('textbox', { name: 'Last Name' });
        this.postalCode = this.page.getByRole('textbox', { name: 'Zip/Postal Code' });
        this.continueButton = this.page.getByRole('button',{ name:'Continue'});

    }

    async fillFirstName(first_name){
        await this.firstName.fill(first_name);
    }
    async fillLastName(last_name){
        await this.LastName.fill(last_name);
    }
    async fillPostalCode (postal_code){
        await this.postalCode.fill(postal_code);
    }
    async clickContinue(){
        await this.continueButton.click();
    }
    


}