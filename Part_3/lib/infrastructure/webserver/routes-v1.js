"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../interfaces/routes/v1/auth"));
const users_1 = __importDefault(require("../../interfaces/routes/v1/users"));
const blog_1 = __importDefault(require("../../interfaces/routes/v1/blog"));
const router = (0, express_1.Router)();
router.use('/auth', auth_1.default);
router.use('/post', blog_1.default);
router.use('/users', users_1.default);
exports.default = router;
