import UserPost from '../../../../domain/entities/UserPost';
import mongoose from '../mongoose';
import Post_User from './Post_User';
import Post from './Post';

const schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    required: false,
    default: null,
  },
  password: String,
}, { timestamps: true });

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

schema.pre('findOneAndDelete', async function (next) {
  console.log('Pre-remove middleware triggered for user with id:', this._id);

  await Post.deleteMany({ author: (this as any)?._id });
  next();
});

export default mongoose.model('User', schema);
