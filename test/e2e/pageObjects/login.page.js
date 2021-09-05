class Page {
  open(path = '/login') {
    browser.url(path);
  }
}

module.exports = new Page();
