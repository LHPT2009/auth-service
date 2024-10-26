import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleEntity } from './entity/role.entity';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Get()
    findAll(): Promise<RoleEntity[]> {
        return this.roleService.findAll();
    }
}