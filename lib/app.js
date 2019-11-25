"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersAPI_1 = __importDefault(require("./routes/usersAPI"));
const restaurantsAPI_1 = __importDefault(require("./routes/restaurantsAPI"));
const ordersAPI_1 = __importDefault(require("./routes/ordersAPI"));
const app = express_1.default();
app.use('/users', usersAPI_1.default);
app.use('/restaurants', restaurantsAPI_1.default);
app.use('/orders', ordersAPI_1.default);
app.listen(3001, "Localhost", (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server is running..");
});
