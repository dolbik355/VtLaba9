import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/tasks/entities/role.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async registerUser(username: string, password: string, email: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userService.createUser(username, email, hashedPassword);
    }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOne(username);
        let localHash = await bcrypt.hash(password, 10);
        if (user && await bcrypt.compare(password, user.passwordHash)) {
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return { access_token: this.jwtService.sign(payload), };
    }
}
