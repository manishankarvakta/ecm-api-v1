const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    details: { type: String, require: true },
    category: { type: mongoose.Types.ObjectId, ref: "Category", require: true },
    unit: { type: mongoose.Types.ObjectId, ref: "Unit", require: true },
    photo: { type: String },
    status: { type: String, enum: ["active", "suspend"] },
  },
  {
    timestamps: true,
  }
);
const product = new mongoose.model("product", productSchema);
module.exports = product;
