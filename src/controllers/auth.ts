import { Request, Response, NextFunction } from 'express';
import { verify, decode} from '../helpers/jwtService';


export async function protectUrl(req: Request, res: Response, next: NextFunction){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader  !== 'undefined'){
        const bearer = req.headers['authorization'].split(' ');
        const token = bearer[1];
        const validate = await verify(token);
        if (validate) {
            next();
        }else{
            res.sendStatus(403);
        }
    }else{
        res.sendStatus(403);
    }
};

export async function evaluatePermissions(req: Request, res: Response, next: NextFunction) {
    let permission = req.method.toLowerCase();
    permission = permission + req.url.split("/")[1];
    const bearer = req.headers['authorization'].split(' ')[1];
    const decodeToken = decode(bearer);
    if ((decodeToken.payload.permissions.length && decodeToken.payload.permissions[0] === 'all') || decodeToken.payload.permissions.indexOf(permission) !== -1){
        next();
    }else{
        res.sendStatus(403);
    }
};