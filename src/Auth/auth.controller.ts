import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthUserDto, CreateUserDto } from '../Users/dto/create-user.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: AuthUserDto) {
        // let userEmail = null;
        // let userPhone = null;
        // const userPassword = userDto.password;
        // if (userDto.email) userEmail = userDto.email;
        // if (userDto.email) userPhone = userDto.phone;

        // const userLogin: AuthUserDto = {
        //     email: userEmail,
        //     phone: userPhone,
        //     password: userPassword,
        // };

        return this.authService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }
}
