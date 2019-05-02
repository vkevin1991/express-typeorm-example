import { Column, PrimaryGeneratedColumn, Entity, OneToMany} from "typeorm";
import { User } from "./User";

// role list: Admin, Editor or Viewer
@Entity()
export class UserRole {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    @Column("simple-array")
    permissions: string[];

    @OneToMany(type => User, user => user.role)
    users: User[];
}