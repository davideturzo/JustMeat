import uuidv, {v4 as uuidv1} from 'uuid';
import fs from 'fs';
const jsonStringRestaurant  = (fs.readFileSync(__dirname +'/json_file/restaurants.json','utf8'));
const restaurantList = JSON.parse(jsonStringRestaurant);

export interface Plates{
    name: string,
    price: number
}

export interface Restaurants{
    ID: string,
    name: string,
    address: string,
    email: string,
    plate: Array<Plates>,
    rating: number,
    typology: Array<string>
}
const restaurants: any = [];

export function newRestaurant(rest: Restaurants): Object{
    const plates = Array<Plates>();
    if(restaurantList.length === 0){
        for(let i of rest.plate){
            plates.push(i);
        }
        let newRest = {
            id: uuidv1(),
            name: rest.name,
            address: rest.address,
            email: rest.email,
            plate : plates,
            rating : null,
            typology: rest.typology
        }
        restaurantList.push(newRest);
        const finalRestaurant = JSON.stringify(restaurantList,null,2);
        fs.writeFileSync(__dirname+'/json_file/restaurants.json', finalRestaurant );
    return newRest;
    };
    for(let i of restaurantList){
        if(i.name === rest.name){
            return {"response" : "This restaurant exists"};
        } else{
            for(let i of rest.plate){
                plates.push(i);
            }
                let newRest = {
                    id: uuidv1(),
                    name: rest.name,
                    address: rest.address,
                    email: rest.email,
                    plate : plates,
                    rating : null,
                    typology: rest.typology
                }
                restaurantList.push(newRest);
                const finalRestaurant = JSON.stringify(restaurantList,null,2);
                fs.writeFileSync(__dirname+'/json_file/restaurants.json', finalRestaurant );
                console.log(__dirname+'/json_file/restaurants.json');
            return newRest;
        }
    }
    return {"response" : "Wrong way"};
}

export function getRestaurantList(): Array<Restaurants>{
    return restaurantList;
}

export function restaurantById(id: string): any{
    return restaurantList.find((restaurantList:any)=>{
        return restaurantList.id === id;
    })
}

export function updateRestaurantFields(restaurantToSearch: string, name?: string, address?: string, email?: string, plate?: Array<Plates>): Boolean {
    for(let i = 0; i < restaurantList.length; i ++){
        if(restaurantToSearch == restaurantList[i].id){
            if(name){
                restaurantList[i].name = name;
            }
            if(address){
                restaurantList[i].address = address;
            }
            if(email){
                restaurantList[i].email = email;
            }
            if(plate){
                restaurantList[i].plate = plate;
            }
                const finalRestaurant = JSON.stringify(restaurantList,null,2);
                fs.writeFileSync(__dirname+'/json_file/restaurants.json', finalRestaurant );
        }
    }
    return true;
}

export function deleteRestaurant(id: string): Boolean {
    for(let i = 0; i < restaurantList.length; i++){
        if(restaurantList[i].id === id){
            restaurantList.splice(i, 1);
            let finalRestaurant = JSON.stringify(restaurantList, null, 2);
            fs.writeFileSync(__dirname+'/json_file/restaurants.json', finalRestaurant);
            return true;
        }
    }
    return false;
}