import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String }
});

const Donor = mongoose.model("Donor", donorSchema);
export default Donor;
