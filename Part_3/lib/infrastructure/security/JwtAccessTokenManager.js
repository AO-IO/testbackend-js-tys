"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = __importDefault(require("../config/environment"));
class JwtAccessTokenManager {
    generate(payload) {
        return jsonwebtoken_1.default.sign(payload, environment_1.default.jwtSecretKey);
    }
    decode(accessToken) {
        const token = jsonwebtoken_1.default.verify(accessToken, environment_1.default.jwtSecretKey);
        return token != null ? token : null;
    }
}
exports.default = JwtAccessTokenManager;
;
