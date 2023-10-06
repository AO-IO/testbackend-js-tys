

import mongoose from '../mongoose';

const schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  blog_post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost', 
  }
}, { timestamps: true });

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

export default mongoose.model('BlogPostUser', schema);
