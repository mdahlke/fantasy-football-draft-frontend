const Page = require('../pageObjects/forgot-password.page');

describe('Login Page', () => {
  it('should open the login page', () => {
    Page.open();
    expect(browser).toHaveTitle('Forgot Password - nuxt-laravel-auth');
  });

  it('should have the correct registration fields', () => {
    const email = $('#forgot-email');

    expect(email).toExist();
  });
});
