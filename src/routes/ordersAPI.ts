import express, {Request, Response, NextFunction, Router} from 'express';
import * as order from '../order';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
const router: Router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

function verifyToken(req: any, res: any, next: any) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'secret') as any;
    if(!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}

router.post('/create', verifyToken, async (req, res) => {
    const result = await order.newOrder(req.body);
    return res.json(result);
});
router.put('/:id/acceptOrder', async (req, res) => {
    const result = await res.json(order.changeStatusOrder(req.params.id));
    return res.json(result);
});
router.put('/:id/putRating', verifyToken, async (req, res) => {
    const result = await res.json(order.changeRatingOrder(req.params.id,req.query.rating));
    return res.json(result);
});
router.delete('/delete/:id', verifyToken, (req, res) => {
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