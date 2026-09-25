export class LoginPage {

    constructor(page) {
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.login = page.getByRole('button', { name: 'Login' });
        this.alert = page.getByRole('alert');
    }

    async goto(){
        await this.page.goto('https://www.saucedemo.com/');
        
    }

    async input(username ,password) {
        await this.username.fill(username);
        await this.page.waitForTimeout(1000);
        await this.password.fill(password);
        await this.page.waitForTimeout(1000);
    }

    async clickLoginButton(){
        await this.login.click();
    }

     getAlertLocator(){
        return this.alert;
    } 



}