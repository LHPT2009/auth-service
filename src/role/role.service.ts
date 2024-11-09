import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { RoleEntity } from './entity/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PermissionRepository } from 'src/permission/permission.repository';
import { In } from 'typeorm';
import { AssignPermissionsToRoleDto } from './dto/assign-permission-to-role.dto';
import { MESSAGE } from 'common/constants/message';

@Injectable()
export class RoleService {
    constructor(
        private roleRepository: RoleRepository,
        private permissionRepository: PermissionRepository
    ) { }

    async findAll(): Promise<RoleEntity[]> {
        const data = await this.roleRepository.find();
        return data;
    }

    async findRoleById(id: string): Promise<RoleEntity> {
        const role = await this.roleRepository.findOne({ where: { id }, relations: ["permissions"] });
        if (!role) {
            throw new NotFoundException(MESSAGE.ERR_ROLE_NOT_FOUNDER);
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

    async assignPermissionsToRole(assignPermissionsToRole: AssignPermissionsToRoleDto): Promise<RoleEntity> {

        const role = await this.roleRepository.findOne({
            where: { id: assignPermissionsToRole.roleId },
            relations: ['permissions'],
        });

        if (!role) {
            throw new NotFoundException(MESSAGE.ERR_ROLE_NOT_FOUNDER);
        }

        if (assignPermissionsToRole.permissionIds.length === 0) {
            role.permissions = [];
            await this.roleRepository.save(role);
            return role;
        }

        const permissions = await this.permissionRepository.find({ where: { id: In(assignPermissionsToRole.permissionIds) } });

        role.permissions = permissions;

        await this.roleRepository.save(role);
        return role;
    }
}
