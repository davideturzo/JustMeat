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
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
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
        if (req.body.password) {
            return res.json(user.updateUserFields(req.params.username, req.body.password));
        }
        else if (req.body.name) {
            return res.json(user.updateUserFields(req.params.username, req.body.name));
        }
        else if (req.body.surname) {
            return res.json(user.updateUserFields(req.params.username, req.body.surname));
        }
        else if (req.body.address) {
            return res.json(user.updateUserFields(req.params.username, req.body.address));
        }
        else if (req.body.phone) {
            return res.json(user.updateUserFields(req.params.username, req.body.phone));
        }
        else {
            return res.status(400).send("You should change one field");
        }
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
app.listen(3001, "Localhost", (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server is running..");
});
