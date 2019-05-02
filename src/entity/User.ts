import {Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable, OneToMany, ManyToOne} from "typeorm";
import { Post } from "./Post";
import { UserRole } from "./UserRole";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @ManyToOne(type => UserRole, userrole => userrole.role)
    role: UserRole

    @ManyToMany(type => Post, posts => posts.users)
    @JoinTable()
    posts: Post[];
}