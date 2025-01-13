import { Jwt } from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

generateAccessToken(userid: number, name: string, role: string): string {
    return jwt.sign(id: string, name, role), process.env.JWT_SECRET || '',
    {expiresin}
}


const fullname = userInfo.firstName + ' ' + userInfo.lastName;
const accessToken = this.generateAccessToken(userid, fullname, userInfo.role)

const refreshToken = this.generateRefreshToken(user.id, fullname, user.role);
return { accessToken, refreshToken }