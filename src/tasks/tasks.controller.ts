import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put , UseGuards} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @UseGuards(JwtAuthGuard)
    @Get('user/:id/tasks')
    getAllTasks(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.getAllTasks(id);
    }

    
    @Get('user/:userId/tasks/:taskId')
    getTaskById(@Param('userId', ParseIntPipe) userId: number, @Param('taskId', ParseIntPipe) taskId: number) {
        let result = this.taskService.getTaskById(userId, taskId);
        if (!result) {
            throw new NotFoundException(`Task with id ${taskId} or User with id ${userId} not found`);
        }

        return result;
    }

    @Post('user/:userId/tasks')
    create(@Body() task: CreateTaskDto, @Param('userId', ParseIntPipe) userId: number) {
        this.taskService.createTask( userId, task.title, task.description);
    }

    @Put('tasks/:taskId') 
    updataTask(@Body() task: UpdateTaskDto, @Param('taskId', ParseIntPipe) taskId: number){
        let result = this.taskService.updateTask(taskId, task.title, task.description, task.completed);
        if (!result) {
            throw new NotFoundException(`Task with id ${taskId} not found`);
        }

        return { success: result };
    }
  
    @Delete('tasks/:taskId') 
    deleteTask(@Param('taskId', ParseIntPipe) id: number) {
        let result = this.taskService.deleteTask(id);
        if (!result) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return { success: result };
    }
}
