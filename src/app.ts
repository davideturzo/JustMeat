import express, { Application } from 'express';
import Users from './routes/users';
import Restaurants from './routes/restaurants';
import Orders from './routes/orders';
import cors from 'cors';

const app: Application = express();



app.use(cors());
app.use('/users', Users);
app.use('/restaurants', Restaurants);
app.use('/orders', Orders);

app.listen(3006, "Localhost", (err) => {
    if(err) {
        return console.log(err);
    }
    console.log("Server is running..");
});
module.exports = app;