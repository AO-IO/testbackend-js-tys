import Post from "../../domain/entities/Post";
import { ServiceLocator } from "../../infrastructure/config/service-locator";
import Serializer from "./Serializer";

export default class PostSerializer extends Serializer {
  _serializeSingleEntity(entity: Post, serviceLocator: ServiceLocator): object {
    const postObj = {
      'id': entity.id,
      'title': entity.title,
      'description': entity.description,
      'tags': entity.tags,
      'author': entity.author,
    //   'access_token': entity.accessToken ? entity.accessToken : undefined,
    };
    return postObj;
  }
};
