"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = joi_1.default.object({
    title: joi_1.default.string()
        .label('title')
        .min(5)
        .required(),
    description: joi_1.default.string()
        .label('description')
        .min(10)
        .required(),
    author: joi_1.default.string()
        .required(),
});