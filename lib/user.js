"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = __importDefault(require("uuid/v1"));
const password_hash_1 = __importDefault(require("password-hash"));
const fs_1 = __importDefault(require("fs"));
const jsonStringUser = (fs_1.default.readFileSync(__dirname + '/json_file/users.json', 'utf8'));
const users = JSON.parse(jsonStringUser);
function newUser(user) {
    for (let element of users) {
        if (element.username === user.username) {
            return false;
        }
    }
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
    let finalNewUser = JSON.stringify(users, null, 2);
    fs_1.default.writeFileSync(__dirname + '/json_file/users.json', finalNewUser);
    return true;
}
exports.newUser = newUser;
function usersList() {
    return users;
}
exports.usersList = usersList;
function userById(username) {
    for (let element of users) {
        if (username == element.username) {
            return element;
        }
    }
    return true;
}
exports.userById = userById;
function updateUserFields(userToSearch, password, name, surname, address, phone, email) {
    for (let user of users) {
        if (userToSearch == user.username) {
            if (password) {
                user.password = password;
            }
            else if (name) {
                user.name = name;
            }
            else if (surname) {
                user.surname = surname;
            }
            else if (address) {
                user.address = address;
            }
            else if (phone) {
                user.phone = phone;
            }
        }
        let finalNewUser = JSON.stringify(user, null, 2);
        fs_1.default.writeFileSync(__dirname + '/json_file/users.json', finalNewUser);
        return user;
    }
    return false;
}
exports.updateUserFields = updateUserFields;
function deleteUser(uuid) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === uuid) {
            users.splice(i, 1);
            let finalNewUser = JSON.stringify(users, null, 2);
            fs_1.default.writeFileSync(__dirname + '/json_file/users.json', finalNewUser);
            return true;
        }
    }
    return false;
}
exports.deleteUser = deleteUser;
