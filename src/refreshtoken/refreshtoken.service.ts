import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { RefreshtokenRepository } from './refreshtoken.repository';
import { RefreshtokenEntity } from './entity/refreshtoken.entity';
import { CreateRefreshtokenDto } from './dto/create-refreshtoken.dto';
import { UpdateRefreshtokenDto } from './dto/update-refreshtoken.dto';
import { MESSAGE } from 'common/constants/message';

@Injectable()
export class RefreshtokenService {
  constructor(
    private refreshtokenRepository: RefreshtokenRepository,
  ) { }

  async findAll(): Promise<RefreshtokenEntity[]> {
    const data = await this.refreshtokenRepository.find();
    return data;
  }

  async findRefreshtokenById(id: string): Promise<RefreshtokenEntity> {
    const refreshtoken = await this.refreshtokenRepository.findOne({ where: { id } });
    if (!refreshtoken) {
      throw new NotFoundException(MESSAGE.ERR_REFRESHTOKEN_NOT_FOUNDER);
    }
    return refreshtoken;
  }

  async create(createRefreshtokenDto: CreateRefreshtokenDto): Promise<RefreshtokenEntity> {
    const refreshtoken = this.refreshtokenRepository.create(createRefreshtokenDto);
    return this.refreshtokenRepository.save(refreshtoken);
  }

  async update(id: string, updateRefreshtokenDto: UpdateRefreshtokenDto): Promise<RefreshtokenEntity> {
    await this.findRefreshtokenById(id);
    await this.refreshtokenRepository.update(id, updateRefreshtokenDto);
    return this.findRefreshtokenById(id);
  }

  async delete(id: string): Promise<void> {
    const refreshtoken = await this.findRefreshtokenById(id);
    await this.refreshtokenRepository.remove(refreshtoken);
  }
}
