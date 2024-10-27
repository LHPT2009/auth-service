import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll(): Promise<UserEntity[]> {
        return this.userService.findAll();
    }
}