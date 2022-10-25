import { UserRepository } from './repository/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/users.service';
import { User, UserSchema } from './schemas/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UserRepository, UserService],
})
export class UsersModule {}
