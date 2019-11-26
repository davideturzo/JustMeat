"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const assert_1 = __importDefault(require("assert"));
const user_1 = require("../user");
const app = require('../app');
describe('Users', () => {
    it('Test that user returned from userById() should be a <User> ', () => {
        assert_1.default.equal(user_1.usersList(), Array());
    });
});
describe('GET /orders', function () {
    it('respond with json containing a list of all orders', function (done) {
        supertest_1.default(app)
            .get('/orders')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
describe('POST /orders/create', function () {
    let data = {
        "userId": "4e2fd5f0-0e03-11ea-93a5-213c75413eaa",
        "restaurantId": "5a1d5b20-0d41-4c26-8a21-0a5b6d9c3884",
        "shippingAddress": "Some value",
        "orderItems": [{
                "quantity": 1,
                "namePlate": "pizza"
            }]
    };
    it('respond with json containing a order just created', function (done) {
        supertest_1.default(app)
            .post('/orders/create')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
            if (err)
                return done(err);
            done();
        });
    });
});
