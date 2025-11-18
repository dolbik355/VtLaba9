import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class UpdateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    description: string

    @IsBoolean()
    completed: boolean
}