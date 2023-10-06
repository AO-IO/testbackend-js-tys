import { ID } from '../../../domain/entities/Entity';
import { ServiceLocator } from '../../../infrastructure/config/service-locator';
import Post from '../../../infrastructure/orm/mongoose/schemas/Post';

export default async (postId: ID, { PostRepo }: ServiceLocator) => {
  const post = await PostRepo!.get(postId);
  if (!post) {
    throw new Error('Invalid Post id');
  }
  return post;
};
