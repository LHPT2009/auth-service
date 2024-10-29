import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import UserInterface from '../interface/user.interface';
import { RoleEntity } from 'src/role/entity/role.entity';

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
}