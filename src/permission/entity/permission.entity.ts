import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import PermissionInterface from '../interface/permission.interface';
import { RoleEntity } from 'src/role/entity/role.entity';

@Entity('permissions')
export class PermissionEntity implements PermissionInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];
}