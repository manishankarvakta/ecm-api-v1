const mongoose = require("mongoose");
const projectSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        pid: { type: String, require: true },
        client: { type: String, require: true },
        location: { type: String, require: true },
        details: { type: String, require: true },
        budgets: { type: String, require: true },
        stuff: { type: String, require: true },
        projectManager: { type: String, require: true },
        duration: { type: String, require: true },
        workOrder: { type: String, require: true },
        manager: { type: String, require: true },
        engineer: { type: mongoose.Types.ObjectId, ref: "User" },
        subContractor: { type: String, require: true },
        status: { type: String, enum: ["active", "suspend"] },
    },
    {
        timestamps: true,
    }
);
const project = new mongoose.model("Project", projectSchema);
module.exports = project;