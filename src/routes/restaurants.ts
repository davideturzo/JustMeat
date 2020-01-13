import express, {Request, Response, NextFunction, Router, response} from 'express';
import * as Restaurant from '../restaurant';
import * as Order from '../order';
import bodyParser from 'body-parser';
const router: Router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    if(req.query.name){
        return res.json(Restaurant.restaurantByName(req.query.name));
    }
    if(req.query.city){
        return res.json(Restaurant.restaurantByCity(req.query.city));
    }
    res.json(Restaurant.getRestaurantList());
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    res.json(Restaurant.restaurantById(req.params.id));
    next();
});

router.get('/:id/orders', (req, res) => {
    return res.json(Order.getOrdersByRestaurantId(req.params.id));
});

// validazione del body con express validator
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    if(!isNaN(req.body.name && req.body.address && req.body.email && req.body.plate && req.body.typology)){
        return res.status(400).send("name, address, email must be valid");
    }
    const response = await Restaurant.newRestaurant(req.body);
    res.json(response);
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.id){
        return res.status(400).send('ID must be invalid');
    }
    if(req.body.name){
        const response = await Restaurant.updateRestaurantFields(req.params.id, req.body.name, req.body.address, req.body.email, req.body.plate);
        return res.json(response);
    }
    next();
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.id){
        return res.status(400).send('Invalid id');
    }
    res.json(Restaurant.deleteRestaurant(req.params.id));
    next();
});

export = router;