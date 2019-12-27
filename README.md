# :meat_on_bone:   JUSTMEAT  :meat_on_bone:
## JustEat for meat friendly people where you can order whatever you want, featuring Restaurants located in italian cities.


#### :page_facing_up: USAGE :page_facing_up:



### - :fork_and_knife: restaurant.ts :fork_and_knife:
###### Restaurant takes ID, name, address, email, plate, rating, typology. 

##### Within the restaurant.ts are implemented several functions, starting from the possibility to create and add a new restaurant to the network, to finish with many filtering methods to quickly find a particular information.

###### Functions:

 **- `function newRestaurant(rest: Restaurant)`** Create a new restaurant and, check, in the meantime, if the Restaurant that you want to add already exist.

 **- `function  getRestaurantList()`** Return the list of Restaurants existing.

 **- `function restaurantById(id: string)`** Allows you to search a Restaurant by ID.

**- `function deleteRestaurant(id: string)`** Allows you to delete a Restaurant by ID.

**- `function updateRestaurantFields(restaurantToSearch: string, name?: string, address?: string, email?: string, plate?:                    Array<Plates>)`**  Take all the Restaurant information, search the id of the Restaurant and, in case of different information,          modify the fields of the Restaurant that you're searching with new ones.



### - :stew: order.ts :stew:
###### Order takes ID, userId, restaurantId, date, shippingAddress, OrderItems, totalAmount, rating, statusOrder.

##### Through the order.ts is possible to manage every kind of order the users have made. 

###### Functions:

**- `function newOrder(order: Order)`** Take a new order, displays the information related such as time and date, price. Also check in the array of users if the user exist (ID).

**- `function changeStatusOrder(ID: string)`** Change the status order using the id of the order. If the order has been already accepted by the restaurant, it will show you an error.

**- `function changeRatingOrder(ID:string,rating:number)`** This function, by using the id of the order and a star rating that you want to insert, allows you to give a vote for the order. It will show you an error if you already voted or the number of star that you want to insert is not between 0 and 5.

**- `function getOrdersList()`** same as getRestaurantList.

**- `function deleteOrder(id: string)`** This function allows you to delete an order. If the order has been already accepted or does not exist, it will show you an error.

**- `function getOrdersById(id: string)`** Search an order by using the ID.

**- `function getOrdersByUserId(id: string)`** Search the order by using the user ID. If the user id does not match with any order, it will show you an error.

**- `function getOrdersByRestaurantId(id: string)`** This function search an order using the Reastaurant ID. If the restaurant id does not match with any order, it will show you an error.

**- `function getOrdersByBothId(userID: string,restaurantID: string)`** This function, using the user and restaurant id, allows you to search for an order. If one of the id match with the list already exist (of the restaurant or the user) it will show you an error.

**- `function getExpensiveOrder(userId : string)`** This function, using the user ID, , show the most expensive order of the user. If the user does not place any order, it will show you an error.

**- `function getCheaperOrder(userID: string)`** same as getExpensiveOrder, with the cheapest one.

**- `function getOrdersByPlate(plateName: string)`** Searching an order using the Plate, if no plate has found, it will show you an error.



### - :woman: user.ts :man:
###### User takes username, password, name, surname, address, phone, email.

###### Functions:

**- `function newUser(user: NewUser)`** Create a new User, and, check, in the meantime, if the User that you want to add already exist.

**- `function login(email: string, password: string)`** A simple login call that verify user email and password, and in affermative case return Welcome "username"

**- `function usersList()`** Displays the list of all the existing users in the network.

**- `function userById(username: string)`** Allows to search a User by his unique ID assigned.

**- `function updateUserFields(userToSearch: string, password?: string, name?: string, surname?: string, address?: string, phone?: string, email?: string)`** Take all the User information, search the id of the User and, in case of different information, allows to modify the fields of the User that you're searching with new ones.

**- `function deleteUser(uuid: string)`** Allows you to delete a User by ID.



#### - :honeybee: API :honeybee:

The API calls, to manage the requests from a client are implemented following the CRUD basic operations (Create, Read, Update, Delete), according to the REST philosophy (Post, Get, Put, Delete). For each users.ts, restaurants.ts and orders.ts file a new usersAPI.ts, restaurantsAPI.ts and orders.ts has been created.



#### :bust_in_silhouette: CONTRIBUTORS :bust_in_silhouette:
- RedMemories (https://github.com/RedMemories)
- stealth90 (https://github.com/stealth90)
- davideturzo (https://github.com/davideturzo)
- Zelos23 (https://github.com/Zelos23)
- Peppe01 (https://github.com/Peppe01)
- domenicosf92 (https://github.com/domenicosf92)


#### NPM MODULES
- Express
- FS
- body-parser
- UTIL
- UUID
- Password-Hash
- Supertest
- Mocha


