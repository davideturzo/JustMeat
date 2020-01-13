import express, {Request, Response, NextFunction, Router} from 'express';
import * as User from '../user';
import * as Order from '../order';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
const router: Router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    // express validator
    if(!isNaN(req.query.username)){
        return res.status(400).send("Username must be valid");
    }
    if(req.query.username){
       return res.json(await User.userByUsername(req.query.username));
    }
    if(req.query.id){
        // magari chiamata get singolo utente
        return res.json(await User.userById(req.query.id));
    } 
    res.json(await User.usersList());
});
router.get('/:id/orders', async (req, res) => {
    return res.json(await Order.getOrdersByUserId(req.params.id));
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    if(!isNaN(req.body.email && req.body.password)){
        return res.status(400).send("Missing fields");
    }
    const response = await User.login(req.body.email, req.body.password);
    if(response === false) {
       return res.status(401).send("Invalid email or password");
    }
    res.json({response});
    next();
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    if(!isNaN(req.body.username && req.body.name && req.body.surname)){
       return res.status(400).send("username, name, surname must be valid");
    }
    if(!isNaN(req.body.address && req.body.phone && req.body.email)){
        return res.status(400).send("address, phone and email must be valid");
    }
    const response = await User.newUser(req.body);
    res.json({response});
    next();
});

router.put('/:username', async (req: Request, res: Response, next: NextFunction) => {
    // VALIDAZIONE BODY 
    if(!req.params.username){
        return res.status(400).send("Invalid username");
    }
    const response = await User.updateUserFields(req.params.username, req.body.password, req.body.name, req.body.surname, req.body.address, req.body.phone, req.body.email);
    res.json(response);
    next();
});

router.delete('/:id', async (req: Request, res: Response) => {
    if(!req.params.id){
        return res.status(404).send("Invalid user id");
    }
    const response = await User.deleteUser(req.params.id)
    res.json(response);
});

export = router;