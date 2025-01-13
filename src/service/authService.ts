import { LoginDTO } from "../dtos/Login.dto";
export interface AuthService {
    login(data: LoginDTO): Promise<{accessToken: string; refreshToken: string;}>
}