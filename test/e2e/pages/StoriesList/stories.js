import config from '../../../../config/index.js';
import { stories_list } from '../../../../config/route-url.js';

const project_url = `http://localhost:${config.dev.port}/${stories_list}`;

module.exports = {
  url: project_url,
  elements: {

  },
  commands: [
    {
      addStory: function() {
        return this.click('#btn__addStory');
      }
    }
  ]
}
