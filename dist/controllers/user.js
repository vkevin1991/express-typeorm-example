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
//import { Category } from "../entity/Category";
const Post_1 = require("../entity/Post");
const User_1 = require("../entity/User");
const UserRole_1 = require("../entity/UserRole");
const encryptService_1 = require("../helpers/encryptService");
function post(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userRepository = typeorm_1.getManager().getRepository(User_1.User);
            const postRepository = typeorm_1.getManager().getRepository(Post_1.Post);
            const rolesRepository = typeorm_1.getManager().getRepository(UserRole_1.UserRole);
            const listposts = yield postRepository.findByIds(request.body.posts);
            const listRoles = yield rolesRepository.findByIds([request.body.role]);
            request.body.posts = listposts;
            request.body.role = listRoles[0].id;
            request.body.password = encryptService_1.encryptString(request.body.password);
            const newUser = userRepository.create(request.body);
            yield userRepository.save(newUser);
            response.send(newUser);
        }
        catch (e) {
            response.status(400);
            response.send("Error");
            console.log(e);
        }
    });
}
exports.post = post;
function getAll(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = typeorm_1.getManager().getRepository(User_1.User);
        const users = yield userRepository.find({ relations: ["posts", "role"] });
        response.send(users);
    });
}
exports.getAll = getAll;
function getOne(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = typeorm_1.getManager().getRepository(User_1.User);
        const user = yield userRepository.findOne(request.params.id, { relations: ["posts", "role"] });
        if (!user) {
            response.status(404);
            response.end();
            return;
        }
        response.send(user);
    });
}
exports.getOne = getOne;
function put(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = typeorm_1.getManager().getRepository(User_1.User);
        const user = yield userRepository.findOne(request.params.id);
        if (!user) {
            response.status(404);
            response.end();
            return;
        }
        user.name = request.body.name || user.name;
        user.role = request.body.role || user.role;
        if (request.body.password) {
            user.password = encryptService_1.encryptString(request.body.password);
        }
        user.posts = request.body.posts || user.posts;
        yield userRepository.save(user);
        response.send(user);
    });
}
exports.put = put;
function remove(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = typeorm_1.getManager().getRepository(User_1.User);
        const user = yield userRepository.findOne(request.params.id);
        if (!user) {
            response.status(404);
            response.end();
            return;
        }
        yield userRepository.remove(user);
        response.send(user);
    });
}
exports.remove = remove;
//# sourceMappingURL=user.js.map