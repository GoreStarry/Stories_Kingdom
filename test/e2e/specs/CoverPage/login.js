import config from '../../../../config/index.js';

const project_url = `http://localhost:${config.dev.port}`;
console.log(project_url);

module.exports = {
  'all viwe nav loaded'(browser) {
    browser
      .url(project_url)
      .waitForElementVisible('#app')
      .assert.elementPresent('body')
      .end()

  }
}
