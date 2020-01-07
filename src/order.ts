import {v4 as uuidv1} from 'uuid';
import fs from 'fs';
import { promisify } from 'util';
import {User} from './user';
import {Restaurants} from './restaurant';

export interface OrderList{
    quantity : number;
    name : string,
    price : number
}
export interface Order{
    id: string,
    userId: string,
    restaurantId: string,
    date: string,
    shippingAddress : string,
    orderItems: Array<OrderList>,
    totalAmount: number,
    rating : number,
    statusOrder : boolean
};

const jsonStringUser = '/json_file/users.json';
const jsonStringOrder  ='/json_file/orders.json';
const jsonStringRestaurant  ='/json_file/restaurants.json';
let userList = Array<User>();
let restaurantList = Array<Restaurants>();
let orderList = Array<Order>();

const readFile = promisify(fs.readFile);
async function myReadfile (jsonFile : string) {
    try {
      const file = await readFile(__dirname+jsonFile, 'utf-8' );
      return file;
    }
    catch (err) {
       throw err;
    }
}
const writeFile = promisify(fs.writeFile);
async function myWriteFile(jsonFile : string,result: string) {
    try {
        await writeFile(__dirname+jsonFile, result );
    }
    catch (err) {
       throw err;
    }
}
(async () => {
    userList = JSON.parse(await myReadfile(jsonStringUser));
    restaurantList = JSON.parse(await myReadfile(jsonStringRestaurant));
    orderList = JSON.parse(await myReadfile(jsonStringOrder));
})();

export async function newOrder(order: Order): Promise<Object> {
    var timestampNow = new Date();
    var date = timestampNow.getDate() + "-" + (timestampNow.getMonth()+1) + "-" + timestampNow.getFullYear();
    var time = timestampNow.getHours() + ":" + timestampNow.getMinutes() + ":" + timestampNow.getSeconds();
    var dateOrder = date + " " + time;
    var totalPrice=0;
    var orderPlate =Array<OrderList>();
    var completeOrder =Object();
    for(let user of userList){
        if(user.id === order.userId){
            for(let restaurant of restaurantList ){
                if(restaurant.id === order.restaurantId){
                    for(let plates of order.orderItems){
                        for(let item of restaurant.plate){
                            if(item.name === plates.name){
                                orderPlate.push({
                                    quantity : 1,
                                    name : plates.name,
                                    price : plates.price
                                });
                                totalPrice+=item.price;
                            }
                        }
                    }
                    completeOrder={
                        id : uuidv1(),
                        userId : order.userId,
                        restaurantId : order.restaurantId,
                        date : dateOrder,
                        shippingAddress : order.shippingAddress,
                        orderItems : orderPlate,
                        totalAmount : totalPrice,
                        rating : null,
                        statusOrder : false
                    }
                    console.log(orderPlate)
                    orderList.push(completeOrder)
                    let finalOrder = JSON.stringify(orderList,null,2);
                    await myWriteFile(jsonStringOrder,finalOrder);
                    return completeOrder;
                }
            }
            return {response : "Restaurant not found"};            
        } 
    }
    return {response : "User not found"};
}
/* export function modifyOrder(ID:string,orderItems:Array<OrderList>): boolean {
    var totalPrice=0;
    var orderItems =Array<OrderList>();
        if(orderList.includes(ID)){
            for (let item of orderItems) {
                if(restaurantList[ID].includes(item.namePlate)){
                    orderItems.push(item);
                    totalPrice+=item.price;
                }
            }
        for(var item of orderList) {
            if(item.ID === ID){
                item.totalAmount = totalPrice;
                item.orderItems = orderItems;
            }
        }
        return true;
    }else return false;
} */
export async function changeStatusOrder(ID:string): Promise<Object | boolean> {
    let counter =0;
    for(let order of orderList){
        if(order.id ===ID){
            if(order.statusOrder === false){
                order.statusOrder = true;
                orderList.splice(counter,1,order);
                const result = JSON.stringify(orderList,null,2);
                await myWriteFile(jsonStringOrder,result);
                return order;
            } return {response : "You can't dismiss order"}
        }
        counter++;
    }
    return {response : "Order not found"};
}

export async function changeRatingOrder(ID:string,rating:number): Promise<Object | boolean> {
    let counter=0;
    for(let order of orderList){
        if(order.id ===ID){
            if(order.rating == null){
                if(order.rating >= 0 && order.rating <=5){
                    order.rating = rating;
                orderList.splice(counter,1,order);
                const result = JSON.stringify(orderList,null,2);
                await myWriteFile(jsonStringOrder,result);
                return order;
                }else return {response : "Rating should be a number between 0 and 5"};  
            } else return {response : "Your order has already received a vote"};
        }
        counter++;
    }
    return {response : "Order not found"};
}

export function getOrdersList() : Object {
    return orderList;
};
export async function deleteOrder(id: string): Promise<Object | Boolean> {
    let counter =0;
    for(let order of orderList){
        if(order.id ===id){
            if(order.statusOrder === false){
                orderList.splice(counter,1);
                const result = JSON.stringify(orderList,null,2);
                await myWriteFile(jsonStringOrder,result);
                return order;
            }else return {response: "Can't delete accepted order"};
        }
        counter++;
    }
    return {response : "Order not found"};
};

export function getOrdersById(id: string): Object {
    for(let order of orderList){
        if(order.id === id){
            return order;
        }
    }
    return {response : "Order not found"};
};

export function getOrdersByUserId(id: string): Array<Order> | Object {
    var userOrders = Array<Order>();
    for(let order of orderList){
        if(order.userId === id){
            userOrders.push(order);
        }
    }
    if(userOrders.length >0){
        return userOrders;
    }
    return {response : "This user has not placed any orders"};
};
export function getOrdersByRestaurantId(id: string): Array<Order> | Object {
    var restaurantOrders = Array<Order>();
    for(let order of orderList){
        if(order.restaurantId === id){
            restaurantOrders.push(order);
        }
    }
    if(restaurantOrders.length >0){
        return restaurantOrders;
    }
    return {response : "This restaurant has not received any order"};
};
export function getOrdersByBothId(userID: string,restaurantID: string): Array<Order> | Object {
    let counter = 0;
    var bothOrders = Array<Order>();
    for(let order of orderList){
        if(order.userId === userID && order.restaurantId === restaurantID){
            bothOrders.push(order);
        }
    }
    if(bothOrders.length >0){
        return bothOrders;
    }
    return {response : "The user has never ordered in this restaurant"};
};
export function getExpensiveOrder(userId : string): Array<Order> | Object {
    var userOrders = Array<Order>();
    var max = 0;
    for(let order of orderList){
        if(order.userId === userId){
            if(order.totalAmount > max){
                userOrders.splice(0,1,order);
                max = order.totalAmount;
            }
        }
    }
    if(userOrders.length >0){
        return userOrders;
    }
    return {response : "This user has not placed any orders"};
};
/* export function getExpensiveOrderByRestaurant(restaurantId : string): Array<Order> | Object {
    var restaurantOrders = Array<Order>();
    var max = 0;
    for(let order in orderList){
        if(orderList[order].restaurantID === restaurantId){
            if(orderList[order].totalAmount > max){
                restaurantOrders.splice(0,1,orderList[order]);
                max = orderList[order].totalAmount;
            }
        }
    }
    if(restaurantOrders.length >0){
        return restaurantOrders;
    }
    return {response : "This restaurant has not received any order"};
}; */
export function getCheaperOrder(userID: string): Array<Order> | Object {
    var userOrders = Array<Order>();
    var min = 0;
    for(let order of orderList){
        if(order.userId === userID){
            min = order.totalAmount;
            break;
        }
    }
    for(let order of orderList){
        if(order.userId === userID){
            if(order.totalAmount < min){
                userOrders.splice(0,1,order);
                min = order.totalAmount;
            }
        }
    }
    if(userOrders.length >0){
        return userOrders;
    }
    return {response : "This user has not placed any orders"};
};
export function getOrdersByPlate(plateName: string): Array<Order> | Object {
    var orderByPlate = Array<Order>();
    for(let order in orderList){
        for(let plate in orderList[order].orderItems){
            if(orderList[order].orderItems[plate].name === plateName ){
                orderByPlate.push(orderList[order]);
            }
        }
    }
    if(orderByPlate.length >0){
        return orderByPlate;
    }
    return {response : "Not found any orders with this plate"};
};

