import { userStub } from './../stubs/user.stub';
import { AppModule } from './../../../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { DataBaseService } from '../../../db/db.service';

describe('UserController', () => {
  let dbConnection: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = module.createNestApplication();
    await app.init();
    // set the database connection
    dbConnection = module.get<DataBaseService>(DataBaseService).getDBHandle();
  });

  describe('getUsers', async () => {
    await dbConnection.collection('users').insertOne(userStub());
  });
});
