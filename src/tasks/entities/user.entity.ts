import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";
import { Role } from "./role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    @IsNotEmpty()
    @IsString()
    username: string

    @Column()
    @IsNotEmpty()
    @IsString()
    email: string

    @Column()
    passwordHash: string
    
    @OneToMany(() => Task, (task) => task.user, {cascade: true} )
    tasks: Task[]

    @ManyToMany(() => Role, (role) => role.users)
    roles: Role[]
}