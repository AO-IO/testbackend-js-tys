"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VerifyAccessToken_1 = __importDefault(require("../../application/use_cases/auth/VerifyAccessToken"));
exports.default = ({ isOptional = false } = { isOptional: false }) => (request, response, next) => {
    // Context
    const serviceLocator = request.serviceLocator;
    // Input
    const authorizationHeader = request.headers.authorization;
    try {
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            throw new Error('Missing or wrong Authorization request header');
        }
        const accessToken = authorizationHeader.replace(/Bearer/gi, '').replace(/ /g, '');
        // Treatment
        const { uid, role } = (0, VerifyAccessToken_1.default)(accessToken, serviceLocator);
        request.userId = uid;
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
        if (!isOptional)
            return response.status(401).json({ 'message': 'Invalid Token' });
    }
    return next();
};
