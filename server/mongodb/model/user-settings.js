const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const userSettingsSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  storiesOrder: [{
    _id: false,
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Story'
    }
  }]
})

const UserSettings = mongoose.model('User', userSettingsSchema);

module.exports = UserSettings;
