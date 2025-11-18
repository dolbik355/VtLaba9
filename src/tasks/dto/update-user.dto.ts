import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class UpdateUserDto {
    @IsInt()
    @Min(1)
    id: number;

    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsString()
    @IsNotEmpty()
    email: string;
}