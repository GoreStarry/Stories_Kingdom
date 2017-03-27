import config from '../../../../config/index.js';
import { stories_list } from '../../../../config/route-url.js';

const project_url = `http://localhost:${config.dev.port}/${stories_list}`;


module.exports = {
  url: project_url,
  elements: {
    Name_Of_First_Story_In_List: ".StoriesList__list>div>div:nth-child(2) .detail__name",
    Description_Of_First_Story_In_List: ".StoriesList__list>div>div:nth-child(2) .detail__description",
    Delete_Btn_Of_First_Story_In_List: '.StoriesList__list>div>div:nth-child(2) .btn__delete',
  },
  commands: [
    {
      didMount: function() {
        return this
          .waitForElementVisible('.box__addStory');
      },
      pause: function(time) {
        this.api.pause(time)
        return this
      },
      addStory: function(story_name, story_description) {

        return this
          .setValue('#input__newStory_name', story_name)
          .setValue('#input__newStory_desc', story_description)
          .click('#btn__addStory')
          .pause(500)
          .assert.containsText('@Name_Of_First_Story_In_List', story_name)
          .assert.containsText("@Description_Of_First_Story_In_List", story_description)
      },
      deleteStory: function(story_name) {
        return this
          .click('@Delete_Btn_Of_First_Story_In_List')
          .waitForElementVisible('.modals')
          .click('.modals .green.button')
          .expect.element('@Name_Of_First_Story_In_List').text.to.not.equal(story_name)
      }
    }
  ]
}
