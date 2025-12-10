const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }],
  profile: {
    fullName: String,
    dateOfBirth: Date,
    phoneNumber: String,
    address: String,
    // Champs spécifiques patient
    bloodType: String,
    allergies: [String],
    // Champs spécifiques infirmier
    licenseNumber: String,
    specialty: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);