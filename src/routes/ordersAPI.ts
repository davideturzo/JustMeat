import express, {Request, Response, NextFunction, Router} from 'express';
import * as order from '../order';
import bodyParser from 'body-parser';
const router: Router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/create', (req, res) => {
    return res.json(order.newOrder(req.body));
});
router.put('/:id/acceptOrder', (req, res) => {
    return res.json(order.changeStatusOrder(req.params.id));
});
router.put('/:id/putRating', (req, res) => {
    return res.json(order.changeRatingOrder(req.params.id,req.query.rating));
});
router.delete('/delete/:id', (req, res) => {
    return res.json(order.deleteOrder(req.params.id));
});
router.get('/', (req, res) => {
    if(req.query.userId && req.query.restaurantId){
        return res.json(order.getOrdersByBothId(req.query.userId,req.query.restaurantId));
    }else if(req.query.namePlate){
        return res.json(order.getOrdersByPlate(req.query.namePlate));
    }else if(req.query.userId){
        return res.json(order.getOrdersById(req.query.userId));
    }else
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

export = router;