import express, {Request, Response, NextFunction, Router} from 'express';
import { newOrderRules } from '../validator' ;
import * as Order from '../order';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
const router: Router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

function verifyToken(req: any, res: any, next: any) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split('.')[1];
    console.log(token);
    if(token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, ' ') as any;
    if(!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}

router.post('',newOrderRules(),async (req : Request, res : Response) => {
    // middleware di auth
    // validazione del body
    // userId non va nel body
    const result = await Order.newOrder(req.body);
    return res.json(result);
});
router.put('/:id/acceptOrder', async (req, res) => {
    // validazione id mnogo
    const result = await res.json(Order.changeStatusOrder(req.params.id));
    return res.json(result);
});
router.put('/:id/putRating', async (req, res) => {
    const result = await res.json(Order.changeRatingOrder(req.params.id,req.query.rating));
    return res.json(result);
});
router.delete('/delete/:id', (req, res) => {
    return res.json(Order.deleteOrder(req.params.id));
});
router.get('/', (req, res) => {
    if(req.query.userId && req.query.restaurantId){
        return res.json(Order.getOrdersByBothId(req.query.userId,req.query.restaurantId));
    } else if (req.query.namePlate){
        return res.json(Order.getOrdersByPlate(req.query.namePlate));
    } else if (req.query.userId){
        return res.json(Order.getOrdersById(req.query.userId));
    } else
    return res .json(Order.getOrdersList());
});

export = router;