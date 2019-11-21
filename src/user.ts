import uuidv1 from 'uuid/v1';
import fs from 'fs';
import ash from 'password-hash';
export interface User{
    username: string,
    password: string,
    name: string,
    surname: string,
    address: string,
    phone: string,
    email: string
}
// let users = JSON.parse(fs.readFileSync('../json_files/users.json'));
const users: any = [];

export function newUser(user: User): boolean {
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
    return true;
}

export function usersList(): Array<User> {
    return users;
}
export function userById(username: string): Boolean {
    for(let i = 0; i < users.length; i++ ){
        if(username == users[i].username){
            return users[i];
        }
    }
    return true;
}

export function updateUserFields(userToSearch: string, password: string, name?: string, surname?: string, address?: string, phone?: string): Boolean {
    for(let i = 0; i < users.lenght; i ++){
        if(userToSearch == users[i].username){
            users[i].password = password;
            if(name){
                users[i].name = name;
            }
            if(surname){
                users[i].surname = surname;
            }
            if(address){
                users[i].address = address;
            }
            if(phone){
                users[i].phone = phone;
            }
        }
    }
    return true;
}

export function deleteUser(id: string): Boolean {
    for(let i = 0; i < users.length; i++){
        users.splice(i, 1);
    }
    return true;
}


