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
const UserValidator_1 = __importDefault(require("../../../domain/validators/UserValidator"));
const GetUser_1 = __importDefault(require("./GetUser"));
exports.default = (userData, serviceLocator) => __awaiter(void 0, void 0, void 0, function* () {
    const { userRepository } = serviceLocator;
    let user = yield (0, GetUser_1.default)(userData.id, serviceLocator);
    if (user == null)
        throw new Error('Unknown ID');
    user = Object.assign(Object.assign({}, user), userData);
    yield UserValidator_1.default.tailor('update').validateAsync(user);
    return userRepository.merge(user);
});
