import { ApiProperty } from '@nestjs/swagger';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum EnumRole {
    customer = 'customer',
    dentaltechn = 'dentaltechn',
    director = 'director',
    courier = 'courier',
    admin = 'admin',
}

export enum EnumCity {
    spb = 'Санкт-Петербург',
    smr = 'Самара',
    msk = 'Москва',
}

// interface UserCreationAttrs {
//   email: string;
//   password: string;
//   name: string;
//   phone: string;
// }

@Entity()
export class User extends BaseEntity {
    @ApiProperty({ example: '1', description: 'Уникальный индентификатор' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'user@mail.ru', description: 'Электронная почта' })
    @Column({ type: 'varchar', unique: true, nullable: false })
    email: string;

    @ApiProperty({ example: '12345678', description: 'Пароль' })
    @Column({ type: 'varchar', length: 250, nullable: false })
    password: string;

    @ApiProperty({ example: 'Пащенко Эдуард', description: 'Имя пользователя' })
    @Column({ type: 'varchar', length: 250, nullable: false })
    name: string;

    @ApiProperty({
        example: 'Самара',
        description: 'Город',
    })
    @Column({
        type: 'enum',
        enum: EnumCity,
        default: EnumCity.msk,
        nullable: false,
    })
    city: EnumCity;

    @ApiProperty({
        example: 'ул. Дыбенко, д. 27В',
        description: 'Адрес пользователя',
    })
    @Column({ nullable: true })
    address: string;

    @ApiProperty({
        example: 'Необходимо звонить вечером',
        description: 'Доолнительная информация',
    })
    @Column({ type: 'text', default: '', nullable: false })
    desc: string;

    @ApiProperty({ example: '+7 (123) 456-78-90', description: 'Телефон' })
    @Column({ unique: true, nullable: false })
    phone: string;

    @ApiProperty({
        example: '05.12.1984',
        description: 'День рождение',
    })
    @Column({ type: 'date', nullable: true })
    birthday: Date;

    @ApiProperty({ example: 'customer', description: 'Роль' })
    @Column({
        type: 'enum',
        enum: EnumRole,
        default: EnumRole.customer,
        nullable: false,
    })
    role: EnumRole;

    @ApiProperty({
        example: '01.01.2021',
        description: 'Дата последнего посещения',
        nullable: true,
    })
    @Column({ type: 'date' })
    lastVisit: Date;

    @ApiProperty({
        example: '01.01.2021',
        description: 'Дата создания',
    })
    @CreateDateColumn()
    created_at: Date;

    @ApiProperty({
        example: '01.01.2021',
        description: 'Дата обновления',
    })
    @UpdateDateColumn()
    updated_at: Date;
}
