const mongoose = require("mongoose");

const participationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["confirmed", "pending", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true },
);

participationSchema.index({ eventId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Participation", participationSchema);
