import { ID } from '../../../domain/entities/Entity';
import { ServiceLocator } from '../../../infrastructure/config/service-locator';

export default (userId: ID, { PostRepo }: ServiceLocator) => PostRepo!.removeByUser(userId);
