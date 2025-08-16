const mongoose = require('mongoose');
const ResourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String },
  lat: { type: Number },
  lng: { type: Number }
}, { timestamps: true });
module.exports = mongoose.model('Resource', ResourceSchema);
