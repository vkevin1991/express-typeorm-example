import { Request, Response } from "express";
import { getManager } from "typeorm";
//import { Category } from "../entity/Category";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { UserRole } from "../entity/UserRole";
import { encryptString, decryptString } from '../helpers/encryptService';

export async function post(request: Request, response: Response) {
    try{
        const userRepository = getManager().getRepository(User);
        const postRepository = getManager().getRepository(Post);
        const rolesRepository = getManager().getRepository(UserRole);
        const listposts = await postRepository.findByIds(request.body.posts);
        const listRoles = await rolesRepository.findByIds([request.body.role]);
        const user = await userRepository.findOne({name: request.body.name});
        if(user){
            response.status(400);
            response.send("That username is already taken");
            return;
        }
        request.body.posts = listposts;
        request.body.role = listRoles[0].id;
        request.body.password = encryptString(request.body.password);
        const newUser = userRepository.create(request.body);
        await userRepository.save(newUser);
        response.send(newUser);
    }catch(e){
        response.status(400);
        response.send("Error");
        console.log(e);
    }
}

export async function getAll(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find({ relations: ["posts", "role"] });
    response.send(users);
}

export async function getOne(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(request.params.id, { relations: ["posts", "role"] });

    if (!user) {
        response.status(404);
        response.end();
        return;
    }
    response.send(user);
}

export async function put(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(request.params.id);
    if (!user) {
        response.status(404);
        response.end();
        return;
    }

    user.name = request.body.name || user.name;

    if(request.body.name){
        const checkUser = await userRepository.findOne({name: user.name});
        if(checkUser){
            response.status(404);
            response.end("That username is already taken");
            return;
        }
    }
    user.role = request.body.role || user.role;
    if(request.body.password){
        user.password = encryptString(request.body.password) 
    }
    user.posts = request.body.posts || user.posts;

    await userRepository.save(user);

    response.send(user);
}

export async function remove(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(request.params.id);
    if (!user) {
        response.status(404);
        response.end();
        return;
    }
    await userRepository.remove(user);
    response.send(user);
}