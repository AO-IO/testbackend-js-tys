"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("../mongoose"));
const schema = new mongoose_1.default.Schema({
    title: String,
    tags: String,
    description: String,
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "User"
    },
}, { timestamps: true });
schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });
exports.default = mongoose_1.default.model('Post', schema);
