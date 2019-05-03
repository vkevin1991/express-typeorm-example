"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
var crypto = require("crypto");
var path = require("path");
var privateKEY = fs.readFileSync('./keys/private.key', 'utf8');
var publicKEY = fs.readFileSync('./keys/public.key', 'utf8');
function encryptString(toEncrypt) {
    var buffer = Buffer.from(toEncrypt);
    var encrypted = crypto.publicEncrypt(publicKEY, buffer);
    return encrypted.toString("base64");
}
exports.encryptString = encryptString;
;
function decryptString(toDecrypt) {
    var buffer = Buffer.from(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt(privateKEY, buffer);
    return decrypted.toString("utf8");
}
exports.decryptString = decryptString;
;
//# sourceMappingURL=encryptService.js.map