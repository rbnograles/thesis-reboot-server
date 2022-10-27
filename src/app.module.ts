import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DataBaseModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.dev.env', isGlobal: true }),
    DataBaseModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
