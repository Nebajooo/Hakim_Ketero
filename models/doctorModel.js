const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId, // Corrected "objectId" to "ObjectId"
      ref: "User",
      required: true,
    },
    specialization: {
      type: String, // Fixed typo "tyep" to "type"
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", schema);
module.exports = Doctor;
