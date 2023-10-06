"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("./constants"));
const environment_1 = __importDefault(require("./environment"));
// Implementations
const BcryptPasswordManager_1 = __importDefault(require("../security/BcryptPasswordManager"));
const JwtAccessTokenManager_1 = __importDefault(require("../security/JwtAccessTokenManager"));
const UserSerializer_1 = __importDefault(require("../../interfaces/serializers/UserSerializer"));
// Mongo
const UserRepositoryMongo_1 = __importDefault(require("../repositories/mongoose/UserRepositoryMongo"));
function buildBeans() {
    const beans = {
        passwordManager: new BcryptPasswordManager_1.default(),
        accessTokenManager: new JwtAccessTokenManager_1.default(),
        userSerializer: new UserSerializer_1.default(),
    };
    if (environment_1.default.database.dialect === constants_1.default.SUPPORTED_DATABASE.MONGO) {
        beans.userRepository = new UserRepositoryMongo_1.default();
    }
    return beans;
}
exports.default = buildBeans();
