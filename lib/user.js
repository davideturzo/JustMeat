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
const v1_1 = __importDefault(require("uuid/v1"));
const password_hash_1 = __importDefault(require("password-hash"));
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = require("util");
let users;
/* myReadfile().then(res => {
    const jsonStringUser = res;
    users = JSON.parse(jsonStringUser);
});*/
const readFile = util_1.promisify(fs_1.default.readFile);
function myReadfile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const file = yield readFile(__dirname + '/json_file/users.json', 'utf-8');
            return file;
        }
        catch (err) {
            throw err;
        }
    });
}
const writeFile = util_1.promisify(fs_1.default.writeFile);
function myWriteFile(finalNewUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield writeFile(__dirname + '/json_file/users.json', finalNewUser);
        }
        catch (err) {
            throw err;
        }
    });
}
// (async () => {
//     users = JSON.parse(await myReadfile());
// })();
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        users = JSON.parse(yield myReadfile());
        let payload;
        for (let user of users) {
            if (email === user.email && password_hash_1.default.verify(password, user.password)) {
                if (user.username === 'admin' && password === 'admin') {
                    payload = {
                        subject: user.id,
                        username: user.username,
                        isAdmin: true
                    };
                }
                else {
                    payload = {
                        subject: user.id,
                        username: user.username,
                        isAdmin: false
                    };
                }
                let token = jsonwebtoken_1.default.sign(payload, 'FLIZsTmhpB', { expiresIn: 3600 });
                return token;
            }
        }
        return false;
    });
}
exports.login = login;
function newUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        users = JSON.parse(yield myReadfile());
        for (let element of users) {
            if (element.username === user.username) {
                return false;
            }
        }
        let actualUser = {
            id: v1_1.default(),
            username: user.username,
            password: password_hash_1.default.generate(user.password),
            name: user.name,
            surname: user.surname,
            address: user.address,
            phone: user.phone,
            email: user.email
        };
        users.push(actualUser);
        let finalNewUser = JSON.stringify(users, null, 2);
        let payload;
        if (actualUser.username === 'admin') {
            payload = {
                subject: actualUser.id,
                username: user.username,
                isAdmin: true
            };
        }
        else {
            payload = {
                subject: actualUser.id,
                username: user.username,
                isAdmin: false
            };
        }
        let token = jsonwebtoken_1.default.sign(payload, 'FLIZsTmhpB', { expiresIn: 3600 });
        yield myWriteFile(finalNewUser);
        return token;
    });
}
exports.newUser = newUser;
function usersList() {
    return __awaiter(this, void 0, void 0, function* () {
        users = JSON.parse(yield myReadfile());
        return users;
    });
}
exports.usersList = usersList;
function userByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        users = JSON.parse(yield myReadfile());
        for (let element of users) {
            if (username == element.username) {
                return element;
            }
        }
        return true;
    });
}
exports.userByUsername = userByUsername;
function userById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        users = JSON.parse(yield myReadfile());
        for (let element of users) {
            if (id == element.id) {
                return element;
            }
        }
        return true;
    });
}
exports.userById = userById;
function updateUserFields(userToSearch, password, name, surname, address, phone, email) {
    return __awaiter(this, void 0, void 0, function* () {
        users = JSON.parse(yield myReadfile());
        for (let user of users) {
            if (userToSearch == user.username) {
                if (password) {
                    user.password = password_hash_1.default.generate(password);
                }
                if (name) {
                    user.name = name;
                }
                if (surname) {
                    user.surname = surname;
                }
                if (address) {
                    user.address = address;
                }
                if (phone) {
                    user.phone = phone;
                }
                if (email) {
                    user.email = email;
                }
                let finalNewUser = JSON.stringify(users, null, 2);
                yield myWriteFile(finalNewUser);
                return user;
            }
        }
        return false;
    });
}
exports.updateUserFields = updateUserFields;
function deleteUser(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        users = JSON.parse(yield myReadfile());
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === uuid) {
                users.splice(i, 1);
                let finalNewUser = JSON.stringify(users, null, 2);
                yield myWriteFile(finalNewUser);
                return true;
            }
        }
        return false;
    });
}
exports.deleteUser = deleteUser;
