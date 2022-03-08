import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Length,
    MaxLength,
} from 'class-validator';
import { EnumCity } from 'src/Infrastructure/Entity/user.entity';

export class CreateUserDto {
    @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Некорректный email' })
    @IsOptional()
    readonly email: string;

    @ApiProperty({ example: '12345678', description: 'Пароль' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(4, 16, { message: 'Не меньше 4 и небольше 16' })
    readonly password: string;

    @ApiProperty({ example: 'Пащенко Э.В.', description: 'ФИО пользователя' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(8, 250, { message: 'Не меньше 8 символов' })
    readonly name: string;

    @ApiProperty({
        example: 'Силовая ул., д. 4, кв. 144',
        description: 'Адрес',
    })
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
}

export class AuthUserDto {
    @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Некорректный email' })
    @IsOptional()
    readonly email: string;

    @ApiProperty({ example: '+7 (123) 456-78-90', description: 'Телефон' })
    @IsPhoneNumber()
    @IsOptional()
    readonly phone: string;

    @ApiProperty({ example: '12345678', description: 'Пароль' })
    @IsString({ message: 'Должно быть строкой' })
    readonly password: string;
}
