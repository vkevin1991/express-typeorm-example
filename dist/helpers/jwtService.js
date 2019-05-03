"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const jwt = require('jsonwebtoken');
// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY = fs.readFileSync('./keys/private.key', 'utf8');
var publicKEY = fs.readFileSync('./keys/public.key', 'utf8');
function sign(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        // Token signing options
        var signOptions = {
            expiresIn: "30d",
            algorithm: "RS256"
        };
        return jwt.sign(payload, privateKEY, signOptions);
    });
}
exports.sign = sign;
;
function verify(token) {
    return __awaiter(this, void 0, void 0, function* () {
        var verifyOptions = {
            expiresIn: "30d",
            algorithm: "RS256"
        };
        try {
            return jwt.verify(token, publicKEY, verifyOptions);
        }
        catch (err) {
            return false;
        }
    });
}
exports.verify = verify;
;
function decode(token) {
    return jwt.decode(token, { complete: true });
}
exports.decode = decode;
;
//# sourceMappingURL=jwtService.js.map