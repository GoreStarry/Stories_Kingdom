import faker from 'faker';
const story_name = faker.name.findName();
const story_description = faker.name.jobDescriptor();

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
      .didMount()
      .addStory(story_name, story_description)

    browser.end();

  },
  'Delete the Last story'(browser) {
    browser
      .page.global()
      .navigate()
      .appDidMount()
      .login()

    browser
      .page.StoriesList.stories()
      .navigate()
      .didMount()
      .deleteStory(story_name)

    browser.end();
  }

}
