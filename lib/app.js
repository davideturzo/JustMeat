"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
let orders = require('./routes/ordersAPI');
let users = require('./routes/usersAPI');
let restaurants = require('./routes/restaurantsAPI');
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/orders/', orders);
app.use('/users/', users);
app.use('/restaurants/', restaurants);
app.listen(3001, "Localhost", (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server is running..");
});
module.exports = app.listen(3001);
