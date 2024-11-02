import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { RoleEntity } from './entity/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
    constructor(private roleRepository: RoleRepository) { }

    async findAll(): Promise<RoleEntity[]> {
        const data = await this.roleRepository.find();
        return data;
    }

    async findRoleById(id: string): Promise<RoleEntity> {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException(`role with ID ${id} not found`);
        }
        return role;
    }

    async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
        const role = this.roleRepository.create(createRoleDto);
        return this.roleRepository.save(role);
    }

    async update(id: string, updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
        await this.findRoleById(id);
        await this.roleRepository.update(id, updateRoleDto);
        return this.findRoleById(id);
    }

    async delete(id: string): Promise<void> {
        const role = await this.findRoleById(id);
        await this.roleRepository.remove(role);
    }
}
