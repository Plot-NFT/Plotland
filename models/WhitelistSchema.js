import mongoose from "mongoose";

const WhitelistSchema = new mongoose.Schema(
  {
    wallet: {
      type: String,
      required: true,
    },
    network: {
      type: {
        chainId: Number,
        chainName: String,
      },
    },
    mailingStatus: {
      type: String,
      enum: ["unregistered", "registered"],
      default: "unregistered",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.whitelist ||
  mongoose.model("whitelist", WhitelistSchema);
