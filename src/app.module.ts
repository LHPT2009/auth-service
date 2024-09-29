import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [RoleModule, PermissionModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
