"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../domain/entities/User"));
exports.default = (schemaEntity) => {
    if (!schemaEntity)
        return null;
    return new User_1.default({
        id: schemaEntity.id,
        firstName: schemaEntity.first_name,
        lastName: schemaEntity.last_name,
        email: schemaEntity.email,
        phone: schemaEntity.phone,
        password: schemaEntity.password,
    });
};
