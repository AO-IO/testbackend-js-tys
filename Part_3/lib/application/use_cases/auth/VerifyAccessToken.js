"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (accessToken, { accessTokenManager }) => {
    const decoded = accessTokenManager.decode(accessToken);
    if (!decoded) {
        throw new Error('Invalid access token');
    }
    return {
        uid: decoded.uid,
        role: decoded.role,
    };
};
