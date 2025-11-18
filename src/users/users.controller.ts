import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from 'src/tasks/dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles, RolesGuard } from 'src/auth/roles.guard';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('user')
    getAllUsers() {
        return this.usersService.getAllUser();
    }

    @Get('/user/:userId')
    getUserById(@Param('userId', ParseIntPipe) userId: number) {
        return this.usersService.getUserById(userId);
    }

    @Put('user/:userId')
    updateUser(@Body() user: UpdateUserDto, @Param('userId', ParseIntPipe) userId: number) {
        let result = this.usersService.updateUser(userId, user.username, user.email);
        if (!result) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }

        return { success: result };
    }

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('user/:userId')
    deleteUser(@Param('userId', ParseIntPipe) userId: number) {
        let result = this.usersService.deleteUser(userId);
        if (!result) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }

        return { success: result };
    }
}
