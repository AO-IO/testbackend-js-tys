"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BlogController_1 = __importDefault(require("../../controllers/BlogController"));
const router = (0, express_1.Router)();
// router.get('/get-posts', );
router.post('/add-post', BlogController_1.default.createPost);
// router.delete('/delete-post/:id', );
// router.patch('/update-post/:id', );
exports.default = router;
