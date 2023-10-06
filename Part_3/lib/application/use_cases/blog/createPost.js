"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../../../domain/entities/Post"));
const PostValidator_1 = __importDefault(require("../../../domain/validators/PostValidator"));
exports.default = (newPost, { PostRepo }) => __awaiter(void 0, void 0, void 0, function* () {
    yield PostValidator_1.default.tailor('create').validateAsync(newPost);
    const post = new Post_1.default({
        title: newPost.title,
        author: newPost.author,
        description: newPost.description,
        tags: newPost.tags,
    });
    return PostRepo.persist(post);
});
