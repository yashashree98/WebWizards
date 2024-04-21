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
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const UserModel_1 = require("./models/UserModel");
const CategoryModel_1 = require("./models/CategoryModel");
const BudgetModel_1 = require("./models/BudgetModel");
const OffersModel_1 = require("./models/OffersModel");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor(mongoDBConnection) {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Users = new UserModel_1.UserModel(mongoDBConnection);
        this.Category = new CategoryModel_1.CategoryModel(mongoDBConnection);
        this.Budget = new BudgetModel_1.BudgetModel(mongoDBConnection);
        this.Offers = new OffersModel_1.OffersModel(mongoDBConnection);
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        //get all users
        router.get('/app/users/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            //var id = req.params.listId;
            this.Users.getAllUsers(res);
        }));
        //get user by id
        router.get('/app/users/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var id = req.params.id;
            this.Users.getUserById(id, res);
        }));
        //create user
        //   router.post('/app/users/', async (req, res) => {
        //     console.log(req.body);
        //       var jsonObj = req.body;
        //       jsonObj.listId = id;
        //       try {
        //         await this.Lists.model.create([jsonObj]);
        //         res.send('{"id":"' + id + '"}');
        //       }
        //       catch (e) {
        //         console.error(e);
        //         console.log('object creation failed');
        //       }
        //   });
        //   router.post('/app/list2/', async (req, res) => {
        //     const id = crypto.randomBytes(16).toString("hex");
        //     console.log(req.body);
        //       var jsonObj = req.body;
        //       jsonObj.listId = id;
        //       const doc = new this.Lists.model(jsonObj);
        //       try {
        //         await doc.save();
        //         res.send('{"id":"' + id + '"}');
        //       }
        //       catch (e) {
        //         console.log('object creation failed');
        //         console.error(e);
        //       }        
        //   });
        //   router.get('/app/list/:listId/tasks', async (req, res) => {
        //       var id = req.params.listId;
        //       console.log('Query single list with id: ' + id);
        //       await this.Tasks.retrieveTasksDetails(res, {listId: id});
        //   });
        //   router.get('/app/list/', async (req, res) => {
        //       console.log('Query All list');
        //       await this.Lists.retrieveAllLists(res);
        //   });
        //   router.get('/app/listcount', async (req, res) => {
        //     console.log('Query the number of list elements in db');
        //     await this.Lists.retrieveListCount(res);
        //   });
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    }
}
exports.App = App;
