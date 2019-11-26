"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
router.post('/create', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isNaN(req.body.username && req.body.name && req.body.surname)) {
        return res.status(400).send("username, name, surname must be valid");
    }
    if (!isNaN(req.body.address && req.body.phone && req.body.email)) {
        return res.status(400).send("address, phone and email must be valid");
    }
    const response = yield user.newUser(req.body);
    res.json({ response });
    next();
}));
router.put('/:username', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.username) {
        return res.status(400).send("Invalid username");
    }
    const response = yield user.updateUserFields(req.params.username, req.body.password, req.body.name, req.body.surname, req.body.address, req.body.phone, req.body.email);
    res.json({ response });
    next();
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(404).send("Invalid user id");
    }
    const response = yield user.deleteUser(req.params.id);
    res.json({ response });
}));
module.exports = router;
