import PostValidator from '../../../domain/validators/PostValidator';
import getPost from './getPost';
import { ServiceLocator } from '../../../infrastructure/config/service-locator';

export default async (postData: any, serviceLocator: ServiceLocator) => {
  const { PostRepo } = serviceLocator;
  let post = await getPost(postData.id, serviceLocator);
  if (post == null) throw new Error('Unknown ID');
  post = { ...post, ...postData };
  await PostValidator.tailor('update').validateAsync(postData);
  return PostRepo!.merge(post);
};
