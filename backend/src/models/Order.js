
/**
 * OceanAI — Order Model
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: {
      type: [String],
      required: true
    },

    total: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending"
    },

    paymentId: {
      type: String,
      required: false
    },

    notes: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
