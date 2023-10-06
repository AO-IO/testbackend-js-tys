import { ID } from '../../../domain/entities/Entity';
import { ServiceLocator } from '../../../infrastructure/config/service-locator';

export default (postId: ID, { PostRepo }: ServiceLocator) => PostRepo!.remove(postId);
