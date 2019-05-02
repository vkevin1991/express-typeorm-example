'use strict';
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/User";
import { decryptString } from '../helpers/encryptService';
import { sign } from '../helpers/jwtService';

export async function login(request: Request, response: Response) {
    try{
        const userRepository = getManager().getRepository(User);
        const users = await userRepository.createQueryBuilder("User")
                                .where("user.name = :name", { name: request.body.name })
                                .leftJoinAndSelect("User.role", "role").getOne();
        if(!users){
            response.status(404);
            response.send("Not found")
        }
        let password = decryptString(users.password);
        if(password === request.body.password){
            const jwt = await sign({
                name: users.name,
                role: users.role.role,
                permissions: users.role.permissions
            });
            response.json({token: jwt});
        }
        response.status(401);
        response.json({message: "Unauthorized"});
    }catch(e){
        console.log("Error" , e);
        response.send(e);
        response.status(500);
    }
}