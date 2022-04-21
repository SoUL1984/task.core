import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/Auth/role-auth.decorator';
import { RoleGuard } from 'src/Auth/role.guard';
import { CurUser } from 'src/Auth/user-auth.decorator';
import { SelectAllUserDto } from './dto/select-all-user.dto';
import { UpdateMyDto } from './dto/update-my.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EnumRole, User } from '../Infrastructure/Entity/user.entity';
import { UserFindAllOptions, UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @ApiOperation({ summary: 'Получить всех пользователей' })
    @ApiResponse({ status: 200, type: [SelectAllUserDto] })
    @Roles(EnumRole.admin)
    @UseGuards(RoleGuard)
    @Post('/get-all')
    async getALL(@Body() userDto?: SelectAllUserDto) {
        let currPage = 0;
        let currLimit = 20;
        // проверям является ли данные для пагинации числовыми значениями
        if (Number.isInteger(userDto.page) && Number.isInteger(userDto.limit)) {
            currPage = userDto.page;
            currLimit = userDto.limit;
        }

        // формируем параметры для запроса
        const userSelectAll: UserFindAllOptions = {
            page: currPage,
            limit: currLimit,
            param: userDto,
        };

        const allUsersAndTotal = await this.userService.getAllUsers(
            userSelectAll,
        );

        const users = allUsersAndTotal.listUser;
        const total = allUsersAndTotal.count;

        // информация о пагинации
        const count = {
            curr_page: currPage, // номер страницы
            total, // общее число строк
            page_total: Math.ceil(total / currLimit), // общее число страниц
            page_limit: currLimit, // число строк на странице
        };

        return { users, count };
    }

    @ApiOperation({ summary: 'Удалить пользователя' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles(EnumRole.admin)
    @UseGuards(RoleGuard)
    @Delete(':email')
    remove(@Param('email') email: string) {
        return this.userService.deleteUserByEmail(email);
    }

    @ApiOperation({
        summary: 'Обновить данные пользователя по электронной почте',
    })
    @ApiResponse({ status: 200, type: [User] })
    @Roles(EnumRole.admin)
    @UseGuards(RoleGuard)
    @Patch(':email')
    update(@Param('email') email: string, @Body() userDto: UpdateUserDto) {
        return this.userService.updateUserByEmail(userDto, email);
    }

    @ApiOperation({
        summary:
            'Обновить данные, текущего, пользователя (обновление данных самого себя)',
    })
    @ApiResponse({ status: 200, type: [User] })
    @Roles(
        EnumRole.admin,
        EnumRole.courier,
        EnumRole.customer,
        EnumRole.dentaltechn,
        EnumRole.director,
    )
    @UseGuards(RoleGuard)
    @Patch()
    updateCurrentlyUser(@CurUser() user, @Body() myDto: UpdateMyDto) {
        const userDto: UpdateUserDto = myDto as UpdateUserDto;
        const email = user.email;
        return this.userService.updateUserByEmail(userDto, email);
    }
}
