import * as supertest from 'supertest';
import chai from 'chai';
import * as mocha from 'mocha';
import assert from 'assert';
import users from '../routes/usersAPI';
import * as usersMethod from '../user';
import { userById, User, usersList } from '../user';

describe('Users', () => {
    it('Test that user returned from userById() should be a <User> ', () => {
        assert.equal(usersList(), Array<User>());
    });
});








