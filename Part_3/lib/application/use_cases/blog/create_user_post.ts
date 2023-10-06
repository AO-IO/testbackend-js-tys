import { ServiceLocator } from './../../../infrastructure/config/service-locator';
import PostUser from '../../../domain/entities/UserPost';
// import PostValidator from '../../../domain/validators/PostValidator';
export default async (newPost : any,  {
  PostUserRepo
  
}: ServiceLocator ) => {
    // console.log(PostUserRepo)
//   await PostValidator.tailor('create').validateAsync(newPost);
  const postuser : PostUser = new PostUser({
   user_id:newPost.user_id,
   blog_post_id:newPost.blog_post_id
  });
  return PostUserRepo!.persist(postuser);
};