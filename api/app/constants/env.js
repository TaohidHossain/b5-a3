"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.PORT = void 0;
const getEnv = (key, defaultValue) => {
    var _a;
    const value = (_a = process.env[key]) !== null && _a !== void 0 ? _a : defaultValue;
    if (!value) {
        throw new Error(`Environment variable ${key} is not set and no default value provided.`);
    }
    return value;
};
exports.PORT = getEnv('PORT', '4000');
exports.MONGO_URI = getEnv('MONGO_URI');
