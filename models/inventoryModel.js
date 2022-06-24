const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: "Product", require: true },
    supplier: { type: mongoose.Types.ObjectId, ref: "Supplier", require: true },
    warehouse: {
      type: mongoose.Types.ObjectId,
      ref: "Warehouse",
      require: true,
    },
    currentQty: { type: mongoose.Types.Decimal128, require: true },
    openingQty: { type: mongoose.Types.Decimal128, require: true },
    totalQty: { type: mongoose.Types.Decimal128, require: true },
    soldQty: { type: mongoose.Types.Decimal128, require: true },
    status: { type: String, enum: ["active", "inactive"] },
  },
  {
    timestamps: true,
  }
);

const Inventory = new mongoose.model("Inventory", inventorySchema);
module.exports = Inventory;
