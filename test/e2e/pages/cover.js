import config from '../../../config/index.js';

const project_url = `http://localhost:${config.dev.port}`;

module.exports = function(browser) {

  this.didMount = () => {
    return browser
      .url(project_url)
      .waitForElementVisible('#app>div');
  };

  this.loginAndRedirect = () => {
    return browser
      .setValue('#input_login', 'Gore')
      .click('#btn_login')
      .assert.urlContains('draft_test')
  };

}
