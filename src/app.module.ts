import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../config/database.config';
import { PermissionEntity } from './permission/entity/permission.entity';
import { RoleEntity } from './role/entity/role.entity';
import { UserEntity } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { MenuEntity } from './menu/entity/menu.entity';
import { RefreshtokenEntity } from './refreshtoken/entity/refreshtoken.entity';
import { RefreshtokenModule } from './refreshtoken/refreshtoken.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      entities: [PermissionEntity, RoleEntity, UserEntity, MenuEntity, RefreshtokenEntity]
    }),
    RoleModule,
    PermissionModule,
    UserModule,
    AuthModule,
    MenuModule,
    RefreshtokenModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
