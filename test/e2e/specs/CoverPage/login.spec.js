import config from '../../../../config/index.js';

const project_url = `http://localhost:${config.dev.port}`;
console.log(project_url);

module.exports = {

  'component AllViweNav loaded': function(browser) {
    browser
      .page.cover().didMount()
      .page.cover().loginAndRedirect()
      .end()

  }
}
