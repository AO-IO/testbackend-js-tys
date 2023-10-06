"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __importDefault(require("./Entity"));
class User extends Entity_1.default {
    constructor({ id, firstName, lastName, email, phone, password, accessToken, }) {
        super({ id });
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.accessToken = accessToken;
    }
}
exports.default = User;
;
