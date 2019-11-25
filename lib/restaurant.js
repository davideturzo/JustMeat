"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const jsonStringRestaurant = (fs_1.default.readFileSync(__dirname + '/json_file/restaurants.json', 'utf8'));
const restaurantList = JSON.parse(jsonStringRestaurant);
const restaurants = [];
function newRestaurant(rest) {
    const plates = Array();
    if (restaurantList.length === 0) {
        for (let i of rest.plate) {
            plates.push(i);
        }
        let newRest = {
            id: uuid_1.v4(),
            name: rest.name,
            address: rest.address,
            email: rest.email,
            plate: plates,
            rating: null,
            typology: rest.typology
        };
        restaurantList.push(newRest);
        const finalRestaurant = JSON.stringify(restaurantList, null, 2);
        fs_1.default.writeFileSync(__dirname + '/json_file/restaurants.json', finalRestaurant);
        return newRest;
    }
    ;
    for (let i of restaurantList) {
        if (i.name === rest.name) {
            return { "response": "This restaurant exists" };
        }
        else {
            for (let i of rest.plate) {
                plates.push(i);
            }
            let newRest = {
                id: uuid_1.v4(),
                name: rest.name,
                address: rest.address,
                email: rest.email,
                plate: plates,
                rating: null,
                typology: rest.typology
            };
            restaurantList.push(newRest);
            const finalRestaurant = JSON.stringify(restaurantList, null, 2);
            fs_1.default.writeFileSync(__dirname + '/json_file/restaurants.json', finalRestaurant);
            console.log(__dirname + '/json_file/restaurants.json');
            return newRest;
        }
    }
    return { "response": "Wrong way" };
}
exports.newRestaurant = newRestaurant;
function getRestaurantList() {
    return restaurantList;
}
exports.getRestaurantList = getRestaurantList;
function restaurantById(id) {
    return restaurantList.find((restaurantList) => {
        return restaurantList.id === id;
    });
}
exports.restaurantById = restaurantById;
function updateRestaurantFields(restaurantToSearch, name, address, email, plate) {
    for (let i = 0; i < restaurantList.length; i++) {
        if (restaurantToSearch == restaurantList[i].id) {
            if (name) {
                restaurantList[i].name = name;
            }
            if (address) {
                restaurantList[i].address = address;
            }
            if (email) {
                restaurantList[i].email = email;
            }
            if (plate) {
                restaurantList[i].plate = plate;
            }
            const finalRestaurant = JSON.stringify(restaurantList, null, 2);
            fs_1.default.writeFileSync(__dirname + '/json_file/restaurants.json', finalRestaurant);
        }
    }
    return true;
}
exports.updateRestaurantFields = updateRestaurantFields;
function deleteRestaurant(id) {
    for (let i = 0; i < restaurantList.length; i++) {
        if (restaurantList[i].id === id) {
            restaurantList.splice(i, 1);
            let finalRestaurant = JSON.stringify(restaurantList, null, 2);
            fs_1.default.writeFileSync(__dirname + '/json_file/restaurants.json', finalRestaurant);
            return true;
        }
    }
    return false;
}
exports.deleteRestaurant = deleteRestaurant;
