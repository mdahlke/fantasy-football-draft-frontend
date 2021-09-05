const Page = require('../pageObjects/login.page');

describe('Login Page', () => {
  it('should open the login page', () => {
    Page.open();
    expect(browser).toHaveTitle('Login - nuxt-laravel-auth');
  });

  it('should have an email and password field', () => {
    const email = $('#login-email');
    const password = $('#login-password');

    expect(email).toExist();
    expect(password).toExist();
  });
});
