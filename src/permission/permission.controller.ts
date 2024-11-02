import { Controller, Get, Body, Param, Post, Patch, Delete, HttpCode, HttpStatus, UseInterceptors, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionEntity } from './entity/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<PermissionEntity[]> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findPermissionById(@Param('id') id: string): Promise<PermissionEntity> {
    return this.permissionService.findPermissionById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPermissionDto: CreatePermissionDto): Promise<PermissionEntity> {
    return this.permissionService.create(createPermissionDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto): Promise<PermissionEntity> {
    return this.permissionService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<void> {
    await this.permissionService.delete(id);
  }
}