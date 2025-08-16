import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // Hospital, Clinic, Pharmacy, Ambulance
  location: { type: String, required: true },
  contact: { type: String },
  lat: { type: Number },
  lng: { type: Number },
});

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
