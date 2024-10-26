import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import PermissionInterface from '../interface/permission.interface';

@Entity('permissions')
export class PermissionEntity implements PermissionInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}