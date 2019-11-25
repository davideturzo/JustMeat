import uuidv1 from 'uuid/v1';
import ash from 'password-hash';
import fs from 'fs';
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
const jsonStringUser  = (fs.readFileSync( __dirname + '/json_file/users.json','utf8'));
const users: Array<User> = JSON.parse(jsonStringUser);


export function newUser(user: NewUser): boolean {
    for (let element of users) {
        if (element.username === user.username) {
            return false;
        }
    }
    users.push({
        id: uuidv1(),
        username: user.username,
        password: ash.generate(user.password),
        name: user.name,
        surname: user.surname,
        address: user.address,
        phone: user.phone,
        email: user.email
    });
    let finalNewUser = JSON.stringify(users, null, 2);
    fs.writeFileSync(__dirname+'/json_file/users.json', finalNewUser );
    return true;
}

export function usersList() {
    return users;
}
export function userById(username: string): any {
    for(let element of users){
        if(username == element.username){
            return element;
        }
    }
    return true;
}

export function updateUserFields(userToSearch: string, password?: string, name?: string, surname?: string, address?: string, phone?: string): any {
    for(let user of users){
        if(userToSearch == user.username){
            if(password){
                user.password = password;
            } else if(name){
                user.name = name;
            } else if(surname){
                user.surname = surname;
            } else if(address){
                user.address = address;
            } else if(phone){
                user.phone = phone;
            }
        }
        let finalNewUser = JSON.stringify(user, null, 2);
        fs.writeFileSync(__dirname+'/json_file/users.json', finalNewUser );
        return user;
    }
    return false;
}

export function deleteUser(uuid: string): Boolean {
    for(let i = 0; i < users.length; i++){
        if(users[i].id === uuid){
            users.splice(i, 1);
            let finalNewUser = JSON.stringify(users, null, 2);
            fs.writeFileSync(__dirname+'/json_file/users.json', finalNewUser );
            return true;
        }
    }
    return false;
}



