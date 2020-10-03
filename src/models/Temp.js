const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  timestamp: Number,
  instants: {
    maxHR: Number,
    minHR: Number,
    duration: Number,
    rpm: Number,
    sessionID: Number
  }
});
const tempSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    default: ''
  },
  datas: [pointSchema],
  date: {
  	type : Date,
  	default : 1
  }
});

mongoose.model('Temp', tempSchema);
