import mongoose from "mongoose";

const MetadataSchema = new mongoose.Schema({});

export default mongoose.models.metadata ||
  mongoose.model("metadata", MetadataSchema);
