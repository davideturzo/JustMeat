import uuidv1 from 'uuid/v1';
import fs from 'fs';
import ash from 'password-hash';
import data from './json_file/orders.json';
export interface Order{
    ID: string,
    userID: string,
    restaurantID: string,
    date: Date,
    orderItems: [],
    totalAmount: number,
};
const orders = <any>data;

export function ordersList(): Array<Order> {
    return orders;
};
export function deleteOrder(id: string): Boolean {
    for(let i = 0; i < data.length; i++){
        if(data[i].ID === id){
            orders.splice(i, 1);
            return true;
        }
    }
    return false;
};
export function getOrderById(id: string): JSON | null  {
    for(let i = 0; i < orders.length; i++ ){
        if(orders[i].ID == id){
            return orders[i];
        }
    }
    return null;
};
export function getOrdersByUserId(id: string): Array<Order> | null {
    var userOrders = [];
    for(let i = 0; i < orders.length; i++ ){
        if(orders[i].userID == id){
            userOrders.push(orders[i]);
        }
    }
    if(userOrders.length >0){
        return userOrders;
    }
    return null;
};
export function getOrdersByRestaurantId(id: string): Array<Order> | null {
    var restaurantOrders = [];
    for(let i = 0; i < orders.length; i++ ){
        if(orders[i].restaurantID == id){
            restaurantOrders.push(orders[i]);
        }
    }
    if(restaurantOrders.length >0){
        return restaurantOrders;
    }
    return null;
};
export function getOrdersByBothId(userID: string,restaurantID: string): Array<Order> | null {
    var bothOrders = [];
    for(let i = 0; i < orders.length; i++ ){
        if(orders[i].userID === userID && orders[i].restaurantID === restaurantID){
            bothOrders.push(orders[i]);
        }
    }
    if(bothOrders.length >0){
        return bothOrders;
    }
    return null;
};
export function getExpensiveOrder(): Array<Order> | null {
    var max = 0;
    var index=0;
    for(let i = 0; i < orders.length; i++ ){
        if(orders[i].totalAmount > max){
            max = orders[i].totalAmount
            index=i;
        }
    }
    return orders[index];
};
export function getCheaperOrder(userID: string,restaurantID: string): Array<Order> | null {
    var min = orders[0].totalAmount;
    var index=0;
    for(let i = 0; i < orders.length; i++ ){
        if(orders[i].totalAmount < min){
            min = orders[i].totalAmount
            index=i;
        }
    }
    return orders[index];
};
export function getOrderByPlate(plate: string): Array<Order> | null {
    var orderByPlate=[];
    for(let i = 0; i < orders.length; i++ ){
        for(let z = 0; z < orders[i].orderItems.length;z++){
            if(orders[i].orderItems[z] === plate){
                orderByPlate.push(orders[i]);
            }
        }
    }
    return orderByPlate;
};
