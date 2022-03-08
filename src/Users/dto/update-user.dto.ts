import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Length,
    MinLength,
} from 'class-validator';
import { EnumCity, EnumRole } from 'src/Infrastructure/Entity/user.entity';

export class UpdateUserDto {
    @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
    @IsOptional()
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Некорректный email' })
    readonly email: string;

    @ApiProperty({ example: '12345678', description: 'Пароль' })
    @IsOptional()
    @IsString({ message: 'Должно быть строкой' })
    @Length(4, 16, { message: 'Не меньше 4 и небольше 16' })
    readonly password: string;

    @ApiProperty({ example: 'Пащенко Э.В.', description: 'ФИО пользователя' })
    @IsOptional()
    @IsString({ message: 'Должно быть строкой' })
    @Length(8, 250, { message: 'Не меньше 8 символов' })
    readonly name: string;

    @ApiProperty({ example: 'Самара', description: 'Город' })
    @IsEnum(EnumCity)
    @IsOptional()
    readonly city: EnumCity;

    @ApiProperty({ example: 'ул. Силовая 4, кв. 144', description: 'Город' })
    @IsString({ message: 'Должно быть строкой' })
    @IsOptional()
    readonly address: string;

    @ApiProperty({
        example: 'Необходимо звонить вечером',
        description: 'Дополнительная информация',
    })
    @IsString({ message: 'Должно быть строкой' })
    @IsOptional()
    readonly desc: string;

    @ApiProperty({ example: '+7 (123) 456-78-90', description: 'Телефон' })
    @IsPhoneNumber()
    @IsOptional()
    readonly phone: string;

    @ApiProperty({
        example: '05.12.1984',
        description: 'День рождение',
    })
    @IsDateString()
    @IsOptional()
    readonly birthday: Date;

    @ApiProperty({ example: 'Customer', description: 'Роль' })
    @IsEnum(EnumRole)
    @IsOptional()
    readonly role: EnumRole;
}
