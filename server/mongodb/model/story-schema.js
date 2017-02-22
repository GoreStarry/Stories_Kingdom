const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const StorySchema = new Schema({
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
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  },
})

StorySchema.pre('save', function(next) {
  const now = new Date();
  if (!this.updateTime) {
    this.updateTime = now;
  }
  next();
})

const Story = mongoose.model('Story', StorySchema);

module.exports = Story;
