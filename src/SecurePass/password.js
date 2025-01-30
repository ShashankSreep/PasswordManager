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

export const comparePassword = async (password, email) => {
    try {
        const masterPassword = await retrieveMasterPassword(email);
        const match = await bcrypt.compare(password, masterPassword);
        if (match) {
            return match;
        }
    } catch (error) {
        console.error("Error comparing password: ", error);
    }
}