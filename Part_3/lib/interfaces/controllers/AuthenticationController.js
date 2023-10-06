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
const AttemptLogin_1 = __importDefault(require("../../application/use_cases/auth/AttemptLogin"));
const GetAccessToken_1 = __importDefault(require("../../application/use_cases/auth/GetAccessToken"));
exports.default = {
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // Context
            const serviceLocator = request.serviceLocator;
            // Input
            const { email, password } = request.body;
            // Treatment
            let user = null;
            try {
                user = yield (0, AttemptLogin_1.default)(email, password, serviceLocator);
                user.accessToken = yield (0, GetAccessToken_1.default)(user, serviceLocator);
            }
            catch (err) {
                console.log(err);
            }
            // Output
            if (!user) {
                return response.status(401).json({ 'message': 'Bad credentials' });
            }
            const output = serviceLocator.userSerializer.serialize(user, serviceLocator);
            return response.json(output);
        });
    },
};
