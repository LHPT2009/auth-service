import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import { PermissionEntity } from './entity/permission.entity';

@Injectable()
export class PermissionService {
  constructor(private permissionRepository: PermissionRepository) { }

  async findAll(): Promise<PermissionEntity[]> {
    const data = await this.permissionRepository.find();
    if (data.length == 0) {
      throw data;
    }
    return data;
  }
}
