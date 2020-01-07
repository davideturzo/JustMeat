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
const order = __importStar(require("../order"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jsonwebtoken_1.default.verify(token, 'secret');
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order.newOrder(req.body);
    return res.json(result);
}));
router.put('/:id/acceptOrder', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield res.json(order.changeStatusOrder(req.params.id));
    return res.json(result);
}));
router.put('/:id/putRating', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield res.json(order.changeRatingOrder(req.params.id, req.query.rating));
    return res.json(result);
}));
router.delete('/delete/:id', (req, res) => {
    return res.json(order.deleteOrder(req.params.id));
});
router.get('/', (req, res) => {
    if (req.query.userId && req.query.restaurantId) {
        return res.json(order.getOrdersByBothId(req.query.userId, req.query.restaurantId));
    }
    else if (req.query.namePlate) {
        return res.json(order.getOrdersByPlate(req.query.namePlate));
    }
    else if (req.query.userId) {
        return res.json(order.getOrdersById(req.query.userId));
    }
    else
        return res.json(order.getOrdersList());
});
router.get('/:userId/expensiveOrder', (req, res) => {
    return res.json(order.getExpensiveOrder(req.params.userId));
});
router.get('/:userId/cheaperOrder', (req, res) => {
    return res.json(order.getCheaperOrder(req.params.userId));
});
router.get('/user/:id', (req, res) => {
    return res.json(order.getOrdersByUserId(req.params.id));
});
router.get('/restaurant/:id', (req, res) => {
    return res.json(order.getOrdersByRestaurantId(req.params.id));
});
module.exports = router;
