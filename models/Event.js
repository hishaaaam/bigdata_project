const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  coordinatorName: { type: String, required: true },
  coordinatorEmail: { type: String, required: true }
});

module.exports = mongoose.model('Event', eventSchema);