module.exports = {

  'component AllViweNav loaded': function(browser) {

    browser
      .page.global()
      .navigate()
      .appDidMount();

    browser
      .page.cover()
      .loginAndRedirect()
      .end()

  }
}
