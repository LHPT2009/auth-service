import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionEntity } from './entity/permission.entity';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Get()
  findAll(): Promise<PermissionEntity[]> {
    try {
      return this.permissionService.findAll();
    } catch (error) {
      throw error
    }
  }
}