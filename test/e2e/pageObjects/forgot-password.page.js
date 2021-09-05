class Page {
  open(path = '/forgot-password') {
    browser.url(path);
  }
}

module.exports = new Page();
