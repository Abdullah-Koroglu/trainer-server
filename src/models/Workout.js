const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  timestamp: Number,
instants:{
    HR: Number,
    rpm: Number,
    time: Number}
});
const workoutSchema = new mongoose.Schema({
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

mongoose.model('Workout', workoutSchema);
