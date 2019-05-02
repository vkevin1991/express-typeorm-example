import { Request, Response } from "express";
import { getManager } from "typeorm";
import {UserRole} from "../entity/UserRole";

export async function post(request: Request, response: Response) {
    const userRoleRepository = getManager().getRepository(UserRole);
    const newRole = userRoleRepository.create(request.body);
    await userRoleRepository.save(newRole);
    response.send(newRole);
}

export async function getAll(request: Request, response: Response) {
    const userRoleRepository = getManager().getRepository(UserRole);
    const roles = await userRoleRepository.find();

    response.send(roles);
}


export async function put(request: Request, response: Response) {
    const userRoleRepository = getManager().getRepository(UserRole);
    const userRole = await userRoleRepository.findOne(request.params.id);

    if (!userRole) {
        response.status(404);
        response.end();
        return;
    }

    userRole.role = request.body.role || userRole.role;
    userRole.permissions = request.body.permissions || userRole.permissions;

    await userRoleRepository.save(userRole);

    response.send(userRole);
}

export async function remove(request: Request, response: Response) {
    const userRoleRepository = getManager().getRepository(UserRole);
    const userRole = await userRoleRepository.findOne(request.params.id);
    if (!userRole) {
        response.status(404);
        response.end();
        return;
    }
    await userRoleRepository.remove(userRole);
    response.send(userRole);
}