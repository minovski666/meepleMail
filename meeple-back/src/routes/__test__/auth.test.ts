import request from 'supertest';
import {app} from '../../app';

/*
 *  @method POST
 *  @route /api/auth/sign-up
 *  @desc Sign up
 */
it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/auth/sign-up')
        .send({
            email: 'test@test.com',
            password: '123456'
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/auth/sign-up')
        .send({
            email: 'asdfadfaf',
            password: '123456'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/auth/sign-up')
        .send({
            email: 'asdfadfaf',
            password: ' '
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/auth/sign-up')
        .send({
            email: 'asdfadfaf',
        })
        .expect(400);

    await request(app)
        .post('/api/auth/sign-up')
        .send({
            password: 'asdfadfaf',
        })
        .expect(400);
});

it('disallow duplicate emails', async () => {
    await request(app)
        .post('/api/auth/sign-up')
        .send({
            email: 'test@test.com',
            password: '123456'
        })
        .expect(201);

    await request(app)
        .post('/api/auth/sign-up')
        .send({
            email: 'test@test.com',
            password: '123456'
        })
        .expect(400);
});

/*
 *  @method POST
 *  @route /api/auth/sign-in
 *  @desc Sign in
 */

it('Fails when an email that does not exits is supplied', async () => {
   await request(app)
       .post('/api/auth/sign-in')
       .send({
           email:'test@test.com',
           password:'123456'
       })
       .expect(401)
});

it('Fails when an incorect password is supplied', async () => {
    await request(app)
        .post('/api/auth/sign-up')
        .send({
            email:'test@test.com',
            password:'123456'
        })
        .expect(201)

    await request(app)
        .post('/api/auth/sign-in')
        .send({
            email:'test@test.com',
            password:'uklytvluyiv'
        })
        .expect(401)
});