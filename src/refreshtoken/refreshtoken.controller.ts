import { Controller, Get, Body, Param, Post, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { RefreshtokenService } from './refreshtoken.service';
import { RefreshtokenEntity } from './entity/refreshtoken.entity';
import { CreateRefreshtokenDto } from './dto/create-refreshtoken.dto';
import { UpdateRefreshtokenDto } from './dto/update-refreshtoken.dto';

@Controller('refreshtoken')
export class RefreshtokenController {
  constructor(private readonly refreshtokenService: RefreshtokenService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<RefreshtokenEntity[]> {
    return this.refreshtokenService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findRefreshtokenById(@Param('id') id: string): Promise<RefreshtokenEntity> {
    return this.refreshtokenService.findRefreshtokenById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPermissionDto: CreateRefreshtokenDto): Promise<RefreshtokenEntity> {
    return this.refreshtokenService.create(createPermissionDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateRefreshtokenDto: UpdateRefreshtokenDto): Promise<RefreshtokenEntity> {
    return this.refreshtokenService.update(id, updateRefreshtokenDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<void> {
    await this.refreshtokenService.delete(id);
  }
}