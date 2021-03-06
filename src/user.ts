import uuidv1 from 'uuid/v1';
import ash from 'password-hash';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
export interface NewUser {
    username: string,
    password: string,
    name: string,
    surname: string,
    address: string,
    phone: string,
    email: string
}
export interface User extends NewUser {
    id: string
}
let users: Array<User>;
/* myReadfile().then(res => {
    const jsonStringUser = res;
    users = JSON.parse(jsonStringUser);
});*/

const readFile = promisify(fs.readFile);
async function myReadfile () {
    try {
      const file = await readFile(__dirname+'/json_file/users.json', 'utf-8' );
      return file;
    }
    catch (err) {
       throw err;
    }
}
const writeFile = promisify(fs.writeFile);
async function myWriteFile(finalNewUser: string) {
    try {
        await writeFile(__dirname+'/json_file/users.json', finalNewUser );
    }
    catch (err) {
       throw err;
    }
}

// (async () => {
//     users = JSON.parse(await myReadfile());
// })();

export async function login(email: string, password: string): Promise<string|boolean> {
    users = JSON.parse(await myReadfile());
    let payload;
    for (let user of users) {
        if(email === user.email && ash.verify(password, user.password)) {
            if(user.username === 'admin' && password === 'admin') {
                payload = { 
                    subject: user.id, 
                    username: user.username, 
                    isAdmin: true 
                }
            } else {
                payload = { 
                    subject: user.id, 
                    username: user.username, 
                    isAdmin: false 
                }
            }
            let token = jwt.sign(payload, 'FLIZsTmhpB', {expiresIn: 3600});
            return token;
        }
    }
    return false;
}

export async function newUser(user: NewUser): Promise<boolean | string> { 
    users = JSON.parse(await myReadfile());
    for (let element of users) {
        if (element.username === user.username) {
            return false;
        }
    }
    let actualUser = {
        id: uuidv1(),
        username: user.username,
        password: ash.generate(user.password),
        name: user.name,
        surname: user.surname,
        address: user.address,
        phone: user.phone,
        email: user.email
    }
    users.push(actualUser);
    let finalNewUser = JSON.stringify(users, null, 2);
    let payload;
    if(actualUser.username === 'admin') {
        payload = { 
            subject: actualUser.id, 
            username: user.username, 
            isAdmin: true 
        }
    } else {
        payload = { 
            subject: actualUser.id, 
            username: user.username, 
            isAdmin: false 
        }
    }
    
    let token = jwt.sign(payload, 'FLIZsTmhpB', {expiresIn: 3600});
    await myWriteFile(finalNewUser);
    return token;
}

export async function usersList(): Promise<Array<User>> {
    users = JSON.parse(await myReadfile());
    return users;
}
export async function userByUsername(username: string): Promise<User | boolean> {
    users = JSON.parse(await myReadfile());
    for(let element of users){
        if(username == element.username){
            return element;
        }
    }
    return true;
}

export async function userById(id: string): Promise<User | boolean> {
    users = JSON.parse(await myReadfile());
    for(let element of users){
        if(id == element.id){
            return element;
        }
    }
    return true;
}

export async function updateUserFields(userToSearch: string, password?: string, name?: string, surname?: string, address?: string, phone?: string, email?: string): Promise<any> {
    users = JSON.parse(await myReadfile());
    for(let user of users){
        if(userToSearch == user.username){
            if(password){
                user.password = ash.generate(password);
            }
            if(name){
                user.name = name;
            }
            if(surname){
                user.surname = surname;
            }
            if(address){
                user.address = address;
            }
            if(phone){
                user.phone = phone;
            }
            if(email){
                user.email = email;
            }
            let finalNewUser = JSON.stringify(users, null, 2);
            await myWriteFile(finalNewUser);
            return user;
        }
    }
    return false;
}

export async function deleteUser(uuid: string): Promise<Boolean> {
    users = JSON.parse(await myReadfile());
    for(let i = 0; i < users.length; i++){
        if(users[i].id === uuid){
            users.splice(i, 1);
            let finalNewUser = JSON.stringify(users, null, 2);
            await myWriteFile(finalNewUser);
            return true;
        }
    }
    return false;
}



