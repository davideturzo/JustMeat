import express, {Request, Response, NextFunction, Router} from 'express';
import * as order from '../order';
import bodyParser from 'body-parser';
const router: Router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    if(req.query.userId && req.query.restaurantId){
        return res.json(order.getOrdersByBothId(req.query.userId,req.query.restaurantId));
    }else if(req.query.namePlate){
        return res.json(order.getOrdersByPlate(req.query.namePlate));
    }
    res.json(order.getOrdersList());
    next();
});

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
    res.json(order.newOrder(req.body));
    next();
});
router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
    res.json(order.changeStatusOrder(req.params.id));
    next();
});
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    res.json(order.deleteOrder(req.params.id));
    next();
});
router.put('/change/:id', (req: Request, res: Response, next: NextFunction) => {
    res.json(order.changeRatingOrder(req.params.id,req.query.rating));
    next();
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    res.json(order.getOrdersById(req.params.id));
    next();
});
router.get('/:userId/expensiveOrder', (req: Request, res: Response, next: NextFunction) => {
    res.json(order.getExpensiveOrder(req.params.userId));
    next();
});
router.get('/:userId/cheaperOrder', (req: Request, res: Response, next: NextFunction) => {
    res.json(order.getCheaperOrder(req.params.userId));
    next();
});
router.get('/user/:id', (req: Request, res: Response, next: NextFunction) => {
    res.json(order.getOrdersByUserId(req.params.id));
    next();
});
router.get('/restaurant/:id', (req: Request, res: Response, next: NextFunction) => {
    res.json(order.getOrdersByRestaurantId(req.params.id));
    next();
});

export = router;