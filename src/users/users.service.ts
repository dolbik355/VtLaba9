import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/tasks/entities/role.entity';
import { User } from 'src/tasks/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    createUser(username: string, email: string, passwordHash: string) {
        const user = this.userRepository.create({ username, email, passwordHash});
        return this.userRepository.save(user);
    }

    getAllUser() {
        return this.userRepository.find({ relations: ['tasks'] });
    }

    getUserById(id: number) {
        return this.userRepository.findOne({
            where: { id },
            relations: ['tasks'],
        });
    }

    async updateUser(id: number, username: string, email: string) {
        await this.userRepository.update(id, { id, username, email })
    }

    async deleteUser(id: number) {
        await this.userRepository.delete(id);
        return { deleted: true };
    }

    async findOne(username: string) {
        return this.userRepository.findOne({ where: { username } });
    }
}
