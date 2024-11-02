import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async findAll(): Promise<UserEntity[]> {
        const data = await this.userRepository.find();
        return data;
    }

    async findUserById(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id }, relations: ["roles", "permissions"] });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findUserByUsername(username: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { username: username } });
        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        await this.findUserById(id);
        await this.userRepository.update(id, updateUserDto);
        return this.findUserById(id);
    }

    async delete(id: string): Promise<void> {
        const user = await this.findUserById(id);
        await this.userRepository.remove(user);
    }
}
