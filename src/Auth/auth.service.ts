import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthUserDto, CreateUserDto } from 'src/Users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/Users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EnumRole, User } from 'src/Infrastructure/Entity/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(userDto: AuthUserDto) {
        const user = await this.validateUser(userDto);

        if (!user) {
            throw new HttpException(
                'Пользователь не найден.',
                HttpStatus.BAD_REQUEST,
            );
        }

        const userGenToken = {
            id: user.id,
            email: user.email,
            phone: user.phone,
            role: user.role,
        };

        return this.generateToken(userGenToken);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmailOrPhone(userDto);
        if (candidate) {
            throw new HttpException(
                'Пользователь с таким email или телефоном существует',
                HttpStatus.BAD_REQUEST,
            );
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({
            ...userDto,
            password: hashPassword,
        });

        const userGenToken = {
            id: user.identifiers[0].id,
            email: userDto.email,
            phone: userDto.phone,
            role: user.generatedMaps[0].role,
        };

        return this.generateToken(userGenToken);
    }
    private async generateToken(user: {
        id: number;
        email: string;
        phone: string;
        role: EnumRole;
    }) {
        return {
            token: this.jwtService.sign(user),
        };
    }
    private async validateUser(userDto: AuthUserDto) {
        const user = await this.userService.getUserByEmailOrPhone(userDto);
        if (user == null) {
            throw new UnauthorizedException({
                message: 'AuthService.validateUser - Пользователь не найден',
            });
        }
        const passwordEquals = await bcrypt.compare(
            userDto.password,
            user.password,
        );
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({
            message: 'Некорректный email или пароль',
        });
    }
}
