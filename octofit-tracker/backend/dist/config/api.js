"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = exports.port = void 0;
exports.port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
exports.baseUrl = codespaceName
    ? `https://${codespaceName}-${exports.port}.app.github.dev`
    : `http://localhost:${exports.port}`;
