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
const express_1 = __importDefault(require("express"));
const user = __importStar(require("../user"));
const body_parser_1 = __importDefault(require("body-parser"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.get('/', (req, res, next) => {
    if (!isNaN(req.query.username)) {
        return res.status(400).send("Username must be valid");
    }
    if (req.query.username) {
        return res.json(user.userById(req.query.username));
    }
    res.json(user.usersList());
    next();
});
router.post('/create', (req, res, next) => {
    if (!isNaN(req.body.username && req.body.name && req.body.surname)) {
        return res.status(400).send("username, name, surname must be valid");
    }
    if (!isNaN(req.body.address && req.body.phone && req.body.email)) {
        return res.status(400).send("address, phone and email must be valid");
    }
    res.json(user.newUser(req.body));
    next();
});
router.put('/:username', (req, res, next) => {
    if (!req.params.username) {
        return res.status(400).send("Invalid username");
    }
    res.json(user.updateUserFields(req.params.username, req.body.password, req.body.name, req.body.surname, req.body.address, req.body.phone, req.body.email));
    next();
});
router.delete('/:id', (req, res, next) => {
    if (!req.params.id) {
        return res.status(404).send("Invalid user id");
    }
    if (user.deleteUser(req.params.id)) {
        res.send(true);
    }
    ;
    next();
});
module.exports = router;
