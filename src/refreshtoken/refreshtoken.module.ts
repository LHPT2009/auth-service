import { Module } from '@nestjs/common';
import { RefreshtokenController } from './refreshtoken.controller';
import { RefreshtokenService } from './refreshtoken.service';
import { RefreshtokenEntity } from './entity/refreshtoken.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshtokenRepository } from './refreshtoken.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshtokenEntity])],
  controllers: [RefreshtokenController],
  providers: [RefreshtokenService, RefreshtokenRepository],
  exports: [RefreshtokenService, RefreshtokenRepository]
})
export class RefreshtokenModule { }
