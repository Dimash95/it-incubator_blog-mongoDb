import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 15 },
  description: { type: String, required: true, maxlength: 500 },
  websiteUrl: { type: String, required: true, maxlength: 100 },
});

export const BlogModel = mongoose.model("Blog", BlogSchema);
