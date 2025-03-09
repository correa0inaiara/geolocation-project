/* eslint-disable jest/no-commented-out-tests */
import { connectDBForTesting, disconnectDBForTesting } from './../connectDBForTesting';
import { UserModel } from '../../models/userModels';
import { base, Faker, pt_BR } from '@faker-js/faker';
import request from 'supertest';
import { closeServer, startServer } from '../startServerForTesting';
import { CustomError } from '../../classes/Errors';
import { ERROR_STATUS } from '../../enums';
import pt from '../../../locales/pt';

describe('UserModels Testing', () => {
  let server;
  // const faker_en = new Faker({locale: [en, base]})
  // const faker_es = new Faker({locale: [es, base]})
  const faker_pt_BR = new Faker({ locale: [pt_BR, base] });
  beforeAll(async () => {
    server = await startServer();
    await connectDBForTesting();
  });

  afterAll(async () => {
    await UserModel.collection.drop();
    await disconnectDBForTesting();
    server = await closeServer(server);
  });

  test('get all users', () => {
    return request(server)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('rows');
        expect(res.body?.rows).toHaveLength(0);
      });
  });

  test('UserModels w/ Address and Location Create Test MUST FAIL', () => {
    const full_address =
      faker_pt_BR.location.city() +
      ' ' +
      faker_pt_BR.location.state() +
      ' ' +
      faker_pt_BR.location.zipCode();
    const longitude = faker_pt_BR.location.longitude();
    const latitude = faker_pt_BR.location.latitude();

    const userInput = {
      name: faker_pt_BR.person.fullName(),
      email: faker_pt_BR.internet.email(),
      address: full_address,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    };

    console.log('userInput', userInput);

    return request(server)
      .post('/api/users')
      .send(userInput)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then((res) => {
        console.log('res.body', res.body);
        const error = new CustomError(
          ERROR_STATUS.BAD_REQUEST,
          pt.translation.apiUserSchemaValidation,
          null,
        );
        expect(res.body).toEqual(error);
      });
  });

  // test('UserModels w/ Address only Create Test', () => {
  //   const full_address =
  //     faker_pt_BR.location.city() +
  //     ' ' +
  //     faker_pt_BR.location.state() +
  //     ' ' +
  //     faker_pt_BR.location.zipCode();

  //   const userInput = {
  //     name: faker_pt_BR.person.fullName(),
  //     email: faker_pt_BR.internet.email(),
  //     address: full_address,
  //   };

  //   console.log('userInput', userInput);

  //   return request(server)
  //     .post('/api/users')
  //     .send(userInput)
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .then((res) => {
  //       console.log('res.body', res.body);
  //       expect(res.body).toHaveProperty('location');
  //       expect(res.body?.address).toEqual(userInput.address);
  //       expect(res.body?.email).toEqual(userInput.email);
  //       expect(res.body?.name).toEqual(userInput.name);
  //     });
  // });

  // test.only("UserModels w/ Location only Create Test", () => {
  //   const longitude = faker_pt_BR.location.longitude()
  //   const latitude = faker_pt_BR.location.latitude()

  //   const userInput = {
  //     name: faker_pt_BR.person.fullName(),
  //     email: faker_pt_BR.internet.email(),
  //     location: {
  //       type: 'Point',
  //       coordinates: [longitude, latitude]
  //     }
  //   };

  //   return request(server)
  //     .post('/api/users')
  //     .send(userInput)
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .then(res_post => {
  //       console.log('res post', res_post)
  //       return request(server)
  //         .get(`/users/${res_post.body._id}`)
  //         .set('Accept', 'application/json')
  //         .expect('Content-Type', /json/)
  //         .expect(200)
  //         .then(res_get =>{
  //           console.log('res get by id', res_get)
  //           expect(res_get.body).toEqual(res_post.body)
  //         })
  //     });
  // });

  test('UserModels w/out Address and Location Create Test MUST FAIL', () => {
    const userInput = {
      name: faker_pt_BR.person.fullName(),
      email: faker_pt_BR.internet.email(),
    };

    return request(server)
      .post('/api/users')
      .send(userInput)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then((res) => {
        console.log('res.body', res.body);
        const error = new CustomError(
          ERROR_STATUS.BAD_REQUEST,
          pt.translation.apiUserSchemaValidation,
          null,
        );
        expect(res.body).toEqual(error);
      });
  });
});
