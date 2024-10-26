import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import RoleInterface from '../interface/role.interface';

@Entity('roles')
export class RoleEntity implements RoleInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}