module.exports = {

  'Add A New Story'(browser) {

    browser
      .page.global()
      .navigate()
      .appDidMount()
      .login()

    browser
      .page.StoriesList.stories()
      .navigate()
      .addStory()

    browser.end();

  },

}
