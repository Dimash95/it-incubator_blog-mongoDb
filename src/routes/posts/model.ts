import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 30 },
  shortDescription: { type: String, required: true, maxlength: 100 },
  content: { type: String, required: true, maxlength: 1000 },
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
  blogName: { type: String, required: true },
});

export const PostModel = mongoose.model("Post", PostSchema);
