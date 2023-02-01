import { DataBaseService } from '../src/db/db.service';
import mongoose, { Connection } from 'mongoose';
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

  describe('(POST) /users/create', () => {
    const CREATE_API = '/users/create';

    it('should create a new user', async () => {
      return request(app.getHttpServer())
        .post(CREATE_API)
        .send(userStub())
        .expect(201)
        .expect((res) => {
          expect(res.body).toEqual({
            ...userStub(),
            password: expect.any(String),
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

  describe('(GET ALL) /users', () => {
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

  describe('(GET ONE) /users/:id', () => {
    const GET_API = '/users';
    const randomId: string = new mongoose.Types.ObjectId().toString();
    const NOT_FOUND = 'User not found';
    let _id: string;

    beforeEach(async () => {
      const res = await connection.collection('users').insertOne(userStub());
      _id = res.insertedId.toString();
    });

    it('should return 200', () => {
      return request(app.getHttpServer()).get(`${GET_API}/${_id}`).expect(200);
    });

    it('should return with a user object', () => {
      return request(app.getHttpServer())
        .get(`${GET_API}/${_id}`)
        .expect((res) => {
          expect(res.body).toEqual({
            ...userStub(),
            _id: _id,
          });
        });
    });

    it('should return a 404 if the user does not exist', () => {
      return request(app.getHttpServer())
        .get(`${GET_API}/${randomId}`)
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toEqual(NOT_FOUND);
        });
    });
  });

  describe('(PUT) /users/update/:id', () => {
    const PUT_API = '/users/update';
    const randomId: string = new mongoose.Types.ObjectId().toString();
    const NOT_FOUND = 'User not found';
    let _id: string;

    beforeEach(async () => {
      const res = await connection.collection('users').insertOne(userStub());
      _id = res.insertedId.toString();
    });

    it('should return a 200 with the updated data', () => {
      return request(app.getHttpServer())
        .put(`${PUT_API}/${_id}`)
        .send(userStub())
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            ...userStub(),
            _id: _id,
          });
        });
    });

    it('it should return a 404 if the user is not found', () => {
      return request(app.getHttpServer())
        .put(`${PUT_API}/${randomId}`)
        .send(userStub())
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toEqual(NOT_FOUND);
        });
    });

    it('should return a 400 if payload is empty', () => {
      return request(app.getHttpServer())
        .put(`${PUT_API}/${_id}`)
        .send({})
        .expect(400)
        .expect((res) => {
          expect(res.body.message.length).toEqual(10); // number of error returns
          expect(res.body.error).toEqual('Bad Request');
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
