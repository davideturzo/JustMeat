import express, { Application } from 'express';
import users from './routes/usersAPI';
import restaurants from './routes/restaurantsAPI';
import orders from './routes/ordersAPI';
import cors from 'cors';
const app: Application = express();

app.use(cors());
app.use('/users', users);
app.use('/restaurants', restaurants);
app.use('/orders', orders);

app.listen(3006, "Localhost", (err) => {
    if(err) {
        return console.log(err);
    }
    console.log("Server is running..");
});
module.exports = app;