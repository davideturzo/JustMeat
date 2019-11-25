"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
;
const jsonStringUser = (fs_1.default.readFileSync(__dirname + '/json_file/users.json', 'utf8'));
const userList = JSON.parse(jsonStringUser);
const jsonStringOrder = (fs_1.default.readFileSync(__dirname + '/json_file/orders.json', 'utf8'));
const orderList = JSON.parse(jsonStringOrder);
const jsonStringRestaurant = (fs_1.default.readFileSync(__dirname + '/json_file/restaurants.json', 'utf8'));
const restaurantList = JSON.parse(jsonStringRestaurant);
function newOrder(order) {
    var timestampNow = new Date();
    var date = timestampNow.getDate() + "-" + (timestampNow.getMonth() + 1) + "-" + timestampNow.getFullYear();
    var time = timestampNow.getHours() + ":" + timestampNow.getMinutes() + ":" + timestampNow.getSeconds();
    var dateOrder = date + " " + time;
    var totalPrice = 0;
    var orderPlate = Array();
    var completeOrder = Object();
    for (let idUser in userList) {
        if (userList[idUser].id === order.userID) {
            for (let idRestaurant in restaurantList) {
                if (restaurantList[idRestaurant].id === order.restaurantID) {
                    for (let plates in order.orderItems) {
                        for (let item of restaurantList[idRestaurant].plate) {
                            if (item.name === order.orderItems[plates].namePlate) {
                                orderPlate.push({ quantity: order.orderItems[plates].quantity,
                                    namePlate: order.orderItems[plates].namePlate,
                                    price: order.orderItems[plates].price });
                                totalPrice += (order.orderItems[plates].price * order.orderItems[plates].quantity);
                            }
                        }
                    }
                    completeOrder = {
                        ID: uuid_1.v4(),
                        userID: order.userID,
                        restaurantID: order.restaurantID,
                        date: dateOrder,
                        shippingAddress: order.shippingAddress,
                        orderItems: orderPlate,
                        totalAmount: totalPrice,
                        rating: null,
                        statusOrder: false
                    };
                    orderList.push(completeOrder);
                    const finalOrder = JSON.stringify(orderList, null, 2);
                    fs_1.default.writeFileSync(__dirname + '/json_file/orders.json', finalOrder);
                    return completeOrder;
                }
                else {
                    return { response: "Restaurant not found" };
                }
            }
        }
        else {
            return { response: "User not found" };
        }
    }
    return { response: "Nothing work property" };
}
exports.newOrder = newOrder;
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
function changeStatusOrder(ID) {
    for (let order in orderList) {
        if (orderList[order].ID === ID) {
            let item = orderList[order];
            if (item.statusOrder === false) {
                item.statusOrder = true;
                orderList.splice(order, 1, item);
                const result = JSON.stringify(orderList, null, 2);
                fs_1.default.writeFileSync(__dirname + '/json_file/orders.json', result);
                return { response: "Your order has been accepted" };
            }
            return { response: "You can't dismiss order" };
        }
    }
    return { response: "Order not found" };
}
exports.changeStatusOrder = changeStatusOrder;
function changeRatingOrder(ID, rating) {
    for (let order in orderList) {
        if (orderList[order].ID === ID) {
            let item = orderList[order];
            if (item.rating == null) {
                if (item.rating >= 0 && item.rating <= 5) {
                    item.rating = rating;
                    orderList.splice(order, 1, item);
                    const result = JSON.stringify(orderList, null, 2);
                    fs_1.default.writeFileSync(__dirname + '/json_file/orders.json', result);
                    return item;
                }
                else
                    return { response: "Rating should be a number between 0 and 5" };
            }
            else
                return { response: "Your order has already received a vote" };
        }
    }
    return { response: "Order not found" };
}
exports.changeRatingOrder = changeRatingOrder;
function getOrdersList() {
    return orderList;
}
exports.getOrdersList = getOrdersList;
;
function deleteOrder(id) {
    for (let order in orderList) {
        if (orderList[order].ID === id) {
            let item = orderList[order];
            if (item.statusOrder === false) {
                orderList.splice(order, 1);
                const result = JSON.stringify(orderList, null, 2);
                fs_1.default.writeFileSync(__dirname + '/json_file/orders.json', result);
                return item;
            }
            else
                return { response: "Can't delete accepted order" };
        }
    }
    return { response: "Order not found" };
}
exports.deleteOrder = deleteOrder;
;
function getOrdersById(id) {
    for (let order in orderList) {
        if (orderList[order].ID === id) {
            return orderList[order];
        }
    }
    return { response: "Order not found" };
}
exports.getOrdersById = getOrdersById;
;
function getOrdersByUserId(id) {
    var userOrders = Array();
    for (let order in orderList) {
        if (orderList[order].userID === id) {
            userOrders.push(orderList[order]);
        }
    }
    if (userOrders.length > 0) {
        return userOrders;
    }
    return { response: "This user has not placed any orders" };
}
exports.getOrdersByUserId = getOrdersByUserId;
;
function getOrdersByRestaurantId(id) {
    var restaurantOrders = Array();
    for (let order in orderList) {
        if (orderList[order].restaurantID === id) {
            restaurantOrders.push(orderList[order]);
        }
    }
    if (restaurantOrders.length > 0) {
        return restaurantOrders;
    }
    return { response: "This restaurant has not received any order" };
}
exports.getOrdersByRestaurantId = getOrdersByRestaurantId;
;
function getOrdersByBothId(userID, restaurantID) {
    var bothOrders = Array();
    for (let order in orderList) {
        if (orderList[order].userID === userID && orderList[order].restaurantID === restaurantID) {
            bothOrders.push(orderList[order]);
        }
    }
    if (bothOrders.length > 0) {
        return bothOrders;
    }
    return { response: "The user has never ordered in this restaurant" };
}
exports.getOrdersByBothId = getOrdersByBothId;
;
function getExpensiveOrder(userId) {
    var userOrders = Array();
    var max = 0;
    for (let order in orderList) {
        if (orderList[order].userID === userId) {
            if (orderList[order].totalAmount > max) {
                userOrders.splice(0, 1, orderList[order]);
                max = orderList[order].totalAmount;
            }
        }
    }
    if (userOrders.length > 0) {
        return userOrders;
    }
    return { response: "This user has not placed any orders" };
}
exports.getExpensiveOrder = getExpensiveOrder;
;
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
function getCheaperOrder(userID) {
    var userOrders = Array();
    var min = 0;
    for (let order in orderList) {
        if (orderList[order].userID === userID) {
            min = orderList[order].totalAmount;
            break;
        }
    }
    for (let order in orderList) {
        if (orderList[order].userID === userID) {
            if (orderList[order].totalAmount < min) {
                userOrders.splice(0, 1, orderList[order]);
                min = orderList[order].totalAmount;
            }
        }
    }
    if (userOrders.length > 0) {
        return userOrders;
    }
    return { response: "This user has not placed any orders" };
}
exports.getCheaperOrder = getCheaperOrder;
;
function getOrdersByPlate(plateName) {
    var orderByPlate = Array();
    for (let order in orderList) {
        for (let plate in orderList[order].orderItems) {
            if (orderList[order].orderItems[plate].namePlate === plateName) {
                orderByPlate.push(orderList[order]);
            }
        }
    }
    if (orderByPlate.length > 0) {
        return orderByPlate;
    }
    return { response: "Not found any orders with this plate" };
}
exports.getOrdersByPlate = getOrdersByPlate;
;
