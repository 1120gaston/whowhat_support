const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Title is required'
  },
  description: {
    type: String,
    required: 'Description is required'
  },
  type: {
    type: String,
    required: 'Type is required'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const MyModel = mongoose.model('MyModel', mySchema);

module.exports = MyModel;