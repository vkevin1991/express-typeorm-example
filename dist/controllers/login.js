'use strict';
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
const User_1 = require("../entity/User");
const encryptService_1 = require("../helpers/encryptService");
const jwtService_1 = require("../helpers/jwtService");
function login(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userRepository = typeorm_1.getManager().getRepository(User_1.User);
            const users = yield userRepository.createQueryBuilder("User")
                .where("user.name = :name", { name: request.body.name })
                .leftJoinAndSelect("User.role", "role").getOne();
            if (!users) {
                response.status(404);
                response.send("Not found");
            }
            let password = encryptService_1.decryptString(users.password);
            if (password === request.body.password) {
                const jwt = yield jwtService_1.sign({
                    name: users.name,
                    role: users.role.role,
                    permissions: users.role.permissions
                });
                response.json({ token: jwt });
            }
            response.status(401);
            response.json({ message: "Unauthorized" });
        }
        catch (e) {
            console.log("Error", e);
            response.send(e);
            response.status(500);
        }
    });
}
exports.login = login;
//# sourceMappingURL=login.js.map