"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __importDefault(require("./Entity"));
class Post extends Entity_1.default {
    constructor({ id, title, description, author, tags, }) {
        super({ id });
        this.title = title;
        this.author = author;
        this.tags = tags;
        this.description = description;
    }
}
exports.default = Post;
;
