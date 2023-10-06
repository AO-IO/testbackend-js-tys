"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Serializer {
    serialize(data, serviceLocator) {
        if (!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map((entity) => this._serializeSingleEntity(entity, serviceLocator));
        }
        return this._serializeSingleEntity(data, serviceLocator);
    }
}
exports.default = Serializer;
;
