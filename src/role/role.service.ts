import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { RoleEntity } from './entity/role.entity';

@Injectable()
export class RoleService {
    constructor(private roleRepository: RoleRepository) { }

    async findAll(): Promise<RoleEntity[]> {
        const data = await this.roleRepository.find();
        return data;
    }
}
