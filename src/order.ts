import {v4 as uuidv1} from 'uuid';
import fs from 'fs';

export interface OrderList{
    quantity : number;
    namePlate : string,
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

const jsonStringUser  = (fs.readFileSync( __dirname + '/json_file/users.json','utf8'));
const userList = JSON.parse(jsonStringUser);
const jsonStringOrder  = (fs.readFileSync(__dirname + '/json_file/orders.json','utf8'));
const orderList = JSON.parse(jsonStringOrder);
const jsonStringRestaurant  = (fs.readFileSync(__dirname +'/json_file/restaurants.json','utf8'));
const restaurantList = JSON.parse(jsonStringRestaurant);

export function newOrder(order: Order): Object {
    var timestampNow = new Date();
    var date = timestampNow.getDate() + "-" + (timestampNow.getMonth()+1) + "-" + timestampNow.getFullYear();
    var time = timestampNow.getHours() + ":" + timestampNow.getMinutes() + ":" + timestampNow.getSeconds();
    var dateOrder = date + " " + time;
    var totalPrice=0;
    var orderPlate =Array<OrderList>();
    var completeOrder =Object();
    for(let idUser in userList){
        if(userList[idUser].uuid === order.userId){
            for(let idRestaurant in restaurantList ){
                if(restaurantList[idRestaurant].id === order.restaurantId){
                    for(let plates in order.orderItems){
                        for(let item of restaurantList[idRestaurant].plate){
                            if(item.name === order.orderItems[plates].namePlate){
                                orderPlate.push({
                                    quantity : order.orderItems[plates].quantity,
                                    namePlate : order.orderItems[plates].namePlate,
                                    price : item.price
                                });
                                console.log(restaurantList[idRestaurant].plate[item.price]);
                                totalPrice+=(order.orderItems[plates].price * order.orderItems[plates].quantity);
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
                    orderList.push(completeOrder)
                    const finalOrder = JSON.stringify(orderList,null,2);
                    fs.writeFileSync(__dirname+'/json_file/orders.json', finalOrder );
                    return completeOrder;
                } else{
                    return {response : "Restaurant not found"};
                }
            }
        } else{
            return {response : "User not found"};
        }
    }
    return {response : "Nothing work property"};
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
export function changeStatusOrder(ID:string): Object | boolean {
    for(let order in orderList){
        if(orderList[order].ID ===ID){
            let item = orderList[order];
            if(item.statusOrder === false){
                item.statusOrder = true;
                orderList.splice(order,1,item);
                const result = JSON.stringify(orderList,null,2);
                fs.writeFileSync(__dirname+'/json_file/orders.json', result );
                return {response : "Your order has been accepted"};
            } return {response : "You can't dismiss order"}
        }
    }
    return {response : "Order not found"};
}

export function changeRatingOrder(ID:string,rating:BigInteger): Object | boolean {
    for(let order in orderList){
        if(orderList[order].ID ===ID){
            let item = orderList[order];
            if(item.rating == null){
                if(item.rating >= 0 && item.rating <=5){
                    item.rating = rating;
                orderList.splice(order,1,item);
                const result = JSON.stringify(orderList,null,2);
                fs.writeFileSync(__dirname+'/json_file/orders.json', result );
                return item;
                }else return {response : "Rating should be a number between 0 and 5"};  
            } else return {response : "Your order has already received a vote"};
        }
    }
    return {response : "Order not found"};
}

export function getOrdersList() : Object {
    return orderList;
};
export function deleteOrder(id: string): Object | Boolean {
    for(let order in orderList){
        if(orderList[order].ID ===id){
            let item = orderList[order];
            if(item.statusOrder === false){
                orderList.splice(order,1);
                const result = JSON.stringify(orderList,null,2);
                fs.writeFileSync(__dirname+'/json_file/orders.json', result );
                return item;
            }else return {response: "Can't delete accepted order"};
        }
    }
    return {response : "Order not found"};
};

export function getOrdersById(id: string): Object {
    for(let order in orderList){
        if(orderList[order].ID === id){
            return orderList[order];
        }
    }
    return {response : "Order not found"};
};

export function getOrdersByUserId(id: string): Array<Order> | Object {
    var userOrders = Array<Order>();
    for(let order in orderList){
        if(orderList[order].userID === id){
            userOrders.push(orderList[order]);
        }
    }
    if(userOrders.length >0){
        return userOrders;
    }
    return {response : "This user has not placed any orders"};
};
export function getOrdersByRestaurantId(id: string): Array<Order> | Object {
    var restaurantOrders = Array<Order>();
    for(let order in orderList){
        if(orderList[order].restaurantID === id){
            restaurantOrders.push(orderList[order]);
        }
    }
    if(restaurantOrders.length >0){
        return restaurantOrders;
    }
    return {response : "This restaurant has not received any order"};
};
export function getOrdersByBothId(userID: string,restaurantID: string): Array<Order> | Object {
    var bothOrders = Array<Order>();
    for(let order in orderList){
        if(orderList[order].userID === userID && orderList[order].restaurantID === restaurantID){
            bothOrders.push(orderList[order]);
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
    for(let order in orderList){
        if(orderList[order].userID === userId){
            if(orderList[order].totalAmount > max){
                userOrders.splice(0,1,orderList[order]);
                max = orderList[order].totalAmount;
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
    for(let order in orderList){
        if(orderList[order].userID === userID){
            min = orderList[order].totalAmount;
            break;
        }
    }
    for(let order in orderList){
        if(orderList[order].userID === userID){
            if(orderList[order].totalAmount < min){
                userOrders.splice(0,1,orderList[order]);
                min = orderList[order].totalAmount;
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
            if(orderList[order].orderItems[plate].namePlate === plateName ){
                orderByPlate.push(orderList[order]);
            }
        }
    }
    if(orderByPlate.length >0){
        return orderByPlate;
    }
    return {response : "Not found any orders with this plate"};
};

