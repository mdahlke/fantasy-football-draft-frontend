class Page {
  open(path = '/register') {
    browser.url(path);
  }
}

module.exports = new Page();
