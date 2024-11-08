import { Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { RefreshtokenRepository } from './refreshtoken.repository';
import { RefreshtokenEntity } from './entity/refreshtoken.entity';
import { CreateRefreshtokenDto } from './dto/create-refreshtoken.dto';
import { UpdateRefreshtokenDto } from './dto/update-refreshtoken.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RefreshtokenService implements OnModuleInit {
  private userService: UserService;

  constructor(
    private refreshtokenRepository: RefreshtokenRepository,
    @Inject('AUTH_SERVICE_GRPC') private client: ClientGrpc
  ) { }

  onModuleInit() {
    this.userService = this.client.getService<UserService>('AuthService');
  }

  async findAll(): Promise<RefreshtokenEntity[]> {
    const data = await this.refreshtokenRepository.find();
    return data;
  }

  async findRefreshtokenById(id: string): Promise<RefreshtokenEntity> {
    const refreshtoken = await this.refreshtokenRepository.findOne({ where: { id } });
    if (!refreshtoken) {
      throw new NotFoundException(`Refreshtoken with ID ${id} not found`);
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
