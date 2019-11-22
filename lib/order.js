"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_json_1 = __importDefault(require("./json_file/orders.json"));
;
const orders = orders_json_1.default;
function ordersList() {
    return orders;
}
exports.ordersList = ordersList;
;
function deleteOrder(id) {
    for (let i = 0; i < orders_json_1.default.length; i++) {
        if (orders_json_1.default[i].ID === id) {
            orders.splice(i, 1);
            return true;
        }
    }
    return false;
}
exports.deleteOrder = deleteOrder;
;
function getOrderById(id) {
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].ID == id) {
            return orders[i];
        }
    }
    return null;
}
exports.getOrderById = getOrderById;
;
function getOrdersByUserId(id) {
    var userOrders = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].userID == id) {
            userOrders.push(orders[i]);
        }
    }
    if (userOrders.length > 0) {
        return userOrders;
    }
    return null;
}
exports.getOrdersByUserId = getOrdersByUserId;
;
function getOrdersByRestaurantId(id) {
    var restaurantOrders = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].restaurantID == id) {
            restaurantOrders.push(orders[i]);
        }
    }
    if (restaurantOrders.length > 0) {
        return restaurantOrders;
    }
    return null;
}
exports.getOrdersByRestaurantId = getOrdersByRestaurantId;
;
function getOrdersByBothId(userID, restaurantID) {
    var bothOrders = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].userID === userID && orders[i].restaurantID === restaurantID) {
            bothOrders.push(orders[i]);
        }
    }
    if (bothOrders.length > 0) {
        return bothOrders;
    }
    return null;
}
exports.getOrdersByBothId = getOrdersByBothId;
;
function getExpensiveOrder() {
    var max = 0;
    var index = 0;
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].totalAmount > max) {
            max = orders[i].totalAmount;
            index = i;
        }
    }
    return orders[index];
}
exports.getExpensiveOrder = getExpensiveOrder;
;
function getCheaperOrder(userID, restaurantID) {
    var min = orders[0].totalAmount;
    var index = 0;
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].totalAmount < min) {
            min = orders[i].totalAmount;
            index = i;
        }
    }
    return orders[index];
}
exports.getCheaperOrder = getCheaperOrder;
;
function getOrderByPlate(plate) {
    var orderByPlate = [];
    for (let i = 0; i < orders.length; i++) {
        for (let z = 0; z < orders[i].orderItems.length; z++) {
            if (orders[i].orderItems[z] === plate) {
                orderByPlate.push(orders[i]);
            }
        }
    }
    return orderByPlate;
}
exports.getOrderByPlate = getOrderByPlate;
;
