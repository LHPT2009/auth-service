import { Controller, Get, Body, Param, Post, Patch, Delete, HttpCode, HttpStatus, UseInterceptors, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AssignRolesToUserDto } from './dto/assign-roles-to-user.dto';
import { AuthGuard } from 'common/exceptions/guards/auth.guard';
import { RoleGuard } from 'common/exceptions/guards/role.guard';
import { PermissionGuard } from 'common/exceptions/guards/permission.guard';
import { Roles } from 'common/exceptions/guards/decorator/roles.decorator';
import { Permissions } from 'common/exceptions/guards/decorator/permissions.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles()
    @Permissions()
    @UseGuards(AuthGuard, RoleGuard, PermissionGuard)
    findAll(): Promise<UserEntity[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findUserById(@Param('id') id: string): Promise<UserEntity> {
        return this.userService.findUserById(id);
    }

    @Get('role_permission/:id')
    @HttpCode(HttpStatus.OK)
    async findRoleAndPermissionByUserId(@Param('id') id: string): Promise<{}> {
        return this.userService.findRoleAndPermissionByUserId(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userService.create(createUserDto);
    }

    @Post('assign')
    @HttpCode(HttpStatus.OK)
    assignRolesToUser(@Body() assignRolesToUserDto: AssignRolesToUserDto): Promise<UserEntity> {
        return this.userService.assignRolesToUser(assignRolesToUserDto);
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