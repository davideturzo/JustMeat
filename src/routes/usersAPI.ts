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

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    if(!isNaN(req.body.username && req.body.name && req.body.surname)){
       return res.status(400).send("username, name, surname must be valid");
    }
    if(!isNaN(req.body.address && req.body.phone && req.body.email)){
        return res.status(400).send("address, phone and email must be valid");
    }
    const response = await user.newUser(req.body);
    res.json({response});
    next();
});

router.put('/:username', async (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.username){
        return res.status(400).send("Invalid username");
    }
    const response = await user.updateUserFields(req.params.username, req.body.password, req.body.name, req.body.surname, req.body.address, req.body.phone, req.body.email);
    res.json({response});
    next();
});

router.delete('/:id', async (req: Request, res: Response) => {
    if(!req.params.id){
        return res.status(404).send("Invalid user id");
    }
    const response = await user.deleteUser(req.params.id)
    res.json({response});
});

export = router;