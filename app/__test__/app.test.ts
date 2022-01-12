import request from 'supertest';

import app from '../src/app';

import AmqpService from '../src/services/amqp-service';

jest.mock('../src/services/amqp-service');

describe('API /email-hook', () => {
  test('returns 400 for request without body', (done) => {
    request(app)
      .post('/email-hook')
      .expect(400)
      .expect('Content-Type', /json/gi)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test('returns 400 for request with invalid body', (done) => {
    request(app)
      .post('/email-hook')
      .send({
        to: 'test@test',
        cc: ['test@email'],
        bcc: ['test@email'],
        subject: '',
        message: '',
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.errors).not.toBeNull();
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test('returns 200 for request with valid body', (done) => {
    request(app)
      .post('/email-hook')
      .send({
        to: 'test@test.com',
        cc: ['test@email.com'],
        bcc: ['test@email.com'],
        subject: 'This is email subject',
        message: 'This is email message',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
