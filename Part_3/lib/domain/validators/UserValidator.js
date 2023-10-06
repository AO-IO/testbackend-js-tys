"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = joi_1.default.object({
    firstName: joi_1.default.string()
        .label('first_name')
        .min(2)
        .required(),
    lastName: joi_1.default.string()
        .label('last_name')
        .min(1)
        .required(),
    email: joi_1.default.string()
        .label('email')
        .email()
        .required(),
    password: joi_1.default.string()
        .label('password')
        .alter({
        create: (schema) => schema.pattern(/^[a-zA-Z0-9]{3,30}$/),
        update: (schema) => schema.pattern(/^\$2[ayb]\$.{56}$/)
    })
        .required(),
    phone: joi_1.default.string()
        .label('phone')
        .min(10)
        .regex(/^\d+$/)
        .optional(),
}).unknown();
