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
const express_1 = __importDefault(require("express"));
const environment_1 = __importDefault(require("../config/environment"));
const service_locator_1 = __importDefault(require("../config/service-locator"));
const routes_v1_1 = __importDefault(require("./routes-v1"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
const createServer = () => __awaiter(void 0, void 0, void 0, function* () {
    express_1.default.request.serviceLocator = service_locator_1.default;
    app.use(express_1.default.json({ limit: '50mb' }));
    router.use('/api/v1', routes_v1_1.default);
    app.use(router);
    // Create a server with a port
    app.listen(environment_1.default.port, () => {
        console.log(`App listening on port ${environment_1.default.port}`);
    });
    return app;
});
exports.default = createServer;
