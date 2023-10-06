"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Serializer_1 = __importDefault(require("./Serializer"));
class UserSerializer extends Serializer_1.default {
    _serializeSingleEntity(entity, serviceLocator) {
        const userObj = {
            'id': entity.id,
            'first_name': entity.firstName,
            'last_name': entity.lastName,
            'email': entity.email,
            'phone': entity.phone,
            'access_token': entity.accessToken ? entity.accessToken : undefined,
        };
        return userObj;
    }
}
exports.default = UserSerializer;
;
