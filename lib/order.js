"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
;
const jsonStringUser = '/json_file/users.json';
const jsonStringOrder = '/json_file/orders.json';
const jsonStringRestaurant = '/json_file/restaurants.json';
let userList = Array();
let restaurantList = Array();
let orderList = Array();
const readFile = util_1.promisify(fs_1.default.readFile);
function myReadfile(jsonFile) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const file = yield readFile(__dirname + jsonFile, 'utf-8');
            return file;
        }
        catch (err) {
            throw err;
        }
    });
}
const writeFile = util_1.promisify(fs_1.default.writeFile);
function myWriteFile(jsonFile, result) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield writeFile(__dirname + jsonFile, result);
        }
        catch (err) {
            throw err;
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    userList = JSON.parse(yield myReadfile(jsonStringUser));
    restaurantList = JSON.parse(yield myReadfile(jsonStringRestaurant));
    orderList = JSON.parse(yield myReadfile(jsonStringOrder));
}))();
function newOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        var timestampNow = new Date();
        var date = timestampNow.getDate() + "-" + (timestampNow.getMonth() + 1) + "-" + timestampNow.getFullYear();
        var time = timestampNow.getHours() + ":" + timestampNow.getMinutes() + ":" + timestampNow.getSeconds();
        var dateOrder = date + " " + time;
        var totalPrice = 0;
        var orderPlate = Array();
        var completeOrder = Object();
        for (let user of userList) {
            if (user.id === order.userId) {
                for (let restaurant of restaurantList) {
                    if (restaurant.id === order.restaurantId) {
                        for (let plates of order.orderItems) {
                            for (let item of restaurant.plate) {
                                if (item.name === plates.namePlate) {
                                    orderPlate.push({
                                        quantity: plates.quantity,
                                        namePlate: plates.namePlate,
                                        price: item.price
                                    });
                                    totalPrice += (plates.price * plates.quantity);
                                }
                            }
                        }
                        completeOrder = {
                            id: uuid_1.v4(),
                            userId: order.userId,
                            restaurantId: order.restaurantId,
                            date: dateOrder,
                            shippingAddress: order.shippingAddress,
                            orderItems: orderPlate,
                            totalAmount: totalPrice,
                            rating: null,
                            statusOrder: false
                        };
                        orderList.push(completeOrder);
                        let finalOrder = JSON.stringify(orderList, null, 2);
                        yield myWriteFile(jsonStringOrder, finalOrder);
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
    });
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
    return __awaiter(this, void 0, void 0, function* () {
        let counter = 0;
        for (let order of orderList) {
            if (order.id === ID) {
                if (order.statusOrder === false) {
                    order.statusOrder = true;
                    orderList.splice(counter, 1, order);
                    const result = JSON.stringify(orderList, null, 2);
                    yield myWriteFile(jsonStringOrder, result);
                    return order;
                }
                return { response: "You can't dismiss order" };
            }
            counter++;
        }
        return { response: "Order not found" };
    });
}
exports.changeStatusOrder = changeStatusOrder;
function changeRatingOrder(ID, rating) {
    return __awaiter(this, void 0, void 0, function* () {
        let counter = 0;
        for (let order of orderList) {
            if (order.id === ID) {
                if (order.rating == null) {
                    if (order.rating >= 0 && order.rating <= 5) {
                        order.rating = rating;
                        orderList.splice(counter, 1, order);
                        const result = JSON.stringify(orderList, null, 2);
                        yield myWriteFile(jsonStringOrder, result);
                        return order;
                    }
                    else
                        return { response: "Rating should be a number between 0 and 5" };
                }
                else
                    return { response: "Your order has already received a vote" };
            }
            counter++;
        }
        return { response: "Order not found" };
    });
}
exports.changeRatingOrder = changeRatingOrder;
function getOrdersList() {
    return orderList;
}
exports.getOrdersList = getOrdersList;
;
function deleteOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let counter = 0;
        for (let order of orderList) {
            if (order.id === id) {
                if (order.statusOrder === false) {
                    orderList.splice(counter, 1);
                    const result = JSON.stringify(orderList, null, 2);
                    yield myWriteFile(jsonStringOrder, result);
                    return order;
                }
                else
                    return { response: "Can't delete accepted order" };
            }
            counter++;
        }
        return { response: "Order not found" };
    });
}
exports.deleteOrder = deleteOrder;
;
function getOrdersById(id) {
    for (let order of orderList) {
        if (order.id === id) {
            return order;
        }
    }
    return { response: "Order not found" };
}
exports.getOrdersById = getOrdersById;
;
function getOrdersByUserId(id) {
    var userOrders = Array();
    for (let order of orderList) {
        if (order.userId === id) {
            userOrders.push(order);
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
    for (let order of orderList) {
        if (order.restaurantId === id) {
            restaurantOrders.push(order);
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
    let counter = 0;
    var bothOrders = Array();
    for (let order of orderList) {
        if (order.userId === userID && order.restaurantId === restaurantID) {
            bothOrders.push(order);
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
    for (let order of orderList) {
        if (order.userId === userId) {
            if (order.totalAmount > max) {
                userOrders.splice(0, 1, order);
                max = order.totalAmount;
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
    for (let order of orderList) {
        if (order.userId === userID) {
            min = order.totalAmount;
            break;
        }
    }
    for (let order of orderList) {
        if (order.userId === userID) {
            if (order.totalAmount < min) {
                userOrders.splice(0, 1, order);
                min = order.totalAmount;
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
