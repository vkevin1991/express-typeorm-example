import * as fs from "fs";
var crypto = require("crypto");
var path = require("path");

var privateKEY = fs.readFileSync('./keys/private.key', 'utf8');
var publicKEY = fs.readFileSync('./keys/public.key', 'utf8');

export function encryptString(toEncrypt: string){
    var buffer = Buffer.from(toEncrypt);
    var encrypted = crypto.publicEncrypt(publicKEY, buffer);
    return encrypted.toString("base64");
};
export function decryptString(toDecrypt: string){
    var buffer = Buffer.from(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt(privateKEY, buffer);
    return decrypted.toString("utf8");    
};