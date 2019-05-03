"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtService_1 = require("../helpers/jwtService");
function protectUrl(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = req.headers['authorization'].split(' ');
            const token = bearer[1];
            const validate = yield jwtService_1.verify(token);
            if (validate) {
                next();
            }
            else {
                res.sendStatus(403);
            }
        }
        else {
            res.sendStatus(403);
        }
    });
}
exports.protectUrl = protectUrl;
;
function evaluatePermissions(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let permission = req.method.toLowerCase();
        permission = permission + req.url.split("/")[1];
        const bearer = req.headers['authorization'].split(' ')[1];
        const decodeToken = jwtService_1.decode(bearer);
        if ((decodeToken.payload.permissions.length && decodeToken.payload.permissions[0] === 'all') || decodeToken.payload.permissions.indexOf(permission) !== -1) {
            next();
        }
        else {
            res.sendStatus(403);
        }
    });
}
exports.evaluatePermissions = evaluatePermissions;
;
//# sourceMappingURL=auth.js.map