import mongoose from '../mongoose';

const schema = new mongoose.Schema({
  title: String,
  tags: String,
  description: String,
  author: {
    type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"
  },




}, { timestamps: true });

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

export default mongoose.model('Post', schema);
