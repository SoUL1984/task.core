import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../Infrastructure/Entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto, CreateUserDto } from './dto/create-user.dto';
import { InsertResult } from 'typeorm';
import { SelectAllUserDto } from './dto/select-all-user.dto';

export interface UserFindAllOptions {
    param?: SelectAllUserDto;
    page?: number;
    limit?: number;
}

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto): Promise<InsertResult> {
        return await this.userRepository.insert(dto);
    }

    async getAllUsers(options: UserFindAllOptions = {}) {
        const { param, limit, page } = options;

        const { email, name, phone, role } = param;

        let [listUser, count] = [[], 0];

        const nameSearch = name;
        const qb = this.userRepository.createQueryBuilder('user');

        if (email) {
            qb.where('user.email = :email', { email });
        }
        if (name) {
            qb.andWhere('user.name like :name', {
                name: `%${nameSearch}%`,
            });
        }
        if (phone) {
            qb.andWhere('user.phone = :phone', { phone });
        }
        if (role) {
            qb.andWhere('user.role = :role', { role });
        }

        qb.offset((page - 1) * limit ?? 0).limit(limit ?? 20);

        [listUser, count] = await qb.getManyAndCount();

        return { listUser, count };
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }

    async getUserByEmailOrPhone(dto: AuthUserDto): Promise<User> {
        const email = dto.email;
        const phone = dto.phone;

        const qb = this.userRepository
            .createQueryBuilder('User')
            .where(email ? 'user.email = :email' : 'TRUE', { email })
            .orWhere(phone ? 'user.phone = :phone' : 'TRUE', { phone });

        const user = await qb.getOne();

        return user;
    }

    async updateUserByEmail(
        dto: UpdateUserDto,
        email: string,
    ): Promise<boolean> {
        let isUpdate = false;

        const vUpdateUser = await this.userRepository.update({ email }, dto);

        if (vUpdateUser.affected > 0) {
            isUpdate = true;
        }

        return isUpdate;
    }
    async deleteUserByEmail(email: string): Promise<boolean> {
        let isDelete = false;

        const vDeleteUser = await this.userRepository.delete({ email });

        if (vDeleteUser.affected > 0) {
            isDelete = true;
        }

        return isDelete;
    }
}
