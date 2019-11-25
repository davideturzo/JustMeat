import request from 'supertest';
const app = require('../app');


describe('GET /orders', function () {
    it('respond with json containing a list of all orders', function (done) {
        request(app)
            .get('/orders')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
describe('POST /orders/create', function () {
    let data = {
        "userId" : "4e2fd5f0-0e03-11ea-93a5-213c75413eaa",
        "restaurantId" : "5a1d5b20-0d41-4c26-8a21-0a5b6d9c3884",
        "shippingAddress" : "Some value",
        "orderItems" : [{
            "quantity" : 1,
            "namePlate" :"pizza"
        }]
    }
    it('respond with json containing a order just created', function (done) {
        request(app)
            .post('/orders/create')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if(err) return done(err);
                done();
            })
    });
});