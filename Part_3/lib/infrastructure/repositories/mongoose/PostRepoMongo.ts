import Post from "../../../domain/entities/Post";
import MongoPost from "../../orm/mongoose/schemas/Post";
import PostUser from "../../orm/mongoose/schemas/Post_User";
// import UserRepository from "../../../domain/repositories/UserRepository";
import PostSTO from "../../stos/mongoose/PostSTO";
import { ID } from "../../../domain/entities/Entity";
import PostRepository from "../../../domain/repositories/PostRepo";
export default class PostRepoMongo implements PostRepository {
  async persist(domainEntity: Post): Promise<Post | null> {
    const {
      title,
      author,
      description,
      tags,
    } = domainEntity;
    const mongoPost = new MongoPost({
        title: title,
        author: author,
        description : description,
        tags: tags,
    });
    await mongoPost.save();
    return PostSTO(mongoPost);
  }

  async merge(domainEntity: Post): Promise<Post | null> {
    const {
      id,
      title,
      tags,
      description,
      author
    } = domainEntity;
    const mongoPost = await MongoPost.findByIdAndUpdate(
      id,
      {
        
        title: title,
        tags : tags,
        description: description,
        author: author
      },
      {
        new: true,
      }
    );
    return PostSTO(mongoPost);
  }

  async remove(entityId: ID): Promise<boolean | null> {
    // return MongoPost.findOneAndDelete({ _id: entityId });
    return true;
  }
  async removeByUser(userId : ID) :  Promise<boolean | null>{
    await MongoPost.deleteMany({ author: userId });
    await PostUser.deleteMany({user_id:userId})
    return true

  }
  async get(entityId: ID): Promise<Post | null> {
    const mongopost = await MongoPost.findById(entityId);
    if (!mongopost) return null;
    return PostSTO(mongopost);
  }

//   async getByEmail(email: string): Promise<User | null> {
//     const mongooseUser = await MongooseUser.findOne({ email });
//     if (!mongooseUser) return null;
//     return UserSTO(mongooseUser);
//   }

async find(): Promise<Post[]> {
    const mongoposts = await MongoPost.find().sort({ createdAt: -1 });
    return mongoposts
      .map((post) => PostSTO(post))
      .filter((post: Post | null): post is Post => post != null);
  }
}
