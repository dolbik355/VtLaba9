import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "../entities/role.entity";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;  
}