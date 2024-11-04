import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuEntity } from './entity/menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuRepository } from './menu.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity])],
  controllers: [MenuController],
  providers: [MenuService, MenuRepository],
  exports: [MenuService, MenuRepository]
})
export class MenuModule { }
