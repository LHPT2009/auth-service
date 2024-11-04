import { Controller, Get, Body, Param, Post, Patch, Delete, HttpCode, HttpStatus, UseInterceptors, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuEntity } from './entity/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<MenuEntity[]> {
    return this.menuService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findMenuById(@Param('id') id: string): Promise<MenuEntity> {
    return this.menuService.findMenuById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMenuDto: CreateMenuDto): Promise<MenuEntity> {
    return this.menuService.create(createMenuDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto): Promise<MenuEntity> {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<void> {
    await this.menuService.delete(id);
  }
}