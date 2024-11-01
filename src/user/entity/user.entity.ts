import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, BeforeInsert } from 'typeorm';
import UserInterface from '../interface/user.interface';
import { RoleEntity } from 'src/role/entity/role.entity';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class UserEntity implements UserInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @ManyToMany(() => RoleEntity, (role) => role.users)
    @JoinTable({ name: 'users_roles' })
    roles: RoleEntity[];

    constructor(
        username: string,
        name: string,
        password: string,
    ) {
        this.username = username;
        this.name = name;
        this.password = password;
    }

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
}

