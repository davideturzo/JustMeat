<<<<<<< HEAD
import express, { Application } from 'express';
import users from './routes/usersAPI';
import restaurants from './routes/restaurantsAPI';
import orders from './routes/ordersAPI';
const app: Application = express();

app.use('/users', users);
app.use('/restaurants', restaurants);
app.use('/orders', orders);

=======
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as user from './user';
import * as rest from './restaurant'
let orders = require('./routes/ordersAPI');
let users = require('./routes/usersAPI');
let restaurants = require('./routes/restaurantsAPI');
const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/orders/',orders)
app.use('/users/',users)
app.use('/restaurants/',restaurants)

>>>>>>> f3433a2e9975df3069b485f753ae089b5dd95733
app.listen(3001, "Localhost", (err) => {
    if(err) {
        return console.log(err);
    }
    console.log("Server is running..");
});
module.exports = app.listen(3001);