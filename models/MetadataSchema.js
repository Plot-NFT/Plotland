import mongoose from "mongoose";

const MetadataSchema = new mongoose.Schema({
  tokenId: {
    type: Number,
    required: true,
  },
  tokenURI: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number,
    min: -180,
    max: 180,
    required: true,
  },
  latitude: {
    type: Number,
    min: -66,
    max: 66,
    required: true,
  },
  quadrant: {
    type: Number,
    min: 1,
    max: 4,
    required: true,
  },
  openseaUrl: {
    type: String,
    required: true,
  },
  maticUrl: {
    type: String,
    required: true,
  },
});

export default mongoose.models.metadata ||
  mongoose.model("metadata", MetadataSchema);
