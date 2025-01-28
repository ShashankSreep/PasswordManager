import bcrypt from 'bcryptjs';
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

export const comparePassword = async (password, hashedPass) => {
    try {
        const match = await bcrypt.compare(password, hashedPass);
        return match;
    } catch (error) {
        console.error("Error comparing password: ", error);
    }
}