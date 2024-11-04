import { Controller, Get, Body, Param, Post, Patch, Delete, HttpCode, HttpStatus, UseInterceptors, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleEntity } from './entity/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AssignPermissionsToRoleDto } from './dto/assign-permission-to-role.dto';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<RoleEntity[]> {
        return this.roleService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findRoleById(@Param('id') id: string): Promise<RoleEntity> {
        return this.roleService.findRoleById(id);
    }

    @Post('assign')
    @HttpCode(HttpStatus.OK)
    assignPermissionsToRole(@Body() assignPermissionsToRoleDto: AssignPermissionsToRoleDto): Promise<RoleEntity> {
        return this.roleService.assignPermissionsToRole(assignPermissionsToRoleDto);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createRoleDto: CreateRoleDto): Promise<RoleEntity> {
        return this.roleService.create(createRoleDto);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
        return this.roleService.update(id, updateRoleDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string): Promise<void> {
        await this.roleService.delete(id);
    }
}