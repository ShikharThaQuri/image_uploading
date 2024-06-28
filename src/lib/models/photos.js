const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    image_url: {
      type: String,
      require: true,
    },
    public_id: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.photos || mongoose.model("photos", photoSchema);
