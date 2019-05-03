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
const typeorm_1 = require("typeorm");
const UserRole_1 = require("../entity/UserRole");
function post(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRoleRepository = typeorm_1.getManager().getRepository(UserRole_1.UserRole);
        const newRole = userRoleRepository.create(request.body);
        yield userRoleRepository.save(newRole);
        response.send(newRole);
    });
}
exports.post = post;
function getAll(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRoleRepository = typeorm_1.getManager().getRepository(UserRole_1.UserRole);
        const roles = yield userRoleRepository.find();
        response.send(roles);
    });
}
exports.getAll = getAll;
function put(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRoleRepository = typeorm_1.getManager().getRepository(UserRole_1.UserRole);
        const userRole = yield userRoleRepository.findOne(request.params.id);
        if (!userRole) {
            response.status(404);
            response.end();
            return;
        }
        userRole.role = request.body.role || userRole.role;
        userRole.permissions = request.body.permissions || userRole.permissions;
        yield userRoleRepository.save(userRole);
        response.send(userRole);
    });
}
exports.put = put;
function remove(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRoleRepository = typeorm_1.getManager().getRepository(UserRole_1.UserRole);
        const userRole = yield userRoleRepository.findOne(request.params.id);
        if (!userRole) {
            response.status(404);
            response.end();
            return;
        }
        yield userRoleRepository.remove(userRole);
        response.send(userRole);
    });
}
exports.remove = remove;
//# sourceMappingURL=userRole.js.map