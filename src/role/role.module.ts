import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleEntity } from './entity/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity])],
    controllers: [RoleController],
    providers: [RoleService, RoleRepository]
})
export class RoleModule { }
