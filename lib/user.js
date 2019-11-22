"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = __importDefault(require("uuid/v1"));
const password_hash_1 = __importDefault(require("password-hash"));
// let users = JSON.parse(fs.readFileSync('../json_files/users.json'));
const users = [];
function newUser(user) {
    users.push({
        id: v1_1.default(),
        username: user.username,
        password: password_hash_1.default.generate(user.password),
        name: user.name,
        surname: user.surname,
        address: user.address,
        phone: user.phone,
        email: user.email
    });
    return true;
}
exports.newUser = newUser;
function usersList() {
    return users;
}
exports.usersList = usersList;
function userById(username) {
    for (let i = 0; i < users.length; i++) {
        if (username == users[i].username) {
            return users[i];
        }
    }
    return true;
}
exports.userById = userById;
function updateUserFields(userToSearch, password, name, surname, address, phone) {
    for (let i = 0; i < users.lenght; i++) {
        if (userToSearch == users[i].username) {
            users[i].password = password;
            if (name) {
                users[i].name = name;
            }
            if (surname) {
                users[i].surname = surname;
            }
            if (address) {
                users[i].address = address;
            }
            if (phone) {
                users[i].phone = phone;
            }
        }
    }
    return true;
}
exports.updateUserFields = updateUserFields;
function deleteUser(id) {
    for (let i = 0; i < users.length; i++) {
        users.splice(i, 1);
    }
    return true;
}
exports.deleteUser = deleteUser;
