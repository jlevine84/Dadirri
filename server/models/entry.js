// -----------New Dadirri Schema---------------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require('moment');

const entrySchema = new Schema({
  Mood: { type: Number, required: true },
  Energy: { type: Number, required: true },
  Anxiety: { type: Number, required: true },
  MedicineTaken: { type: Boolean, required: true },
  DailyLog: String,
  SleepHours: Number,
  Exercise: { type: Boolean, required: true },
  ExerciseAmount: String,
  Date: { type: String, unique: true, default: moment().format('MMMM DD YYYY')
}
})

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;