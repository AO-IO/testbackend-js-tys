"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Serializer_1 = __importDefault(require("./Serializer"));
class PostSerializer extends Serializer_1.default {
    _serializeSingleEntity(entity, serviceLocator) {
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
}
exports.default = PostSerializer;
;
