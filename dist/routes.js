"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const post_1 = require("./controllers/post");
const category_1 = require("./controllers/category");
const user_1 = require("./controllers/user");
const userRole_1 = require("./controllers/userRole");
const login_1 = require("./controllers/login");
const auth_1 = require("./controllers/auth");
app_1.default.get('/', (req, res) => {
    res.send({
        "liu": "Laureate International Universities"
    });
});
app_1.default.post('/category', auth_1.protectUrl, auth_1.evaluatePermissions, category_1.post);
app_1.default.get('/category', auth_1.protectUrl, auth_1.evaluatePermissions, category_1.getAll);
app_1.default.get('/category/:id', auth_1.protectUrl, auth_1.evaluatePermissions, category_1.getOne);
app_1.default.put('/category/:id', auth_1.protectUrl, auth_1.evaluatePermissions, category_1.put);
app_1.default.delete('/category/:id', auth_1.protectUrl, auth_1.evaluatePermissions, category_1.remove);
app_1.default.post('/post', auth_1.protectUrl, auth_1.evaluatePermissions, post_1.post);
app_1.default.get('/post', auth_1.protectUrl, auth_1.evaluatePermissions, post_1.getAll);
app_1.default.get('/post/:id', auth_1.protectUrl, auth_1.evaluatePermissions, post_1.getOne);
app_1.default.put('/post/:id', auth_1.protectUrl, auth_1.evaluatePermissions, post_1.put);
app_1.default.delete('/post/:id', auth_1.protectUrl, auth_1.evaluatePermissions, post_1.remove);
app_1.default.post('/login', login_1.login);
app_1.default.post('/user', auth_1.protectUrl, auth_1.evaluatePermissions, user_1.post);
app_1.default.get('/user', auth_1.protectUrl, auth_1.evaluatePermissions, user_1.getAll);
app_1.default.get('/user/:id', auth_1.protectUrl, auth_1.evaluatePermissions, user_1.getOne);
app_1.default.put('/user/:id', auth_1.protectUrl, auth_1.evaluatePermissions, user_1.put);
app_1.default.delete('/user/:id', auth_1.protectUrl, auth_1.evaluatePermissions, user_1.remove);
app_1.default.post('/userrole', auth_1.protectUrl, auth_1.evaluatePermissions, userRole_1.post);
app_1.default.get('/userrole', auth_1.protectUrl, auth_1.evaluatePermissions, userRole_1.getAll);
app_1.default.put('/userrole/:id', auth_1.protectUrl, auth_1.evaluatePermissions, userRole_1.put);
app_1.default.delete('/userrole/:id', auth_1.protectUrl, auth_1.evaluatePermissions, userRole_1.remove);
//# sourceMappingURL=routes.js.map