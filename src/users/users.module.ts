import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/user.service';
import { User, UserSchema } from './schemas/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
