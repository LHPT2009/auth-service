import { Injectable, NotFoundException } from '@nestjs/common';
import { MenuRepository } from './menu.repository';
import { MenuEntity } from './entity/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MESSAGE } from 'common/constants/message';

@Injectable()
export class MenuService {
  constructor(private menuRepository: MenuRepository) { }

  async findAll(): Promise<MenuEntity[]> {
    const data = await this.menuRepository.find();
    return data;
  }

  async findMenuById(id: string): Promise<MenuEntity> {
    const menu = await this.menuRepository.findOne({ where: { id } });
    if (!menu) {
      throw new NotFoundException(MESSAGE.ERR_MENU_NOT_FOUNDER);
    }
    return menu;
  }

  async create(createMenuDto: CreateMenuDto): Promise<MenuEntity> {
    const menu = this.menuRepository.create(createMenuDto);
    return this.menuRepository.save(menu);
  }

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<MenuEntity> {
    await this.findMenuById(id);
    await this.menuRepository.update(id, updateMenuDto);
    return this.findMenuById(id);
  }

  async delete(id: string): Promise<void> {
    const menu = await this.findMenuById(id);
    await this.menuRepository.remove(menu);
  }
}
