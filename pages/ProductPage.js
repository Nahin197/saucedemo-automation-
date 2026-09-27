export class ProductPage {
    constructor(page) {
        this.page = page;
        this.menu = page.locator('#react-burger-menu-btn');
        this.resetButton = page.getByRole('button', { name : 'Reset App State'});
        this.addToCartButtons = page.getByRole('button' , {name: 'Add to cart'});
        this.closeMenu = page.getByRole('button' ,{ name: 'Close Menu'});
        this.logout = page.getByRole('button' ,{ name: 'Logout'});
        this.shoppingCartLink = page.locator('.shopping_cart_link');

    }


    async clickMenu(){
        await this.menu.click();
    }

     async clickResetButton(){
        await this.resetButton.click();
    }

    async clickCloseMenu(){
        await this.closeMenu.click();
    }

    clickAddToCart(){
        return this.addToCartButtons;
    }

     async clickShoppingCartLink(){
        await this.shoppingCartLink.click();
    }
    async clickLogout(){
        await this.logout.click();
    }


}