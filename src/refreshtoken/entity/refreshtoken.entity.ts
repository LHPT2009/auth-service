import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import RefreshtokenInterface from '../interface/refreshtoken.interface';
import { UserEntity } from 'src/user/entity/user.entity';

@Entity('refreshtokens')
export class RefreshtokenEntity implements RefreshtokenInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => UserEntity, user => user.refreshTokens)
  user: UserEntity;
}