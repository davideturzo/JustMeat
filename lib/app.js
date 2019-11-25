"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user = __importStar(require("./user"));
const rest = __importStar(require("./restaurant"));
let order = require('./routes/order');
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/orders/', order);
app.post('/user/create', (req, res) => {
    if (!isNaN(req.body.username && req.body.name && req.body.surname)) {
        return res.status(400).send("username, name, surname must be valid");
    }
    if (!isNaN(req.body.address && req.body.phone && req.body.email)) {
        return res.status(400).send("address, phone and email must be valid");
    }
    return res.json(user.newUser(req.body));
});
app.get('/users', (req, res) => {
    if (!isNaN(req.query.username)) {
        res.status(400).send("Username must be valid");
    }
    if (req.query.username) {
        return res.json(user.userById(req.query.username));
    }
    return res.json(user.usersList());
});
//TODO put call must be fixed, it produce a strange type of error
app.put('/users/:username', (req, res) => {
    if (req.params.username) {
        return res.json(user.updateUserFields(req.params.username, req.body.password, req.body.name, req.body.surname, req.body.address, req.body.phone, req.body.email));
    }
    else {
        return res.status(400).send("You should change one field");
    }
});
app.delete('/users/:id', (req, res) => {
    if (req.params.id) {
        return res.json(user.deleteUser(req.params.id));
    }
    else {
        return res.status(404).send("User not found");
    }
});
app.post('/orders/create', (req, res) => {
    return res.json(order.newOrder(req.body));
});
app.put('/orders/:id', (req, res) => {
    return res.json(order.changeStatusOrder(req.params.id));
});
app.delete('/orders/:id', (req, res) => {
    return res.json(order.deleteOrder(req.params.id));
});
app.put('/orders/change/:id', (req, res) => {
    return res.json(order.changeRatingOrder(req.params.id, req.query.rating));
});
app.get('/orders', (req, res) => {
    if (req.query.userId && req.query.restaurantId) {
        return res.json(order.getOrdersByBothId(req.query.userId, req.query.restaurantId));
    }
    else if (req.query.namePlate) {
        return res.json(order.getOrdersByPlate(req.query.namePlate));
    }
    return res.json(order.getOrdersList());
});
app.get('/orders/:id', (req, res) => {
    return res.json(order.getOrdersById(req.params.id));
});
app.get('/orders/:userId/expensiveOrder', (req, res) => {
    return res.json(order.getExpensiveOrder(req.params.userId));
});
app.get('/orders/:userId/cheaperOrder', (req, res) => {
    return res.json(order.getCheaperOrder(req.params.userId));
});
app.get('/orders/user/:id', (req, res) => {
    return res.json(order.getOrdersByUserId(req.params.id));
});
app.get('/orders/restaurant/:id', (req, res) => {
    return res.json(order.getOrdersByRestaurantId(req.params.id));
});
app.post('/restaurant/create', (req, res) => {
    if (!isNaN(req.body.name && req.body.address && req.body.email)) {
        return res.status(400).send("name, address, email must be valid");
    }
    return res.json(rest.newRestaurant(req.body));
});
app.get('/restaurant/list', (req, res) => {
    return res.json(rest.getRestaurantList());
});
app.put('/restaurant/update/:id', (req, res) => {
    if (req.params.id) {
        if (req.body.name) {
            rest.updateRestaurantFields(req.params.id, req.body.name, req.body.address, req.body.email, req.body.plate);
            return res.json(rest.getRestaurantList());
        }
    }
});
app.get('/restaurant/search/:id', (req, res) => {
    if (req.params.id) {
        return res.json(rest.restaurantById(req.params.id));
    }
    else {
        return res.status(404).send('restaurant not found');
    }
});
app.delete('/restaurant/delete/:id', (req, res) => {
    if (req.params.id) {
        return res.json(rest.deleteRestaurant(req.params.id));
    }
    else {
        return res.status(404).send('Restaurant not found');
    }
});
app.listen(3001, "Localhost", (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server is running..");
});
module.exports = app.listen(3001);
