const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    type: { type: String, require: true },
    previllage: { type: Object, require: true },
    address: { type: String },
    phone: { type: String, require: true, unique: true },
    status: { type: String, enum: ["active", "inactive"] },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("User", userSchema);
module.exports = User;