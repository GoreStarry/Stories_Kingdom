module.exports = {

  'Add A New Story'(browser) {

    browser
      .page.global()
      .navigate()
      .appDidMount()

    browser
      .page.StoriesList.stories()
      .addStory()

    browser.end();

  },

}
