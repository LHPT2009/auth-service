import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import MenuInterface from '../interface/menu.interface';
import { RoleEntity } from 'src/role/entity/role.entity';

@Entity('menus')
export class MenuEntity implements MenuInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => RoleEntity, (role) => role.menus)
  roles: RoleEntity[];
}