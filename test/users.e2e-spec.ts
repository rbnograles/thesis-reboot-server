import { DataBaseService } from '../src/db/db.service';
import { Connection } from 'mongoose';
import { userStub } from './../src/users/test/stubs/user.stub';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersController (e2e)', () => {
  let connection: Connection;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    connection = moduleFixture
      .get<DataBaseService>(DataBaseService)
      .getDBHandle();
    await app.init();
  });

  afterEach(async () => {
    // clear database to test creating a new object
    await connection.collection('users').deleteMany({});
  });

  describe('(POST) ', () => {
    const CREATE_API = '/users/create';

    it('should create a new user', async () => {
      return request(app.getHttpServer())
        .post(CREATE_API)
        .send(userStub())
        .expect(201)
        .expect((res) => {
          expect(res.body).toEqual({
            ...userStub(),
            __v: expect.any(Number),
            _id: expect.any(String),
          });
        });
    });

    it('should return a 400 if payload is empty', () => {
      return request(app.getHttpServer())
        .post(CREATE_API)
        .send({})
        .expect(400)
        .expect((res) => {
          expect(res.body.error).toEqual('Bad Request');
        });
    });

    it('should return a 400 if mobileNumber is invalid', () => {
      return request(app.getHttpServer())
        .post(CREATE_API)
        .send({
          ...userStub(),
          mobileNumber: 639516186637,
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.error).toEqual('Bad Request');
        });
    });

    it('should return a 400 when the user already exist', async () => {
      // insert a new collection to produce an existing effect
      await connection.collection('users').insertOne(userStub());

      return request(app.getHttpServer())
        .post(CREATE_API)
        .send(userStub())
        .expect(400);
    });
  });

  describe('(GET ALL)', () => {
    const GET_API = '/users';

    beforeEach(async () => {
      await connection.collection('users').insertOne(userStub());
    });

    it('should return 200', () => {
      return request(app.getHttpServer()).get(GET_API).expect(200);
    });

    it('should return with an array of user object', () => {
      return request(app.getHttpServer())
        .get(GET_API)
        .expect((res) => {
          expect(res.body).toMatchObject([userStub()]);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
