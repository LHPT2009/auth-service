import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshtokenEntity } from './entity/refreshtoken.entity';

@Injectable()
export class RefreshtokenRepository extends Repository<RefreshtokenEntity> {
  constructor(
    @InjectRepository(RefreshtokenEntity)
    repository: Repository<RefreshtokenEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}