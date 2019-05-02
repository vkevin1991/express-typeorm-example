import * as fs from "fs";
const jwt = require('jsonwebtoken');
// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY = fs.readFileSync('./keys/private.key', 'utf8');
var publicKEY = fs.readFileSync('./keys/public.key', 'utf8');

export async function sign(payload: any){
    // Token signing options
    var signOptions = {
        expiresIn: "30d", // 30 days validity
        algorithm: "RS256"
    };
    return jwt.sign(payload, privateKEY, signOptions);
};
export async function verify (token: any){
    var verifyOptions = {
        expiresIn: "30d",
        algorithm: "RS256"
    };
    try {
        return jwt.verify(token, publicKEY, verifyOptions);
    } catch (err) {
        return false;
    }
};
export function decode(token: any){
    return jwt.decode(token, { complete: true });
};