const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const storySchema = new Schema({
  createBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  createTime: {
    type: Date,
    default: Date.now()
  },
  updateTime: {
    type: Date,
    default: Date.now()
  },
  close: {
    type: Boolean,
    default: false
  }
})

const postUpdateTime = require('./middleware/postUpdateTime.js')
storySchema.post('findOneAndUpdate', postUpdateTime);


const Story = mongoose.model('Story', storySchema);

module.exports = Story;
