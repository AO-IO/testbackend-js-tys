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
const ListUsers_1 = __importDefault(require("../../application/use_cases/user/ListUsers"));
const GetUser_1 = __importDefault(require("../../application/use_cases/user/GetUser"));
const CreateUser_1 = __importDefault(require("../../application/use_cases/user/CreateUser"));
const UpdateUser_1 = __importDefault(require("../../application/use_cases/user/UpdateUser"));
const DeleteUser_1 = __importDefault(require("../../application/use_cases/user/DeleteUser"));
exports.default = {
    findUsers(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // Context
            const serviceLocator = request.serviceLocator;
            // Treatment
            const users = yield (0, ListUsers_1.default)(serviceLocator);
            // Output
            const output = users
                .map((user) => serviceLocator.userSerializer.serialize(user, serviceLocator));
            return response.json(output);
        });
    },
    getUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // Context
            const serviceLocator = request.serviceLocator;
            // Input
            const userId = request.params.id;
            // Treatment
            let user = null;
            try {
                user = yield (0, GetUser_1.default)(userId, serviceLocator);
            }
            catch (err) {
                console.log(err);
            }
            // Output
            if (!user) {
                return response.status(404).json({ message: 'Not Found' });
            }
            const output = serviceLocator.userSerializer.serialize(user, serviceLocator);
            return response.json(output);
        });
    },
    createUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // Context
            const serviceLocator = request.serviceLocator;
            // Input
            let data = request.body;
            data = {
                firstName: data.first_name,
                lastName: data.last_name,
                email: data.email,
                phone: data.phone,
                password: data.password,
                role: data.role,
            };
            // Treatment
            let user = null;
            let error = null;
            try {
                user = yield (0, CreateUser_1.default)(data, serviceLocator);
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
            if (!user) {
                return response.status(400).json({ message: error });
            }
            const output = serviceLocator.userSerializer.serialize(user, serviceLocator);
            return response.status(201).json(output);
        });
    },
    updateUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // Context
            const serviceLocator = request.serviceLocator;
            // Input
            const userId = request.params.id;
            const inputData = request.body;
            const data = {
                id: userId
            };
            const acceptedFields = [
                ['first_name', 'firstName'],
                ['last_name', 'lastName'],
                ['email'],
                ['phone'],
                ['active'],
                ['role'],
                ['country'],
                ['city'],
                ['nationality'],
                ['photo'],
            ];
            acceptedFields.forEach((acceptedField) => {
                if (inputData[acceptedField[0]] === undefined)
                    return;
                data[acceptedField.length > 1
                    ? acceptedField[1]
                    : acceptedField[0]] = inputData[acceptedField[0]];
            });
            // Treatment
            let user = null;
            let error = null;
            try {
                user = yield (0, UpdateUser_1.default)(data, serviceLocator);
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
            if (!user) {
                return response.status(400).json({ message: error });
            }
            const output = serviceLocator.userSerializer.serialize(user, serviceLocator);
            return response.json(output);
        });
    },
    deleteUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // Context
            const serviceLocator = request.serviceLocator;
            // Input
            const toDeleteUserId = request.params.id;
            // ---------------------------------------------
            // THIS IS HOW TO ACCESS userId FROM AccessToken
            // ---------------------------------------------
            const userId = request.userId;
            // ---------------------------------------------
            // ---------------------------------------------
            // Treatment
            let user = null;
            try {
                user = yield (0, DeleteUser_1.default)(toDeleteUserId, serviceLocator);
            }
            catch (err) {
                if (err instanceof Error) {
                    console.log(err);
                }
            }
            // Output
            if (!user) {
                return response.status(404).json({ message: 'Not Found' });
            }
            return response.sendStatus(204);
        });
    },
};
