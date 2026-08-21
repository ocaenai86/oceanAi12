/**
 * OceanAI — File Model
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: false
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

    filename: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["html", "css", "js", "asset", "other"],
      default: "other"
    },

    size: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const FileModel = mongoose.model("File", FileSchema);

export default FileModel;
