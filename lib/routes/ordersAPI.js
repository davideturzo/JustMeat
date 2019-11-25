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
const order = __importStar(require("../order"));
const body_parser_1 = __importDefault(require("body-parser"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.get('/', (req, res, next) => {
    if (req.query.userId && req.query.restaurantId) {
        return res.json(order.getOrdersByBothId(req.query.userId, req.query.restaurantId));
    }
    else if (req.query.namePlate) {
        return res.json(order.getOrdersByPlate(req.query.namePlate));
    }
    res.json(order.getOrdersList());
    next();
});
router.post('/create', (req, res, next) => {
    res.json(order.newOrder(req.body));
    next();
});
router.put('/:id', (req, res, next) => {
    res.json(order.changeStatusOrder(req.params.id));
    next();
});
router.delete('/:id', (req, res, next) => {
    res.json(order.deleteOrder(req.params.id));
    next();
});
router.put('/change/:id', (req, res, next) => {
    res.json(order.changeRatingOrder(req.params.id, req.query.rating));
    next();
});
router.get('/:id', (req, res, next) => {
    res.json(order.getOrdersById(req.params.id));
    next();
});
router.get('/:userId/expensiveOrder', (req, res, next) => {
    res.json(order.getExpensiveOrder(req.params.userId));
    next();
});
router.get('/:userId/cheaperOrder', (req, res, next) => {
    res.json(order.getCheaperOrder(req.params.userId));
    next();
});
router.get('/user/:id', (req, res, next) => {
    res.json(order.getOrdersByUserId(req.params.id));
    next();
});
router.get('/restaurant/:id', (req, res, next) => {
    res.json(order.getOrdersByRestaurantId(req.params.id));
    next();
});
module.exports = router;
