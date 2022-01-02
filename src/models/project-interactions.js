var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ProjectInteractionsSchema = new Schema(
  {
    project: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    interactions: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Project Interactions",
  ProjectInteractionsSchema
);
