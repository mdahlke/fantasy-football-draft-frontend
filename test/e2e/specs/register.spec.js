const Page = require('../pageObjects/register.page');

describe('Login Page', () => {
  it('should open the login page', () => {
    Page.open();
    expect(browser).toHaveTitle('Register - nuxt-laravel-auth');
  });

  it('should have the correct registration fields', () => {
    const name = $('#register-name');
    const email = $('#register-email');
    const password = $('#register-password');
    const passwordConfirm = $('#register-password-confirm');

    expect(name).toExist();
    expect(email).toExist();
    expect(password).toExist();
    expect(passwordConfirm).toExist();
  });
});
