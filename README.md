# :meat_on_bone:   JUSTMEAT  :meat_on_bone:
## JustEat for carnivorous where you can order whatever you want, based on Restaurants located in italian cities. No vegetarians allowed!

#### :computer: INSTALLATION :computer:
**`npm install justmeat`**

#### :page_facing_up: USAGE :page_facing_up:
##### - :fork_and_knife: restaurant.ts :fork_and_knife:
###### Restaurant takes ID, name, address, email, plate, rating, typology. 
###### Functions:

- `function newRestaurant(rest: Restaurant)` takes a new restaurant and, control, in the meantime,  if the Restaurant that you want to insert already exist.

- `function  getRestaurantList()` return the list of Restaurants existing.

- `function restaurantById(id: string)` allows you to search a Restaurant by ID.

- `function deleteRestaurant(id: string)` allows you to delete a Restaurant by ID.

- `function updateRestaurantFields(restaurantToSearch: string, name?: string, address?: string, email?: string, plate?: Array<Plates>)` 
#####
##### - :stew: order.ts :stew:
- `function newOrder(order: Order)` Take new order, stamp time and date, and 
##### - :woman: user.ts :man:


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


