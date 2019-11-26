import express, {Request, Response, NextFunction, Router} from 'express';
import * as user from '../user';
import bodyParser from 'body-parser';
const router: Router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    if(!isNaN(req.query.username)){
        return res.status(400).send("Username must be valid");
    }
    if(req.query.username){
       return res.json(user.userById(req.query.username));
    } 
    res.json(user.usersList());
    next();
});

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
    if(!isNaN(req.body.username && req.body.name && req.body.surname)){
       return res.status(400).send("username, name, surname must be valid");
    }
    if(!isNaN(req.body.address && req.body.phone && req.body.email)){
        return res.status(400).send("address, phone and email must be valid");
    }
    res.json(user.newUser(req.body));
    next();
});

router.put('/:username', (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.username){
        return res.status(400).send("Invalid username");
    }
    res.json(user.updateUserFields(req.params.username, req.body.password, req.body.name, req.body.surname, req.body.address, req.body.phone, req.body.email));
    next();
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.id){
        return res.status(404).send("Invalid user id");
    }
    res.json(user.deleteUser(req.params.id));
    next();
});

export = router;