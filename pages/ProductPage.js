export class ProductPage {
    constructor(page) {
        this.page = page;
        this.menu = page.locator('#react-burger-menu-btn');
        this.resetButton = page.getByRole('button', { name: 'Reset App State' });
        this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
        this.closeMenu = page.getByRole('button', { name: 'Close Menu' });
        this.logout = page.getByRole('button', { name: 'Logout' });
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.filterButton = page.locator('.product_sort_container');
        this.filterButton1 = page.getByLabel('Sort products').selectOption({ label: 'Name (Z to A)' });
        this.filterButton2 = page.locator('.product_sort_container').selectOption('za');

    }


    async clickMenu() {
        await this.menu.click();
    }

    async clickResetButton() {
        await this.resetButton.click();
    }

    async clickCloseMenu() {
        await this.closeMenu.click();
    }

    clickAddToCart() {
        return this.addToCartButtons;
    }

    async clickShoppingCartLink() {
        await this.shoppingCartLink.click();
    }
    async clickLogout() {
        await this.logout.click();
    }

    async selectSortOption(option) {
        await this.filterButton.click();
        await this.page.waitForTimeout(2000);
        await this.filterButton.selectOption(option);
    }


}