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
let restaurants;
const readFile = util_1.promisify(fs_1.default.readFile);
function myReadfile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const file = yield readFile(__dirname + '/json_file/restaurants.json', 'utf-8');
            return file;
        }
        catch (err) {
            throw err;
        }
    });
}
const writeFile = util_1.promisify(fs_1.default.writeFile);
function myWriteFile(finalRestaurant) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield writeFile(__dirname + '/json_file/restaurants.json', finalRestaurant);
        }
        catch (err) {
            throw err;
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    restaurants = JSON.parse(yield myReadfile());
}))();
function newRestaurant(rest) {
    return __awaiter(this, void 0, void 0, function* () {
        const plates = Array();
        for (let i of restaurants) {
            if (i.name === rest.name) {
                return false;
            }
        }
        let actualRestaurant = {
            id: uuid_1.v4(),
            name: rest.name,
            address: rest.address,
            city: rest.city,
            email: rest.email,
            plate: plates,
            rating: null,
            typology: rest.typology
        };
        restaurants.push(actualRestaurant);
        for (let i of rest.plate) {
            plates.push(i);
        }
        const finalRestaurant = JSON.stringify(restaurants, null, 2);
        yield myWriteFile(finalRestaurant);
        return actualRestaurant;
    });
}
exports.newRestaurant = newRestaurant;
function getRestaurantList() {
    return restaurants;
}
exports.getRestaurantList = getRestaurantList;
function restaurantByName(name) {
    return restaurants.find((restaurant) => {
        return restaurant.name === name;
    });
}
exports.restaurantByName = restaurantByName;
function restaurantById(id) {
    return restaurants.find((restaurant) => {
        return restaurant.id === id;
    });
}
exports.restaurantById = restaurantById;
function restaurantByCity(city) {
    return restaurants.filter((restaurant) => restaurant.city === city);
}
exports.restaurantByCity = restaurantByCity;
function updateRestaurantFields(restaurantToSearch, name, address, email, plate) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < restaurants.length; i++) {
            if (restaurantToSearch == restaurants[i].id) {
                if (name) {
                    restaurants[i].name = name;
                }
                if (address) {
                    restaurants[i].address = address;
                }
                if (email) {
                    restaurants[i].email = email;
                }
                if (plate) {
                    restaurants[i].plate = plate;
                }
                const finalRestaurant = JSON.stringify(restaurants, null, 2);
                yield myWriteFile(finalRestaurant);
                return restaurants[i];
            }
        }
        return false;
    });
}
exports.updateRestaurantFields = updateRestaurantFields;
function deleteRestaurant(id) {
    for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].id === id) {
            restaurants.splice(i, 1);
            let finalRestaurant = JSON.stringify(restaurants, null, 2);
            fs_1.default.writeFileSync(__dirname + '/json_file/restaurants.json', finalRestaurant);
            return true;
        }
    }
    return false;
}
exports.deleteRestaurant = deleteRestaurant;
