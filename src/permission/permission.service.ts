import { Injectable, NotFoundException } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import { PermissionEntity } from './entity/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { MESSAGE } from 'common/constants/message';

@Injectable()
export class PermissionService {
  constructor(private permissionRepository: PermissionRepository) { }

  async findAll(): Promise<PermissionEntity[]> {
    const data = await this.permissionRepository.find();
    return data;
  }

  async findPermissionById(id: string): Promise<PermissionEntity> {
    const permission = await this.permissionRepository.findOne({ where: { id } });
    if (!permission) {
      throw new NotFoundException(MESSAGE.ERR_ROLE_NOT_FOUNDER);
    }
    return permission;
  }

  async create(createPermissionDto: CreatePermissionDto): Promise<PermissionEntity> {
    const permission = this.permissionRepository.create(createPermissionDto);
    return this.permissionRepository.save(permission);
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<PermissionEntity> {
    await this.findPermissionById(id);
    await this.permissionRepository.update(id, updatePermissionDto);
    return this.findPermissionById(id);
  }

  async delete(id: string): Promise<void> {
    const permission = await this.findPermissionById(id);
    await this.permissionRepository.remove(permission);
  }
}
