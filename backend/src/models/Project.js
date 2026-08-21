/**
 * OceanAI — Project Model
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true,
      minlength: 3
    },

    description: {
      type: String,
      default: ""
    },

    html: {
      type: String,
      default: ""
    },

    css: {
      type: String,
      default: ""
    },

    js: {
      type: String,
      default: ""
    },

    tags: {
      type: [String],
      default: []
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft"
    },

    previewImage: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const ProjectModel = mongoose.model("Project", ProjectSchema);

export default ProjectModel;
