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

app.listen(3001, "Localhost", (err) => {
    if(err) {
        return console.log(err);
    }
    console.log("Server is running..");
});
module.exports = app.listen(3001);