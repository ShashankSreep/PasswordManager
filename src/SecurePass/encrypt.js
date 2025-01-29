import CryptoJS from 'crypto-js';
import {retrieveEntry} from '../config/handlePassword';

export const encryptPass = (password) => {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const key128Bits = CryptoJS.PBKDF2(password, salt, { keySize: 128 / 32 }); // 128 bit key
    const keyString = key128Bits.toString(CryptoJS.enc.Base64);
    const encrypt = CryptoJS.AES.encrypt(password, keyString)
    const encrypted = CryptoJS.AES.encrypt(password, keyString).toString();
    return [encrypted, keyString, encrypt]; // return the encrypted password and the key
}


export const decryptPass = async (name) => {
    // Retrieve the key from the database
    const encrypt = await retrieveEntry(name);
    const key = encrypt.Key;
    const password = encrypt.Password;
    const decrypted = CryptoJS.AES.decrypt(password, key).toString(CryptoJS.enc.Utf8);
    console.log("Decrypted Password: ", decrypted);
    return decrypted;
}