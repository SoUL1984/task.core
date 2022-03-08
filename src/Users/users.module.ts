import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/Auth/auth.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Infrastructure/Entity/user.entity';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
    exports: [UsersService],
})
export class UsersModule {}
