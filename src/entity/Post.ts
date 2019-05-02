import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./Category";
import { User } from "./User";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("text")
    text: string;

    @ManyToMany(type => Category, category => category.posts)
    @JoinTable()
    categories: Category[];

    @ManyToMany(type => User, users => users.posts)
    @JoinTable()
    users: Category[];

}