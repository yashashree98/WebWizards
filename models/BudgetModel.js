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
exports.BudgetModel = void 0;
const Mongoose = require("mongoose");
const DataAccess_1 = require("../DataAccess");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
class BudgetModel {
    constructor(dbConnectionString) {
        this.dbConnectionString = dbConnectionString;
        this.createSchema();
        this.createModel();
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.model = mongooseConnection.model("budget", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    createSchema() {
        this.schema = new Mongoose.Schema({ userId: String, name: String, description: String }, { collection: "budget" });
    }
    getAllBudget() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.find().exec();
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getAllBudgetByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.find({ userId }).exec();
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getOneBudgetById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findById(id).exec();
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    createBudget(budgetData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const budget = new this.model(budgetData);
                return yield budget.save();
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    updateBudget(budgetId, budgetData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findByIdAndUpdate(budgetId, budgetData, { new: true });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    deleteBudget(budgetId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.findByIdAndDelete(budgetId);
                return !!result;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
exports.BudgetModel = BudgetModel;
