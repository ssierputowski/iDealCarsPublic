# iDealCars
Under development
### Getting Started
---
#### Prerequisites
* [Node.js](https://nodejs.org/en/) version 8.12.0 or later
* [NPM](https://www.npmjs.com/) version 5.3.0 or higher
  * [Download Node and NPM](https://nodejs.org/en/)
* [Angular CLI]() version 6.1.5 or higher (*should be saved in devDependencies*)
  * ```npm install -g @angular/cli@latest```
* [MongoDB](https://www.mongodb.com/download-center?initial=true#community)
* Nodemon
  * ```npm install -g nodemon```

#### Installing
* Clone this repo
  * ```git clone https://github.com/SCCapstone/iDealCars.git```
* Install Prerequisites (Check the above section)
* ```cd <path>/iDealCars```
  * ```cd ideal-api```
    * ```npm install```
  * ```cd ideal-angular```
    * ```npm install```
* Note: If the ```npm install``` throws an error:
  * If it says a module is not installed, run ```npm install --save <module name>```
  * If it says that an invalid character was read at the end of the line, delete the node_module folder and the package-lock.json file and try the ```npm install``` command again
  * If it's an npm permission error, see [here](https://docs.npmjs.com/getting-started/fixing-npm-permissions)

### Deployment
---
* Three Terminal Setup
* Terminal 1 : Runs MongoDB
  * ```mongod``` or ```sudo mongod```
* Terminal 2 : Runs the express server
  * ```cd <path>/iDealCars/ideal-api/```
  * ```nodemon server```
  * If it cannot find module ```npm install --save <module>```
* Terminal 3 : Builds the webapp to be served by the Express server
  * ```cd <path>/iDealCars/ideal-angular/```
  * ```ng serve```
* The iDealCars application should now be available at http://localhost:4200

### Testing
* Unit Test
  * ng test
    
 
 * Behavioral Test
  * Used the Chrome plugin Selenium to complete and it is in the code files to run through Selenium.

### Built With
* [Angular 6](https://angular.io/)
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://mongodb.com/)
* [Express.js](https://expressjs.com/)

### Contributors
* **Jerrod Mathis**
* **Sagar Patadia**
* **Niraj Patel**
* **Eric Davies**
* **Stash Sierputowski**
