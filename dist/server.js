"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./app/config/env");
const app_1 = __importDefault(require("./app"));
let server;
const initServer = async () => {
    try {
        await mongoose_1.default.connect(env_1.envs.MONGODB_URL);
        server = app_1.default.listen(env_1.envs.PORT, () => {
            console.log(`Server is running at ${env_1.envs.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
initServer();
process.on("unhandledRejection", (err) => {
    console.log('unhandledRejection', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    console.log('uncaughtException', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('SIGTERM', () => {
    console.log('SIGTERM error');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('SIGINT', () => {
    console.log('SIGINT : Stop the server gracefully...');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
