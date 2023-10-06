"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../../controllers/UserController"));
const AuthenticationMiddleware_1 = __importDefault(require("../../middlewares/AuthenticationMiddleware"));
const router = (0, express_1.Router)();
router.get('/', UserController_1.default.findUsers);
router.get('/:id', UserController_1.default.getUser);
router.post('/', UserController_1.default.createUser);
router.patch('/:id', UserController_1.default.updateUser);
router.delete('/:id', (0, AuthenticationMiddleware_1.default)(), UserController_1.default.deleteUser);
exports.default = router;
