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
const User_1 = __importDefault(require("../../orm/mongoose/schemas/User"));
const UserSTO_1 = __importDefault(require("../../stos/mongoose/UserSTO"));
class UserRepositoryMongo {
    persist(domainEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, phone, password, } = domainEntity;
            const mongooseUser = new User_1.default({
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
                password,
            });
            yield mongooseUser.save();
            return (0, UserSTO_1.default)(mongooseUser);
        });
    }
    merge(domainEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, firstName, lastName, email, phone, password, } = domainEntity;
            const mongooseUser = yield User_1.default.findByIdAndUpdate(id, {
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
                password,
            }, {
                new: true,
            });
            return (0, UserSTO_1.default)(mongooseUser);
        });
    }
    remove(entityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findOneAndDelete({ _id: entityId });
        });
    }
    get(entityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const mongooseUser = yield User_1.default.findById(entityId);
            if (!mongooseUser)
                return null;
            return (0, UserSTO_1.default)(mongooseUser);
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const mongooseUser = yield User_1.default.findOne({ email });
            if (!mongooseUser)
                return null;
            return (0, UserSTO_1.default)(mongooseUser);
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const mongooseUsers = yield User_1.default.find().sort({ createdAt: -1 });
            return mongooseUsers
                .map((mongooseUser) => (0, UserSTO_1.default)(mongooseUser))
                .filter((user) => user != null);
        });
    }
}
exports.default = UserRepositoryMongo;
