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
// import {UserModel} from './models/UserModel'; 
const CategoryModel_1 = require("./models/CategoryModel");
const BudgetModel_1 = require("./models/BudgetModel");
// import { OffersModel } from './models/OffersModel';
const crypto = require("crypto");
// Creates and configures an ExpressJS web server.
class App {
    // public Offers : OffersModel;
    //Run configuration methods on the Express instance.
    constructor(mongoDBConnection) {
        this.expressApp = express();
        this.middleware();
        this.routes();
        // this.Users = new UserModel(mongoDBConnection);
        this.Category = new CategoryModel_1.CategoryModel(mongoDBConnection);
        this.Budget = new BudgetModel_1.BudgetModel(mongoDBConnection);
        // this.Offers = new OffersModel(mongoDBConnection);
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
        router.get('/app/category/:categoryId/count', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var id = req.params.categoryId;
            console.log('Query single budget with id:' + id);
            yield this.Budget.retrieveBudgetCount(res, { categoryId: id });
        }));
        router.get('/app/category/:categoryId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var id = req.params.categoryId;
            console.log('Query single list with id:' + id);
            yield this.Budget.retrieveBudgetCount(res, { categoryId: id });
        }));
        router.get('/app/category/:categoryId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var id = parseInt(req.params.categoryId);
            console.log('Query single list with id: ' + id);
            yield this.Category.retrieveCategories(res, id);
        }));
        router.post('/app/category/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.categoryId = id;
            try {
                yield this.Category.model.create([jsonObj]);
                res.send('{"id""' + id + '"}');
            }
            catch (e) {
                console.error(e);
                console.log('object creation failed');
            }
        }));
        router.post('/app/category2/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.categoryId = id;
            const doc = new this.Category.model(jsonObj);
            try {
                yield doc.save();
                res.send('{"id":"' + id + '"}');
            }
            catch (e) {
                console.log('object creation failed');
                console.error(e);
            }
        }));
        router.get('/app/category/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Query All Categories');
            yield this.Category.retrieveAllCategories(res);
        }));
        router.get('/app/categorycount', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Query the number of category elements in db');
            yield this.Category.retrieveCategoryCount(res);
        }));
        router.get('/app/category/:categoryId/budgets', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var id = req.params.categoryId;
            console.log('Query single Category with id: ' + id);
            yield this.Budget.retrieveBudgetDetails(res, { categoryId: id });
        }));
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    }
}
exports.App = App;
