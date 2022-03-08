import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Length,
    MaxLength,
    MinLength,
} from 'class-validator';
import { EnumCity, EnumRole } from 'src/Infrastructure/Entity/user.entity';

export class SelectAllUserDto {
    @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Некорректный email' })
    @IsOptional()
    readonly email: string;

    @ApiProperty({ example: 'Пащенко Э.В.', description: 'ФИО пользователя' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(8, 30, { message: 'Не меньше 8 символов' })
    @IsOptional()
    readonly name: string;

    @ApiProperty({
        example: 'Силовая ул., д. 4, кв. 144',
        description: 'Адрес',
    })
    @IsString({ message: 'Должно быть строкой' })
    @IsEnum(EnumCity)
    @IsOptional()
    readonly city: EnumCity;

    @ApiProperty({ example: 'Самара', description: 'Город' })
    @IsString({ message: 'Должно быть строкой' })
    @MaxLength(250)
    @IsOptional()
    readonly address: string;

    @ApiProperty({
        example: 'Привозить только вовремя',
        description: 'Дополнительное описание',
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

    @ApiProperty({ example: 'customer', description: 'Роль' })
    @IsEnum(EnumRole)
    @IsOptional()
    readonly role: EnumRole;

    @ApiProperty({
        example: '05.12.1984',
        description: 'Последнее посещение системы',
    })
    @IsDateString()
    @IsOptional()
    readonly lastVisit: Date;

    @ApiProperty({
        example: '05.12.1984',
        description: 'Последнее посещение системы',
    })
    @IsDateString()
    @IsOptional()
    readonly createdAt: Date;

    @ApiProperty({
        example: '05.12.1984',
        description: 'Последнее посещение системы',
    })
    @IsDateString()
    @IsOptional()
    readonly updatedAt: Date;

    @ApiProperty({
        example: '0',
        description: 'Номер страницы',
    })
    @IsNumber()
    @IsOptional()
    readonly page: number;

    @ApiProperty({
        example: '20',
        description: 'Количество записей на странице',
    })
    @IsNumber()
    @IsOptional()
    readonly limit: number;
}
