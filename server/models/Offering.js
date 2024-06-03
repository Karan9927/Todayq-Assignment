const mongoose = require("mongoose");

const OfferingSchema = new mongoose.Schema(
  {
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    location: { type: String },
    language: { type: String },
    category: { type: String },
    logo: { type: String }, // New fields
    websiteurl: { type: String },
    officialEmail: { type: String },
    telegramId: { type: String },
    allowedGambling: { type: Boolean, default: false },
    allowedAdultContent: { type: Boolean, default: false },
    allowedCrypto: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offering", OfferingSchema);
