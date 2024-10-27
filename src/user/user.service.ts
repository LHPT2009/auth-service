import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async findAll(): Promise<UserEntity[]> {
        const data = await this.userRepository.find();
        return data;
    }
}
