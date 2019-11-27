import express, {Request, Response, NextFunction, Router, response} from 'express';
import * as rest from '../restaurant';
import bodyParser from 'body-parser';
const router: Router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    if(req.query.id){
        return res.json(rest.restaurantById(req.query.id));
    }
    res.json(rest.getRestaurantList());
    next();
});

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    if(!isNaN(req.body.name && req.body.address && req.body.email && req.body.plate && req.body.typology)){
        return res.status(400).send("name, address, email must be valid");
    }
    const response = await rest.newRestaurant(req.body);
    res.json(response);
});

router.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.id){
        return res.status(400).send('ID must be invalid');
    }
    if(req.body.name){
        const response = await rest.updateRestaurantFields(req.params.id, req.body.name, req.body.address, req.body.email, req.body.plate);
        return res.json(response);
    }
    next();
});
router.delete('/delete/:id', (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.id){
        return res.status(400).send('Invalid id');
    }
    res.json(rest.deleteRestaurant(req.params.id));
    next();
});

export = router;