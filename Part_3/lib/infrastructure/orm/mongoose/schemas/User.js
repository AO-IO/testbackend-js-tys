"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("../mongoose"));
const schema = new mongoose_1.default.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
        required: false,
        default: null,
    },
    password: String,
}, { timestamps: true });
schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });
exports.default = mongoose_1.default.model('User', schema);
