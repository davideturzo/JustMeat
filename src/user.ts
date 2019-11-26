import uuidv1 from 'uuid/v1';
import ash from 'password-hash';
import fs from 'fs';
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
        const write = await writeFile(__dirname+'/json_file/users.json', finalNewUser );
    }
    catch (err) {
       throw err;
    }
}

(async () => {
    users = JSON.parse(await myReadfile());
})();

export async function newUser(user: NewUser): Promise<boolean | User> { 
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
    await myWriteFile(finalNewUser);
    return actualUser;
}

export function usersList(): Array<User> {
    return users;
}
export function userById(username: string): User|boolean {
    for(let element of users){
        if(username == element.username){
            return element;
        }
    }
    return true;
}

export async function updateUserFields(userToSearch: string, password?: string, name?: string, surname?: string, address?: string, phone?: string, email?: string): Promise<any> {
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



