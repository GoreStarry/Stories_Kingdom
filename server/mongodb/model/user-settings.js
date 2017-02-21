const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const userSettingsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  storiesOrder: [{
    type: Schema.Types.ObjectId,
    ref: 'Story'
  }]
})

const UserSettings = mongoose.model('UserSettings', userSettingsSchema);

module.exports = UserSettings;
