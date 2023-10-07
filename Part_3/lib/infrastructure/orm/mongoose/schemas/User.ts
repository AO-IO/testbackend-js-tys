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



export default mongoose.model('User', schema);
