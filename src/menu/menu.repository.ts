import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from './entity/menu.entity';

@Injectable()
export class MenuRepository extends Repository<MenuEntity> {
  constructor(
    @InjectRepository(MenuEntity)
    repository: Repository<MenuEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}