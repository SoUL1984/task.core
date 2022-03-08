import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../Infrastructure/Entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto, CreateUserDto } from './dto/create-user.dto';
import { InsertResult } from 'typeorm';
import { SelectAllUserDto } from './dto/select-all-user.dto';

export interface UserFindAllOptions {
    where?: SelectAllUserDto;

    page?: number;
    limit?: number;
}

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto): Promise<InsertResult> {
        let user: InsertResult = null;

        try {
            user = await this.userRepository.insert(dto);
        } catch (error) {
            throw new HttpException(
                'Возникла ошибка при добавлении пользователя.',
                HttpStatus.BAD_REQUEST,
            );
        }

        return user;
    }

    async getAllUsers(options: UserFindAllOptions = {}) {
        const { where, limit, page } = options;

        let [users, total] = [[], 0];

        try {
            const qb = this.userRepository.createQueryBuilder('User');

            if (where) {
                // поиск по всем условиям
                const {
                    email,
                    name,
                    city,
                    address,
                    desc,
                    phone,
                    birthday,
                    role,
                    lastVisit,
                    createdAt,
                    updatedAt,
                } = where;

                const nameSearch = name;

                if (email) qb.orWhere('User.email = :email', { email });
                if (name)
                    qb.orWhere('User.name like :name', {
                        name: `%${nameSearch}%`,
                    });
                if (city) qb.orWhere('User.city = :city', { city });
                if (address) qb.orWhere('User.address = :address', { address });
                if (desc) qb.orWhere('User.desc = :desc', { desc });
                if (phone) qb.orWhere('User.phone = :phone', { phone });
                if (birthday)
                    qb.orWhere('User.birthday = :birthday', { birthday });
                if (role) qb.orWhere('User.role = :role', { role });
                if (lastVisit)
                    qb.orWhere('User.lastVisit = :lastVisit', { lastVisit });
                if (createdAt)
                    qb.orWhere('User.createdAt = :createdAt', { createdAt });
                if (updatedAt)
                    qb.orWhere('User.updatedAt = :updatedAt', { updatedAt });
            }

            qb.offset(page ?? 0);
            qb.limit(limit ?? 20);

            [users, total] = await qb.getManyAndCount();
        } catch (error) {
            throw new HttpException(
                'Возникла ошибка при получении списка пользователей.',
                HttpStatus.BAD_REQUEST,
            );
        }

        return { users, total };
    }

    async getUserByEmail(email: string): Promise<User> {
        let user = null;

        try {
            user = await this.userRepository.findOne({ where: { email } });
        } catch (error) {
            throw new HttpException(
                'Возникла ошибка при поиске пользователя.',
                HttpStatus.BAD_REQUEST,
            );
        }

        return user;
    }

    async getUserByEmailOrPhone(dto: AuthUserDto): Promise<User> {
        let user = null;

        const email = dto.email;
        const phone = dto.phone;

        try {
            const qb = this.userRepository.createQueryBuilder('User');
            if (email) qb.where('User.email = :email', { email });
            if (phone) qb.orWhere('User.phone = :phone', { phone });

            user = await qb.getOne();
        } catch (e) {
            throw new HttpException(
                'Возникла ошибка при поиске пользователя.',
                HttpStatus.BAD_REQUEST,
            );
        }

        return user;
    }

    async updateUserByEmail(
        dto: UpdateUserDto,
        email: string,
    ): Promise<boolean> {
        let isUpdate = false;

        try {
            const vUpdateUser = await this.userRepository.update(
                { email },
                dto,
            );

            if (vUpdateUser.affected > 0) {
                isUpdate = true;
            }
        } catch (e) {
            throw new HttpException(
                'Возникла ошибка при обновлении данных пользователя.',
                HttpStatus.BAD_REQUEST,
            );
        }

        return isUpdate;
    }
    async deleteUserByEmail(email: string): Promise<boolean> {
        let isDelete = false;

        try {
            const vDeleteUser = await this.userRepository.delete({ email });

            if (vDeleteUser.affected > 0) {
                isDelete = true;
            }
        } catch (e) {
            throw new HttpException(
                'Возникла ошибка при удалении пользователя.',
                HttpStatus.BAD_REQUEST,
            );
        }

        return isDelete;
    }
}
