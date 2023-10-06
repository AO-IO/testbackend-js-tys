import { ID } from '../../../domain/entities/Entity';
import { ServiceLocator } from '../../../infrastructure/config/service-locator';
import PostUser from '../../../infrastructure/orm/mongoose/schemas/Post_User';

export default async (postData:any, { PostUserRepo }: ServiceLocator) => {
  const post = await PostUserRepo!.get(postData);
  if (!post) {
    throw new Error('Invalid Post id');
  }
  return post;
};
