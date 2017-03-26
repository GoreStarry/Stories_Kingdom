import config from '../../../config/index.js';

const project_url = `http://localhost:${config.dev.port}`;

module.exports = {
  url: project_url,
  elements: {

  },
  commands: [
    {
      appDidMount: function() {
        return this.waitForElementVisible('#app>div');
      },
      login: function() {
        return this.setValue('#input_login', 'Gore')
          .click('#btn_login')
      }
    }
  ]
}
