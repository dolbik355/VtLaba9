import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async getAllTasks(userId: number) {
        return this.taskRepository.find({
            where: { user: {id: userId}  },
            relations: ['user'],
        });
    }

    async getTaskById(userId: number, taskId: number) {
        return this.taskRepository.findOne({
            where: { id: taskId, user: {id: userId} },
            relations: ['user'],
        });
    }

    async createTask( userId: number, title: string, description?: string) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) throw new Error('Пользователь не найден');

        const task = this.taskRepository.create({title, description, user});
        return this.taskRepository.save(task);
    }

    async updateTask(taskId: number, title: string, description: string, completed: boolean) {
        await this.taskRepository.update(taskId, {title, description, completed});
        return this.taskRepository.findOneBy( { id: taskId } );
    }

    async deleteTask(taskId: number) {
        await this.taskRepository.delete(taskId);
        return {deleted: true};
    }
}
