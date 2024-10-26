import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entity/role.entity';

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
    constructor(
        @InjectRepository(RoleEntity)
        repository: Repository<RoleEntity>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
}