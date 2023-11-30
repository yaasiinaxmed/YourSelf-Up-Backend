import mongoose from "mongoose";

const challengesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    tasks: [
     {
      isTrue: Boolean,
      isFalse: Boolean
     }
    ],
  },
  { timestamps: true }
);

const challengesModel = mongoose.model("Challenge", challengesSchema);

export default challengesModel;
