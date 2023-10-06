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
const joi_1 = require("joi");
const createPost_1 = __importDefault(require("../../application/use_cases/blog/createPost"));
exports.default = {
    createPost(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // Context
            const serviceLocator = request.serviceLocator;
            console.log(serviceLocator);
            let data = request.body;
            data = {
                title: data.title,
                author: data.author,
                tags: data.tags,
                description: data.description,
            };
            // Treatment
            let post = null;
            let error = null;
            try {
                post = yield (0, createPost_1.default)(data, serviceLocator);
            }
            catch (err) {
                if (err instanceof joi_1.ValidationError) {
                    error = err.details[0].message;
                }
                else if (err instanceof Error) {
                    // 'Error occurred while creating user'
                    error = err.message;
                }
            }
            // Output
            if (!post) {
                return response.status(400).json({ message: error });
            }
            const output = serviceLocator.PostSerializer.serialize(post, serviceLocator);
            return response.status(201).json(output);
        });
    },
};
