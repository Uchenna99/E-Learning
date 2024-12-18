import bcrypt from "bcryptjs"

const SALT_ROUNDS = 10;

export const hashPassowrd = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS)
}