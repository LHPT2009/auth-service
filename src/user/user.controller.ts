import { Controller, Get, Body, Param, Post, Patch, Delete, HttpCode, HttpStatus, UseInterceptors, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { AuthGuard } from 'common/exceptions/guards/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard)
    findAll(): Promise<UserEntity[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findUserById(@Param('id') id: string): Promise<UserEntity> {
        return this.userService.findUserById(id);
    }

    @Get('permission/:id')
    @HttpCode(HttpStatus.OK)
    async findPermissionByUserId(@Param('id') id: string): Promise<{}> {
        return this.userService.findPermissionByUserId(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userService.create(createUserDto);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string): Promise<void> {
        await this.userService.delete(id);
    }
}