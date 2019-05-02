import app from './app'
import { post as createPost, put as updatePost, remove as deletePost, getOne as getPost, getAll as getPosts } from "./controllers/post";
import { post as createCategory, put as updateCategory, remove as deleteCategory, getOne as getCategory, getAll as getCategories } from "./controllers/category";
import { post as createUser, put as updateUser, remove as deleteUser, getOne as getUser, getAll as getUsers } from "./controllers/user";
import { post as createUserRole, put as updateUserRole, remove as deleteUserRole, getAll as getUsersRole } from "./controllers/userRole";
import { login } from './controllers/login';
import { protectUrl, evaluatePermissions} from './controllers/auth';

app.get('/', (req, res) => {
    res.send({
        "liu": "Laureate International Universities"
    })
});

app.post('/category', protectUrl, evaluatePermissions, createCategory);
app.get('/category', protectUrl, evaluatePermissions, getCategories);
app.get('/category/:id', protectUrl, evaluatePermissions, getCategory);
app.put('/category/:id', protectUrl, evaluatePermissions, updateCategory);
app.delete('/category/:id', protectUrl, evaluatePermissions, deleteCategory);

app.post('/post', protectUrl, evaluatePermissions, createPost);
app.get('/post', protectUrl, evaluatePermissions, getPosts);
app.get('/post/:id', protectUrl, evaluatePermissions, getPost);
app.put('/post/:id', protectUrl, evaluatePermissions, updatePost);
app.delete('/post/:id', protectUrl, evaluatePermissions, deletePost);

app.post('/login', login);

app.post('/user', protectUrl, evaluatePermissions, createUser);
app.get('/user', protectUrl, evaluatePermissions, getUsers);
app.get('/user/:id', protectUrl, evaluatePermissions, getUser);
app.put('/user/:id', protectUrl, evaluatePermissions, updateUser);
app.delete('/user/:id', protectUrl, evaluatePermissions, deleteUser);

app.post('/userrole', protectUrl, evaluatePermissions, createUserRole);
app.get('/userrole', protectUrl, evaluatePermissions,getUsersRole);
app.put('/userrole/:id', protectUrl, evaluatePermissions, updateUserRole);
app.delete('/userrole/:id', protectUrl, evaluatePermissions, deleteUserRole);
