import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleEntity } from './entity/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { PermissionModule } from 'src/permission/permission.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([RoleEntity]),
        PermissionModule
    ],
    controllers: [RoleController],
    providers: [RoleService, RoleRepository],
    exports: [RoleService, RoleRepository]
})
export class RoleModule { }
