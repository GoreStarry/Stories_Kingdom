const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const storiesOrderSchema = new Schema({
  storiesOrder: [{
    type: Schema.Types.ObjectId,
    ref: 'Story'
  }]
})

const StoriesOrder = mongoose.model('StoriesOrder', storiesOrderSchema);

module.exports = StoriesOrder;
