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
const Restaurant = __importStar(require("../restaurant"));
const Order = __importStar(require("../order"));
const body_parser_1 = __importDefault(require("body-parser"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.get('/', (req, res, next) => {
    if (req.query.name) {
        return res.json(Restaurant.restaurantByName(req.query.name));
    }
    if (req.query.city) {
        return res.json(Restaurant.restaurantByCity(req.query.city));
    }
    res.json(Restaurant.getRestaurantList());
});
router.get('/:id', (req, res, next) => {
    res.json(Restaurant.restaurantById(req.params.id));
    next();
});
router.get('/:id/orders', (req, res) => {
    return res.json(Order.getOrdersByRestaurantId(req.params.id));
});
// validazione del body con express validator
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isNaN(req.body.name && req.body.address && req.body.email && req.body.plate && req.body.typology)) {
        return res.status(400).send("name, address, email must be valid");
    }
    const response = yield Restaurant.newRestaurant(req.body);
    res.json(response);
}));
router.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(400).send('ID must be invalid');
    }
    if (req.body.name) {
        const response = yield Restaurant.updateRestaurantFields(req.params.id, req.body.name, req.body.address, req.body.email, req.body.plate);
        return res.json(response);
    }
    next();
}));
router.delete('/:id', (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send('Invalid id');
    }
    res.json(Restaurant.deleteRestaurant(req.params.id));
    next();
});
module.exports = router;
