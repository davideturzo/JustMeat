import uuidv1 from 'uuid/v1';
import { User, usersList } from '../user';
import { expect } from 'chai';
const request = require('supertest');
const app = require ('../app');

test('Verify that array contains chosed user', () => {
    let user = {
        "id": "835ff110-0f98-11ea-8890-394c0b160928",
        "username": "giovanni.russo",
        "password": "sha1$0fd821e6$1$921e6d304ef499ef2f2dc4cf57ba79678dcc4167",
        "name": "Pippo",
        "surname": "Manfredi",
        "address": "Via Nocilla 3",
        "phone": "3236249490",
        "email": "manfredi.pippo"
    }
    expect(usersList()).contain(user);
  });

describe('POST users/create', () => {
    const myUser: User = {
        id: uuidv1(),
        username: "francesco.musumeci",
        password: "ciaomondo",
        name: "Francesco",
        surname: "Musumeci",
        address: "Via Dante Alighieri 5",
        phone: "0957812019",
        email: "francy.musumeci@gmail.com"
    };
    it('user must inserted only one time', (done) => {
        request(app).post('/users/create').send(myUser)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err: any) => {
            if(err) return done(err);
            done();
        });
    });
  });

describe('GET /users', () => {
    it('Response should be a JSON containing an array <Users>', (done) => {
        request(app).get('/users').set('Accept', 'application/json').expect(200, done);
    });
});
// describe('PUT /username', () => {
//     let data = {
//         "name": "Pippo",
//         "surname": "Manfredi",
//         "email": "manfredi.pippo"
//     }
//     it('response must be a type <User> Object', (done) => {
//         request(app).put('/users/giovanni.russo')
//             .send(data)
//             .set('Accept', 'application/json')
//             .expect(200)
//             .end((err: any) => {
//                 if(err) return done(err);
//                 done();
//             });
//     });
// });
describe('GET /orders', () => {
    it('respond with json containing a list of all orders', (done) => {
        request(app).get('/orders').expect('Content-Type', /json/).expect(200, done);
    });
});
describe('POST /restaurants/create', () => {
    let data = {
        id: uuidv1(),
        "name": "Pizza da NEIC",
        "address": "viale FLEX",
        "email": "flex@flex.flexaro",
        "plate": [
          {
            "name": "PastaColFLEX",
            "price": 10
          }
        ],
        "rating": null,
        "typology": [
          "FLEXERIA, RISTOFLEXERA"
        ]
    }
    it('respond with json containing a order just created', (done) => {
        request(app)
            .post('/restaurants/create')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err: any) => {
                if(err) return done(err);
                done();
            });
    });
});

    describe('POST /orders/create', () => {
        let data = {
            "userId" : "4e2fd5f0-0e03-11ea-93a5-213c75413eaa",
            "restaurantId" : "5a1d5b20-0d41-4c26-8a21-0a5b6d9c3884",
            "shippingAddress" : "Some value",
            "orderItems" : [{
                "quantity" : 1,
                "namePlate" :"pizza"
            }]
        }
        it('respond with json containing a order just created', (done) => {
            request(app)
                .post('/orders/create')
                .send(data)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err: any) => {
                    if(err) return done(err);
                    done();
                });
        });
});