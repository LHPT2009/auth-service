import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import RoleInterface from '../interface/role.interface';
import { PermissionEntity } from 'src/permission/entity/permission.entity';
import { UserEntity } from 'src/user/entity/user.entity';

@Entity('roles')
export class RoleEntity implements RoleInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => PermissionEntity, (permission) => permission.roles)
    @JoinTable({ name: 'roles_permissions' })
    permissions: PermissionEntity[];

    @ManyToMany(() => UserEntity, (user) => user.roles)
    users: UserEntity[];
}