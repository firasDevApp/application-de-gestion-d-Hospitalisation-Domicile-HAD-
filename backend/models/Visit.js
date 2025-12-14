const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  visitType: {
    type: String,
    required: true
  },

  prefferedInfermier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    default: null
  },

  date: {
    type: String,
    required: true
  },

  time: {
    type: String,
    default: null
  },

  description: {
    type: String,
    required: true
  },

  symptoms: {
    type: String,
    default: ''
  },

  status: {
    type: String,
    enum: ['pending', 'accepted', 'refused', 'done'],
    default: 'pending'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Visit', VisitSchema);
