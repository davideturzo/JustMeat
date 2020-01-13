"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const restaurants_1 = __importDefault(require("./routes/restaurants"));
const orders_1 = __importDefault(require("./routes/orders"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
app.use('/users', users_1.default);
app.use('/restaurants', restaurants_1.default);
app.use('/orders', orders_1.default);
app.listen(3006, "Localhost", (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server is running..");
});
module.exports = app;
