import bcrypt from 'bcryptjs';
import { retrieveMasterPassword } from '../config/firebase_api';
const saltRounds = 10;
export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPass = await bcrypt.hash(password, salt);
        return hashedPass;
    } catch (error) {
        console.error("Error hashing password: ", error);
    }
}

export const comparePassword = async (password) => {
    try {
        const masterPassword = await retrieveMasterPassword();
        const match = await bcrypt.compare(password, masterPassword);
        if (match) {
            console.log("Password match!");
        } else {
            console.log("Password does not match!");
            console.log(match);
        }
        return match;
    } catch (error) {
        console.error("Error comparing password: ", error);
    }
}