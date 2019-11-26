import {v4 as uuidv1} from 'uuid';
import fs from 'fs';
import { promisify } from 'util';

export interface Plates{
    name: string,
    price: number
}

export interface Restaurant{
    id: string,
    name: string,
    address: string,
    email: string,
    plate: Array<Plates>,
    rating: number|null,
    typology: Array<string>
}
let restaurants: Array<Restaurant>;

const readFile = promisify(fs.readFile);
async function myReadfile () {
    try {
      const file = await readFile(__dirname+'/json_file/restaurants.json', 'utf-8' );
      return file;
    }
    catch (err) {
       throw err;
    }
}

const writeFile = promisify(fs.writeFile);
async function myWriteFile(finalRestaurant: string) {
    try {
        await writeFile(__dirname+'/json_file/restaurants.json', finalRestaurant );
    }
    catch (err) {
       throw err;
    }
}

(async () => {
    restaurants = JSON.parse(await myReadfile());
})();    

export async function newRestaurant(rest: Restaurant): Promise<boolean|Object>{
    const plates = Array<Plates>();
    for(let i of restaurants){
        if(i.name === rest.name){
            return false
        }
    }
    restaurants.push({
        id: uuidv1(),
        name: rest.name,
        address: rest.address,
        email: rest.email,
        plate : plates,
        rating : null,
        typology: rest.typology
    });
    for(let i of rest.plate){
        plates.push(i);
    }
    const finalRestaurant = JSON.stringify(restaurants,null,2);
    await myWriteFile(finalRestaurant);
    return restaurants;
}

export function getRestaurantList(): Array<Restaurant>{
    return restaurants;
}

export function restaurantById(id: string): Restaurant | undefined{
    return restaurants.find( (restaurant: Restaurant) =>{
        return restaurant.id === id;
    });
}

export async function updateRestaurantFields(restaurantToSearch: string, name?: string, address?: string, email?: string, plate?: Array<Plates>): Promise<Boolean> {
    for(let i = 0; i < restaurants.length; i ++){
        if(restaurantToSearch == restaurants[i].id){
            if(name){
                restaurants[i].name = name;
            }
            if(address){
                restaurants[i].address = address;
            }
            if(email){
                restaurants[i].email = email;
            }
            if(plate){
                restaurants[i].plate = plate;
            }
            const finalRestaurant = JSON.stringify(restaurants,null,2);
            await myWriteFile(finalRestaurant);
            return true;
        }
    }
    return false;
}

export function deleteRestaurant(id: string): Boolean {
    for(let i = 0; i < restaurants.length; i++){
        if(restaurants[i].id === id){
            restaurants.splice(i, 1);
            let finalRestaurant = JSON.stringify(restaurants, null, 2);
            fs.writeFileSync(__dirname+'/json_file/restaurants.json', finalRestaurant);
            return true;
        }
    }
    return false;
}