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
const rest = __importStar(require("../restaurant"));
const body_parser_1 = __importDefault(require("body-parser"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.get('/', (req, res, next) => {
    if (req.query.id) {
        return res.json(rest.restaurantById(req.query.id));
    }
    res.json(rest.getRestaurantList());
    next();
});
router.post('/create', (req, res, next) => {
    if (!isNaN(req.body.name && req.body.address && req.body.email)) {
        return res.status(400).send("name, address, email must be valid");
    }
    res.json(rest.newRestaurant(req.body));
    next();
});
router.put('/update/:id', (req, res, next) => {
    if (req.params.id) {
        if (req.body.name) {
            rest.updateRestaurantFields(req.params.id, req.body.name, req.body.address, req.body.email, req.body.plate);
            return res.json(rest.getRestaurantList());
        }
    }
    next();
});
router.delete('/delete/:id', (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send('Invalid id');
    }
    res.json(rest.deleteRestaurant(req.params.id));
    next();
});
module.exports = router;