import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as user from './user';
import * as rest from './restaurant'
import * as order from './order';
const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/user/create', (req: Request, res: Response) => {
    if(!isNaN(req.body.username && req.body.name && req.body.surname)){
       return res.status(400).send("username, name, surname must be valid");
    }
    if(!isNaN(req.body.address && req.body.phone && req.body.email)){
        return res.status(400).send("address, phone and email must be valid");
    }
    return res.json(user.newUser(req.body));
});

app.get('/users', (req: Request, res: Response) => {
    if(!isNaN(req.query.username)){
        res.status(400).send("Username must be valid");
    }
    if(req.query.username){
       return res.json(user.userById(req.query.username));
    } 
    return res.json(user.usersList());
});

//TODO put call must be fixed, it produce a strange type of error
app.put('/users/:username', (req: Request, res: Response) => {
    if(req.params.username){
        if(req.body.password){
            return res.json(user.updateUserFields(req.params.username, req.body.password));
        } else if(req.body.name){
            return res.json(user.updateUserFields(req.params.username, req.body.name));
        } else if(req.body.surname){
            return res.json(user.updateUserFields(req.params.username, req.body.surname));
        } else if(req.body.address){
            return res.json(user.updateUserFields(req.params.username, req.body.address));
        } else if(req.body.phone){
            return res.json(user.updateUserFields(req.params.username, req.body.phone));
        } else {
            return res.status(400).send("You should change one field");
        }
    }
});

app.delete('/users/:id', (req: Request, res: Response) => {
    if(req.params.id){
        return res.json(user.deleteUser(req.params.id));
    } else {
        return res.status(404).send("User not found");
    }
});

app.post('/orders/create', (req: Request, res: Response) => {
    return res.json(order.newOrder(req.body));
});
app.put('/orders/:id', (req: Request, res: Response) => {
    return res.json(order.changeStatusOrder(req.params.id));
});
app.delete('/orders/:id', (req: Request, res: Response) => {
    return res.json(order.deleteOrder(req.params.id));
});
app.put('/orders/change/:id', (req: Request, res: Response) => {
    return res.json(order.changeRatingOrder(req.params.id,req.query.rating));
});
app.get('/orders', (req: Request, res: Response) => {
    if(req.query.userId && req.query.restaurantId){
        return res.json(order.getOrdersByBothId(req.query.userId,req.query.restaurantId));
    }else if(req.query.namePlate){
        return res.json(order.getOrdersByPlate(req.query.namePlate));
    }
    return res.json(order.getOrdersList());
});
app.get('/orders/:id', (req: Request, res: Response) => {
    return res.json(order.getOrdersById(req.params.id));
});
app.get('/orders/:userId/expensiveOrder', (req: Request, res: Response) => {
    return res.json(order.getExpensiveOrder(req.params.userId));
});
app.get('/orders/:userId/cheaperOrder', (req: Request, res: Response) => {
    return res.json(order.getCheaperOrder(req.params.userId));
});
app.get('/orders/user/:id', (req: Request, res: Response) => {
    return res.json(order.getOrdersByUserId(req.params.id));
});
app.get('/orders/restaurant/:id', (req: Request, res: Response) => {
    return res.json(order.getOrdersByRestaurantId(req.params.id));
});
app.post('/restaurant/create', (req: Request, res: Response) => {
    if(!isNaN(req.body.name && req.body.address && req.body.email)){
        return res.status(400).send("name, address, email must be valid");
     }
     return res.json(rest.newRestaurant(req.body));
});
app.get('/restaurant/list', (req: Request, res: Response) => {
    return res.json(rest.getRestaurantList());
}); 
app.put('/restaurant/update/:id', (req: Request, res: Response) => {
        if(req.params.id){
            if(req.body.name){
                rest.updateRestaurantFields(req.params.id, req.body.name, req.body.address, req.body.email, req.body.plate);
                return res.json(rest.getRestaurantList());
            }
        }
});
app.get('/restaurant/search/:id', (req: Request, res: Response) => {
    if(req.params.id){
        return res.json(rest.restaurantById(req.params.id));
    }else{
        return res.status(404).send('restaurant not found');
    }
});
app.delete('/restaurant/delete/:id', (req: Request, res: Response) => {
    if(req.params.id){
        return res.json(rest.deleteRestaurant(req.params.id));
    }else{
        return res.status(404).send('Restaurant not found');
    }
})
app.listen(3001, "Localhost", (err) => {
    if(err) {
        return console.log(err);
    }
    console.log("Server is running..");
});
