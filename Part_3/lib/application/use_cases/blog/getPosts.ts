import { ServiceLocator } from '../../../infrastructure/config/service-locator';

export default async ({ PostRepo }: ServiceLocator) => PostRepo!.find();