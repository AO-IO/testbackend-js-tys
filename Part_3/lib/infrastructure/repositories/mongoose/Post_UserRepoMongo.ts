import PostUser from "../../../domain/entities/UserPost";
import UserBlogPost from "../../orm/mongoose/schemas/Post_User";
import PostUserRepo from "../../../domain/repositories/PostUserRepo";
import UserPostSTO from "../../stos/mongoose/UserPostSTO";
import { ID } from "../../../domain/entities/Entity";
export default class Post_UserRepoMongo implements PostUserRepo {
  async persist(domainEntity: PostUser): Promise<PostUser | null> {
    const {
      user_id,
      blog_post_id,
     
    } = domainEntity;
    const mongoPostUser = new UserBlogPost({
        user_id : user_id,
        blog_post_id: blog_post_id,
     
    });
    await mongoPostUser.save();
    return UserPostSTO(mongoPostUser);
  }

//   async merge(domainEntity: Post): Promise<Post | null> {
//     const {
//       id,
//       title,
//       tags,
//       description,
//       author
//     } = domainEntity;
//     const mongoPost = await MongoPost.findByIdAndUpdate(
//       id,
//       {
        
//         title: title,
//         tags : tags,
//         description: description,
//         author: author
//       },
//       {
//         new: true,
//       }
//     );
//     return PostSTO(mongoPost);
//   }

//   async remove(entityId: ID): Promise<boolean | null> {
//     return MongoPost.findOneAndDelete({ _id: entityId });
//   }

  async get(postdata: any): Promise<PostUser | null> {
    const mongopostUser = await UserBlogPost.find({user_id:postdata.user_id,blog_post_id:postdata.blog_post_id});
    if (!mongopostUser) return null;
    return UserPostSTO(mongopostUser);
  }

// //   async getByEmail(email: string): Promise<User | null> {
// //     const mongooseUser = await MongooseUser.findOne({ email });
// //     if (!mongooseUser) return null;
// //     return UserSTO(mongooseUser);
// //   }

// async find(): Promise<Post[]> {
//     const mongoposts = await MongoPost.find().sort({ createdAt: -1 });
//     return mongoposts
//       .map((post) => PostSTO(post))
//       .filter((post: Post | null): post is Post => post != null);
//   }
}
