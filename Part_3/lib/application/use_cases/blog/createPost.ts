import { ServiceLocator } from './../../../infrastructure/config/service-locator';
import Post from '../../../domain/entities/Post';
import PostValidator from '../../../domain/validators/PostValidator';
export default async (newPost : any,  {
  PostRepo
  
}: ServiceLocator ) => {
  await PostValidator.tailor('create').validateAsync(newPost);
  const post : Post = new Post({
    title: newPost.title,
    author: newPost.author,
    description: newPost.description,
    tags: newPost.tags,
  });
  return PostRepo!.persist(post);
};