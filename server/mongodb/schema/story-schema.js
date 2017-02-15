const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const storySchema = new Schema({
  storyId: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  },
})

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
