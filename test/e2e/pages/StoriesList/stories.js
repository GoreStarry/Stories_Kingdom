import config from '../../../../config/index.js';
import { stories_list } from '../../../../config/route-url.js';

const project_url = `http://localhost:${config.dev.port}/${stories_list}`;

import faker from 'faker';

module.exports = {
  url: project_url,
  elements: {

  },
  commands: [
    {
      addStory: function() {
        return this.setValue('#input__newStory_name', faker.name.findName())
          .setValue('#input__newStory_desc', faker.name.jobDescriptor())
          .click('#btn__addStory');
      }
    }
  ]
}
