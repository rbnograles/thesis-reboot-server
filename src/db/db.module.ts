import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { DataBaseService } from './db.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('NODE_ENV') === 'test'
            ? configService.get<string>('DB_URI_TEST_CON')
            : configService.get<string>('DB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DataBaseService],
  exports: [DataBaseService],
})
export class DataBaseModule {}
