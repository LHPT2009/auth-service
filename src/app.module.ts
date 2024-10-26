import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../config/database.config';
import { PermissionEntity } from './permission/entity/permission.entity';
import { RoleEntity } from './role/entity/role.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      entities: [PermissionEntity, RoleEntity]
    }),
    RoleModule,
    PermissionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
