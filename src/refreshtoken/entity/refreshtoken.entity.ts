import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import RefreshtokenInterface from '../interface/refreshtoken.interface';

@Entity('refreshtokens')
export class RefreshtokenEntity implements RefreshtokenInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}